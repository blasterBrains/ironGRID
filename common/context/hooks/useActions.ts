import { useContext } from 'react';
import { GridTypes, UserTypes } from '../../../common/types';
import { IronGridContext } from '../../../common/context';

const useActions = () => {
  const { state, dispatch } = useContext(IronGridContext);

  const createGrid = () => {
    dispatch({
      type: GridTypes.Create,
      payload: {
        id: 1,
        name: 'Anthony',
        cost: 5,
        size: 100,
        token: 'ZZZZ',
        inverse: false,
        game_id: '123456789',
        squares: [],
      },
    });
  };

  const createUser = () => {
    dispatch({
      type: UserTypes.Create,
      payload: {
        id: 1,
        name: 'Anthony',
        admin: true,
        phone: '1234567890',
        short_code: 347890,
      },
    });
  };

  const deleteUser = (id: number) => {
    dispatch({
      type: UserTypes.Delete,
      payload: { id: 1 },
    });
  };

  const deleteGrid = (id: number) => {
    dispatch({
      type: GridTypes.Delete,
      payload: { id },
    });
  };

  return {
    createGrid,
    deleteGrid,
    createUser,
    deleteUser,
  };
};

export default useActions;
