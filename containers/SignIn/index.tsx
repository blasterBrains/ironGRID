import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import type { User } from '@prisma/client';
import Router, { useRouter } from 'next/router';
import VerifyPhone from '../CreateGridForm/components/VerifyPhone';
import SignInForm from '../CreateGridForm/components/SignInForm';
import { useCallback, useContext, useState } from 'react';
import axios from '../../common/utils/api';
import { VerifyPhoneResponse } from '../CreateGridForm';
import { IronGridContext } from '../../common/context';
import { UserTypes } from '../../common/types';

export type SignInFieldValues = Partial<Pick<User, 'name' | 'phone'>> & {
  short_code?: string;
};

export enum SignInPage {
  verify = 'verify',
}

const SignIn = () => {
  const router = useRouter();
  const [resentCode, setResentCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(IronGridContext);

  const { page, redirect } = router.query as {
    page?: SignInPage;
    redirect?: string;
  };

  const methods = useForm({ mode: 'onBlur' });

  const handleCreateUser = useCallback(
    async (fields: SignInFieldValues) => {
      const { phone, name } = fields;
      try {
        const { data: userResponse } = await axios.post<User>('/user', {
          name,
          phone,
        });

        console.log('userResponse in Signin index: ', userResponse);
        const contextUserData = { ...userResponse, grids: [], squares: [] };
        dispatch({
          type: UserTypes.Create,
          payload: contextUserData,
        });
        return userResponse;
      } catch (error) {
        methods.setError('short_code', {
          type: 'custom',
          message:
            'Sorry we are having issues creating your account. Please try again at a later time.',
        });
      }
    },
    [methods, dispatch]
  );

  const handleVerifyPhone = useCallback(async (fields: SignInFieldValues) => {
    const { phone, short_code: shortCode } = fields;
    try {
      setLoading(true);
      const { data } = await axios.post<VerifyPhoneResponse>('/verify-code', {
        phone,
        short_code: shortCode,
      });
      setLoading(false);
      if (data.status !== 'approved') {
        throw new Error(data.reason);
      }
    } catch (error) {
      throw new Error(
        (error as { message?: string }).message ||
          'Invalid code, please try again'
      );
    }
  }, []);

  const handleSendVerificationText = useCallback(
    async (phone: string, resending?: boolean) => {
      try {
        setLoading(true);
        setResentCode(false);
        const { data } = await axios.post<VerifyPhoneResponse>('/send-code', {
          phone,
        });
        console.log('twilio data in handleSendVer...', data);
        if (data.status === 'pending') {
          setLoading(false);
          if (resending) {
            setResentCode(true);
          } else {
            Router.push({
              pathname: '/sign-in',
              query: { page: SignInPage.verify },
            });
          }
        } else {
          throw new Error(data.reason);
        }
      } catch (error) {
        methods.setError('short_code', {
          type: 'custom',
          message: 'Invalid phone number, please try again',
        });
      }
    },
    [methods]
  );

  const onSubmit: SubmitHandler<SignInFieldValues> = useCallback(
    async (data) => {
      if (!page && data.phone) {
        handleSendVerificationText(data.phone);
      } else if (page === SignInPage.verify) {
        try {
          setLoading(true);
          await handleVerifyPhone(data);
          const user = await handleCreateUser(data);
          if (!user) {
            setLoading(false);
            throw new Error('Sorry, an unexpected error occured');
          }
          if (redirect) {
            Router.push({
              pathname: redirect,
            });
          } else {
            Router.push({
              pathname: '/',
            });
          }
        } catch (error) {
          setLoading(false);
          methods.setError('short_code', {
            type: 'custom',
            message: (error as { message: string }).message,
          });
        }
      }
    },
    [
      page,
      handleCreateUser,
      handleSendVerificationText,
      handleVerifyPhone,
      methods,
      redirect,
    ]
  );

  const renderPage = () => {
    console.log(page);
    switch (page) {
      case SignInPage.verify:
        return (
          <VerifyPhone
            onResendCode={handleSendVerificationText}
            resentCode={resentCode}
            loading={loading}
          />
        );
      default:
        return <SignInForm loading={loading} />;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{renderPage()}</form>
    </FormProvider>
  );
};

export default SignIn;
