import React, { createContext, Dispatch, useReducer } from 'react';
import type {
  IronGridStateContext,
  GridActions,
  UserActions,
  IronGridStateGrid,
  IronGridStateUser,
} from '../types';
import { Grid } from './reducers/gridReducer';
import { User } from './reducers/userReducer';

type InitialStateType = {
  grid: IronGridStateGrid;
  user: IronGridStateUser;
};

const initialState: InitialStateType = {
  grid: {},
  user: {},
};

export const IronGridContext = createContext<{
  state: InitialStateType;
  dispatch: Dispatch<GridActions | UserActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { grid, user }: InitialStateType,
  action: GridActions | UserActions
) => ({
  grid: Grid(grid, action),
  user: User(user, action),
});

interface OwnProps {
  children: JSX.Element;
}

export const StoreProvider = ({ children }: OwnProps) => {
  // const [state, dispatch] = useReducer(rootReducer, initialState);
  const [state, dispatch] = useReducer(mainReducer, initialState);
  // Important(!): memoize array value. Else all context consumers update on *every* render
  const store = React.useMemo(() => {
    return { state, dispatch };
  }, [state]);
  return (
    <IronGridContext.Provider value={store}>
      {' '}
      {children}{' '}
    </IronGridContext.Provider>
  );
};
