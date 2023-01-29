import type { GridActions, IronGridStateGrid, UserActions } from '../../types';
import { GridTypes } from '../../types';

export function Grid(
  state: IronGridStateGrid,
  action: GridActions | UserActions
) {
  const { type, payload } = action;
  console.log('type: ', type, 'payload: ', payload);
  const grid = payload;
  switch (type) {
    case GridTypes.Create:
      return payload;
    case GridTypes.Delete:
      return {};
    case GridTypes.Update:
      return { ...state, ...payload };
    case GridTypes.CreateSquare:
      return { squares: [...(state.squares || []), payload], ...state };
    case GridTypes.DeleteSquare:
      return {
        squares: state.squares?.filter((square) => square.id !== payload.id),
        ...state,
      };
    case GridTypes.UpdateSquare:
      let squareIndex = state.squares?.findIndex(square => square.id === payload.id)
      if (squareIndex === undefined || squareIndex === -1) return state
      let newSquare = {...state.squares?.[squareIndex], ...payload};
        return { squares: state.squares?.splice(squareIndex, 1, newSquare)}
    default:
      return state;
  }
}
