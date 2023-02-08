import type {
  GridActions,
  UserActions,
  UserWithGridsAndSquares,
} from '../../types';
import { GridTypes, UserTypes } from '../../types';

function isUserWithGridsAndSquares(
  state: UserWithGridsAndSquares | {}
): state is UserWithGridsAndSquares {
  return (state as UserWithGridsAndSquares).grids !== undefined;
}

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
      if (isUserWithGridsAndSquares(state)) {
        return {
          ...state,
          grids: [...state.grids, payload],
        };
      }
      return state;
    default:
      return state;
  }
}
