import type { IronGridStateGrid, UserActions, GridActions } from '../../types';
import { GridTypes } from '../../types';

export function Grid(
  state: IronGridStateGrid,
  action: GridActions | UserActions
) {
  const { type, payload } = action;
  switch (type) {
    case GridTypes.Create:
      return { grid: payload, ...state };
    case GridTypes.Delete:
      return { grid: payload, ...state };
    case GridTypes.Update:
      return { grid: payload, ...state };
    case GridTypes.CreateSquare:
      return { grid: payload, ...state };
    case GridTypes.DeleteSquare:
      return { grid: payload, ...state };
    default:
      return state;
  }
}
