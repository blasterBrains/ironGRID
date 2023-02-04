import Router, { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AdminForm from './components/AdminForm';
import ChooseGame from './components/ChooseGame';
import GridRules from './components/GridRules';
import PhoneConfirm from './components/PhoneConfirm';
import axios from '../../common/utils/api';
import type { Grid, User } from '@prisma/client';

export type FieldValues = Partial<
  Pick<Grid, 'game_id' | 'title' | 'size' | 'cost' | 'reverse'>
> &
  Partial<Pick<User, 'name' | 'phone'>> & { short_code?: string };

export enum CreateGridPage {
  rules = 'rules',
  admin = 'admin',
  game = 'game',
  phone = 'phone',
}

interface VerifyPhoneResponse {
  status: string;
  valid: boolean;
  reason?: string;
}

const CreateGridForm = () => {
  const [resentCode, setResentCode] = useState(false);

  const router = useRouter();
  const { page = CreateGridPage.game } = router.query as {
    page: CreateGridPage;
  };
  const methods = useForm({ mode: 'onBlur' });

  const handleSendVerificationText = useCallback(
    async (phone: string, resending?: boolean) => {
      try {
        setResentCode(false);
        const { data } = await axios.post<VerifyPhoneResponse>('/send-code', {
          phone,
        });
        console.log('twilio data in handleSendVer...', data);
        if (data.status === 'pending') {
          if (resending) {
            setResentCode(true);
          } else {
            Router.push({
              pathname: '/create-grid',
              query: { page: CreateGridPage.phone },
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

  const handleVerifyPhone = useCallback(async (fields: FieldValues) => {
    const { phone, short_code: shortCode } = fields;
    try {
      const { data } = await axios.post<VerifyPhoneResponse>('/verify-code', {
        phone,
        short_code: shortCode,
      });
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

  const handleCreateUser = useCallback(
    async (fields: FieldValues) => {
      const { phone, name } = fields;
      try {
        const { data: userResponse } = await axios.post<User>('/users', {
          name,
          phone,
        });
      } catch (error) {
        methods.setError('short_code', {
          type: 'custom',
          message:
            'Sorry we are having issues creating your account. Please try again at a later time.',
        });
      }
    },
    [methods]
  );

  const handleCreateGrid = useCallback(async (fields: FieldValues) => {
    console.log('creating grid', fields);
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      console.log('onSubmit', data);
      switch (page) {
        case CreateGridPage.game:
          Router.push({
            pathname: '/create-grid',
            query: { page: CreateGridPage.rules },
          });
          break;
        case CreateGridPage.rules:
          Router.push({
            pathname: '/create-grid',
            query: { page: CreateGridPage.admin },
          });
          break;
        case CreateGridPage.admin:
          if (data.phone) {
            handleSendVerificationText(data.phone);
          }
          break;
        default:
          try {
            await handleVerifyPhone(data);
            await handleCreateUser(data);
            await handleCreateGrid(data);
          } catch (error) {
            methods.setError('short_code', {
              type: 'custom',
              message: (error as { message: string }).message,
            });
          }
          break;
      }
    },
    [
      page,
      handleSendVerificationText,
      handleVerifyPhone,
      handleCreateUser,
      handleCreateGrid,
      methods,
    ]
  );

  const renderPage = () => {
    switch (page) {
      case CreateGridPage.rules:
        return <GridRules />;
      case CreateGridPage.admin:
        return <AdminForm />;
      case CreateGridPage.phone:
        return (
          <PhoneConfirm
            onResendCode={handleSendVerificationText}
            resentCode={resentCode}
          />
        );
      default:
        return <ChooseGame />;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{renderPage()}</form>
    </FormProvider>
  );
};

export default CreateGridForm;
