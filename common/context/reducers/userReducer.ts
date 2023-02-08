import type {
  GridActions,
  UserActions,
  UserWithGridsAndSquares,
} from '../../types';
import { GridTypes, UserTypes } from '../../types';

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
    case GridTypes.Create:
      return {
        ...state,
        grids: [...((state as UserWithGridsAndSquares).grids || []), payload],
      };
      return state;
    default:
      return state;
  }
}
