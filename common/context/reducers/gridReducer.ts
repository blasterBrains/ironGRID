import type {
  GridActions,
  UserActions,
  GridWithSquaresAndCreator,
} from '../../types';
import { GridTypes } from '../../types';

export function Grid(
  state: GridWithSquaresAndCreator | {},
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
      return {
        squares: [
          ...((state as GridWithSquaresAndCreator).squares || []),
          payload,
        ],
        ...state,
      };
    case GridTypes.DeleteSquare:
      return {
        squares:
          (state as GridWithSquaresAndCreator).squares?.filter(
            (square) => square.id !== payload.id
          ) || [],
        ...state,
      };
    case GridTypes.UpdateSquare:
      let squareIndex = (state as GridWithSquaresAndCreator).squares?.findIndex(
        (square) => square.id === payload.id
      );
      if (squareIndex === undefined || squareIndex === -1) return state;
      let newSquare = {
        ...(state as GridWithSquaresAndCreator).squares?.[squareIndex],
        ...payload,
      };
      return {
        squares: (state as GridWithSquaresAndCreator).squares?.splice(
          squareIndex,
          1,
          newSquare
        ),
      };
    default:
      return state;
  }
}
