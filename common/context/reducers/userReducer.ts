import type { IronGridStateUser, UserActions, GridActions } from '../../types';
import { UserTypes } from '../../types';

export function User(
  state: IronGridStateUser,
  action: UserActions | GridActions
) {
  const { type, payload } = action;
  switch (type) {
    case UserTypes.Create:
      return { User: payload, ...state };
    case UserTypes.Delete:
      return { User: payload, ...state };
    case UserTypes.Update:
      return { User: payload, ...state };
    default:
      return state;
  }
}
