import type { Grid, User } from '@prisma/client';
import Router, { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { verifyRefreshToken } from '../../common/utils/authTokens';
import { verifyAccessToken } from '../../common/utils/authTokens';
import { generateTokens } from '../../common/utils/authTokens';
import { setCookie } from 'cookies-next';
import { useCallback, useContext, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { IronGridContext } from '../../common/context';
import {
  GridTypes,
  GridWithSquaresAndCreator,
  UserTypes,
} from '../../common/types';
import axios from '../../common/utils/api';
import SignInForm from './components/SignInForm';
import ChooseGame from './components/ChooseGame';
import GridRules from './components/GridRules';
import VerifyPhone from './components/VerifyPhone';
import ChooseSport from './components/ChooseSport';

export type FieldValues = Partial<
  Pick<Grid, 'game_id' | 'title' | 'size' | 'cost' | 'reverse' | 'sport'>
> &
  Partial<Pick<User, 'name' | 'phone'>> & { short_code?: string };

export enum CreateGridPage {
  sport = 'sport',
  game = 'game',
  rules = 'rules',
  signin = 'signin',
  phone = 'phone',
}

export interface VerifyPhoneResponse {
  status: string;
  valid: boolean;
  reason?: string;
}

type CreateGridFormProps = {
  user: User;
};

const CreateGridForm = ({ user }: CreateGridFormProps) => {
  console.log('user: ', user);
  const [resentCode, setResentCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(IronGridContext);

  const router = useRouter();
  const { page = CreateGridPage.sport } = router.query as {
    page: CreateGridPage;
  };
  const methods = useForm({ mode: 'onBlur' });

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

  const handleCreateUser = useCallback(
    async (fields: FieldValues) => {
      const { phone, name } = fields;
      try {
        const { data: userResponse } = await axios.post<User>('/user', {
          name,
          phone,
        });

        console.log('userResponse in CreateGridForm index: ', userResponse);
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

  const handleCreateGrid = useCallback(
    async (fields: FieldValues & { creator_id: string }) => {
      console.log('creating grid', fields);
      const { game_id, title, size, cost, reverse, creator_id, sport } = fields;
      try {
        const { data: gridResponse } =
          await axios.post<GridWithSquaresAndCreator>('/grid', {
            game_id,
            title,
            size,
            cost,
            reverse,
            creator_id,
            sport,
          });
        dispatch({
          type: GridTypes.Create,
          payload: { ...gridResponse },
        });
        return gridResponse;
      } catch (error) {
        methods.setError('createGrid', {
          type: 'custom',
          message:
            'Sorry we are having issues creating your grid. Please try again at a later time.',
        });
      }
    },
    [dispatch, methods]
  );
  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      console.log('onSubmit', data);
      switch (page) {
        case CreateGridPage.sport:
          Router.push({
            pathname: '/create-grid',
            query: { page: CreateGridPage.game },
          });
          break;
        case CreateGridPage.game:
          Router.push({
            pathname: '/create-grid',
            query: { page: CreateGridPage.rules },
          });
          break;
        case CreateGridPage.rules:
          // check user context
          Router.push({
            pathname: '/create-grid',
            query: { page: CreateGridPage.signin },
          });
          break;
        case CreateGridPage.signin:
          if (data.phone) {
            handleSendVerificationText(data.phone);
          }
          break;
        default:
          try {
            setLoading(true);
            await handleVerifyPhone(data);
            const user = await handleCreateUser(data);
            if (!user) {
              setLoading(false);
              throw new Error('Sorry, an unexpected error occured');
            }
            if (!data.game_id) {
              setLoading(false);
              throw new Error('Sorry, an unexpected error occured');
            }
            const grid = await handleCreateGrid({
              ...data,
              creator_id: user.id,
            });
            setLoading(false);
            if (!grid) {
              throw new Error('Sorry, an unexpected error occured');
            }
            Router.push({
              pathname: `/grid/${grid.token}`,
            });
          } catch (error) {
            setLoading(false);
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
      case CreateGridPage.game:
        return <ChooseGame />;
      case CreateGridPage.rules:
        return <GridRules />;
      case CreateGridPage.signin:
        return <SignInForm loading={loading} />;
      case CreateGridPage.phone:
        return (
          <VerifyPhone
            onResendCode={handleSendVerificationText}
            resentCode={resentCode}
            loading={loading}
          />
        );
      default:
        return <ChooseSport />;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{renderPage()}</form>
    </FormProvider>
  );
};

export default CreateGridForm;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const cookies = req.cookies;

  const accessToken = cookies['x-access-token'];
  const refreshToken = cookies['x-refresh-token'];

  const verifiedRefreshToken = await verifyRefreshToken(refreshToken);

  if (verifiedRefreshToken) {
    const verifiedAccessToken = await verifyAccessToken(accessToken);
    if (verifiedAccessToken) {
      return { props: { user: verifiedAccessToken } };
    } else {
      const tokens = await generateTokens(verifiedRefreshToken);
      setCookie('x-access-token', tokens.accessToken, {
        req,
        res,
      });
      setCookie('x-refresh-token', tokens.refreshToken, {
        req,
        res,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });
      return { props: { user: verifiedRefreshToken } };
    }
  }

  return { props: { user: {} } };
};
