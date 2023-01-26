import { useCallback, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import AdminForm from './components/AdminForm';
import ChooseGame from './components/ChooseGame';
import GridRules from './components/GridRules';
import PhoneConfirm from './components/PhoneConfirm';

export interface FieldValues {
  gameId?: string;
  name?: string;
  size?: number;
  cost?: number;
  inverse?: boolean;
  adminName?: string;
  phone?: string;
  short_code?: number;
}

export enum CreateGridPage {
  rules = 'rules',
  admin = 'admin',
  game = 'game',
  phone = 'phone',
}

const CreateGridForm = () => {
  const [page, setPage] = useState<CreateGridPage>(CreateGridPage.game);
  const methods = useForm();

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    (data) => {
      console.log('onSubmit', data);
      switch (page) {
        case 'game':
          setPage(CreateGridPage.rules);
          break;
        case 'rules':
          setPage(CreateGridPage.admin);
          break;
        case 'admin':
          setPage(CreateGridPage.phone);
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
      case 'rules':
        return <GridRules />;
      case 'admin':
        return <AdminForm />;
      case 'phone':
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
