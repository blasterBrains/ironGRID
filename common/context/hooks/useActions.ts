import { useContext } from 'react';
import {
  GridPayload,
  GridTypes,
  UserTypes,
  UserPayload,
} from '../../../common/types';
import { IronGridContext } from '../../../common/context';

const useActions = () => {
  const { dispatch } = useContext(IronGridContext);

  const createGrid = (payload: GridPayload[GridTypes.Create]) => {
    dispatch({
      type: GridTypes.Create,
      payload,
    });
  };

  const createUser = (payload: UserPayload[UserTypes.Create]) => {
    dispatch({
      type: UserTypes.Create,
      payload,
    });
  };

  const deleteUser = (id: string) => {
    dispatch({
      type: UserTypes.Delete,
      payload: { id },
    });
  };

  const deleteGrid = (id: string) => {
    dispatch({
      type: GridTypes.Delete,
      payload: { id },
    });
  };

  const updateGrid = (payload: GridPayload[GridTypes.Update]) => {
    dispatch({
      type: GridTypes.Update,
      payload,
    });
  };

  const updateUser = (payload: UserPayload[UserTypes.Update]) => {
    dispatch({
      type: UserTypes.Update,
      payload,
    });
  };

  return {
    createGrid,
    updateGrid,
    deleteGrid,
    createUser,
    updateUser,
    deleteUser,
  };
};

export default useActions;
