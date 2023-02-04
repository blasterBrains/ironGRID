import Router, { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AdminForm from './components/AdminForm';
import ChooseGame from './components/ChooseGame';
import GridRules from './components/GridRules';
import PhoneConfirm from './components/PhoneConfirm';
import axios from '../../common/utils/api';
import { Data } from '../../common/types';
import type { Users, Grids } from '@prisma/client';

export interface FieldValues {
  gameId?: string;
  name?: string;
  size?: number;
  cost?: number;
  inverse?: boolean;
  adminName?: string;
  phone?: string;
  short_code?: string;
}

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

  
  // return
  const handleCreateUser = useCallback(
    async (fields: FieldValues) => {
      const { phone, adminName } = fields;
      try {
        const { data: userResponse } = await axios.post<Users>('/users', {
          name: adminName,
          phone,
        });
      } catch (error) {
        methods.setError('apiResponse', {
          type: 'custom',
          message:
          'Sorry we are having issues creating your account. Please try again at a later time.',
        });
      }
    },
    [methods]
    );
    
    const handleCreateGrid = () => {};
  const handleVerifyPhone = useCallback(
    async (fields: FieldValues) => {
      const { phone, short_code: shortCode } = fields;
      try {
        const { data } = await axios.post<VerifyPhoneResponse>('/verify-code', {
          phone,
          short_code: shortCode,
        });
        if (data.status === 'approved') {
          handleCreateUser(fields);
        } else {
          throw new Error(data.reason);
        }
      } catch (error) {
        // TODO: need to clearErrors()
        methods.setError('apiResponse', {
          type: 'custom',
          message: 'Invalid token, please try again',
        });
      }
    },
    [handleCreateUser, methods]
  );


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
        // TODO: need to clearErrors()
        methods.setError('apiResponse', {
          type: 'custom',
          message: 'An unexpected error occured',
        });
      }
    },
    [methods]
  );

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    (data) => {
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
          handleVerifyPhone(data);
          break;
      }
    },
    [page, handleSendVerificationText, handleVerifyPhone]
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
