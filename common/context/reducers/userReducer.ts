import type {
  GridActions,
  UserWithGridsAndSquares,
  UserActions,
} from '../../types';
import { UserTypes } from '../../types';

export function User(
  state: UserWithGridsAndSquares | {},
  action: UserActions | GridActions
) {
  const { type, payload } = action;
  switch (type) {
    case UserTypes.Create:
      return payload;
    case UserTypes.Delete:
      return {};
    case UserTypes.Update:
      return { ...state, ...payload };
    default:
      return state;
  }
}
