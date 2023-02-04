import Router, { useRouter } from 'next/router';
import { useCallback } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AdminForm from './components/AdminForm';
import ChooseGame from './components/ChooseGame';
import GridRules from './components/GridRules';
import PhoneConfirm from './components/PhoneConfirm';
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

const CreateGridForm = () => {
  const router = useRouter();
  const { page = CreateGridPage.game } = router.query as {
    page: CreateGridPage;
  };
  const methods = useForm();

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
          Router.push({
            pathname: '/create-grid',
            query: { page: CreateGridPage.phone },
          });
          break;
        default:
          // submit form
          break;
      }
    },
    [page]
  );

  const renderPage = () => {
    switch (page) {
      case CreateGridPage.rules:
        return <GridRules />;
      case CreateGridPage.admin:
        return <AdminForm />;
      case CreateGridPage.phone:
        return <PhoneConfirm />;
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
