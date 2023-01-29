import { NextApiRequest, NextApiResponse } from 'next';

//universal action mapping for types
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

//user-related state/context dispatch actions
export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];

//dispatch user type literals
export enum UserTypes {
  Create = 'CREATE_USER',
  Delete = 'DELETE_USER',
  Update = 'UPDATE_USER',
}

//typings for each user action type's payload
export type UserPayload = {
  [UserTypes.Create]: {
    id: number;
    name: string;
    admin: boolean;
    phone: string;
    short_code: number;
  };
  [UserTypes.Delete]: {
    id: number;
  };
  [UserTypes.Update]: {
    id: number;
    name?: string;
    admin?: boolean;
    phone?: string;
    short_code?: number;
  };
};

//grid-related state/context dispatch actions
export type GridActions = ActionMap<GridPayload>[keyof ActionMap<GridPayload>];

//dispatch grid type literals
export enum GridTypes {
  Create = 'CREATE_GRID',
  Delete = 'DELETE_GRID',
  Update = 'UPDATE_GRID',
  CreateSquare = 'CREATE_SQUARE',
  DeleteSquare = 'DELETE_SQUARE',
  UpdateSquare = 'UPDATE_SQUARE',
}

//typings for each grid action type's payload
export type GridPayload = {
  [GridTypes.Create]: {
    id: number;
    name: string;
    cost: number;
    size: number;
    token: string;
    inverse: boolean;
    game_id: string;
    squares: IronGridStateSquare[];
  };
  [GridTypes.Delete]: {
    id: number;
  };
  [GridTypes.Update]: {
    id: number;
    name?: string;
    cost?: number;
    size?: number;
    first?: number;
    second?: number;
    third?: number;
    final?: number;
    token?: string;
    inverse?: boolean;
    game_id?: string;
  };
  [GridTypes.CreateSquare]: {
    id?: number;
    user_id?: number;
    status?: string;
    grid_id?: number;
    index?: number;
  };
  [GridTypes.DeleteSquare]: {
    id: number;
  };
  [GridTypes.UpdateSquare]: {
    id: number;
    user_id?: number;
    status?: string;
    grid_id?: number;
    index?: number;
  };
};

//typing for postgres database (grids table) related transactions
export type GridData = {
  id: number;
  name: string;
  cost: number;
  size: number;
  first?: number;
  second?: number;
  third?: number;
  final?: number;
  token: string;
  inverse: boolean;
  game_id: string;
  squares: SquareData[];
};

export interface NextApiRequestWithGridData extends NextApiRequest {
  body: {
    id?: number;
    name: string;
    cost: number;
    size: number;
    first?: number;
    second?: number;
    third?: number;
    final?: number;
    token: string;
    inverse: boolean;
    game_id: string;
  };
}

export interface NextApiResponsetWithGridData extends NextApiResponse {
  body: {
    id: number;
    name: string;
    cost: number;
    size: number;
    first?: number;
    second?: number;
    third?: number;
    final?: number;
    token: string;
    inverse: boolean;
    game_id: string;
  };
}

// types for squares.ts
//typing for postgres database (squares table) related transactions
export interface SquareData {
  user_id: number;
  status?: string;
  grid_id: number;
  index: number;
}

export interface NextApiRequestWithSquareData extends NextApiRequest {
  body: {
    id?: number;
    user_id: number;
    status?: string;
    grid_id: number;
    index: number;
  };
}

export interface NextApiResponseWithSquareData extends NextApiResponse {
  body: {
    id: number;
    user_id: number;
    status?: string;
    grid_id: number;
    index: number;
  };
}

// types for users.ts
export interface Data {
  name: string;
  admin: boolean;
  phone: string;
  short_code: number;
}
export interface NextApiRequestWithUserData extends NextApiRequest {
  body: {
    name: string;
    admin: boolean;
    phone: string;
    short_code: number;
  };
}

export interface NextApiResponseWithUserData extends NextApiResponse {
  body: {
    id: number;
    name: string;
    admin: boolean;
    phone: string;
    short_code: number;
  };
}

//types for IronGridDataContext
export type IronGridStateSquare = {
  id?: number;
  user_id?: number;
  status?: string;
  grid_id?: number;
  index?: number;
};

export type IronGridStateGrid = {
  id?: number;
  name?: string;
  cost?: number;
  size?: number;
  first?: number;
  second?: number;
  third?: number;
  final?: number;
  token?: string;
  inverse?: boolean;
  game_id?: string;
  squares?: IronGridStateSquare[];
};

export type IronGridStateUser = {
  id?: number;
  name?: string;
  admin?: boolean;
  phone?: string;
  short_code?: number;
};

export type IronGridStateContext = {
  grid?: IronGridStateGrid;
  user?: IronGridStateUser;
  square?: IronGridStateSquare[];
};

enum GridActionKind {
  ADD_GRID = 'ADD_GRID',
  DELETE_GRID = 'DELETE_GRID',
  EDIT_GRID = 'EDIT_GRID',
}

export interface GridAction {
  type: GridActionKind;
  payload: IronGridStateGrid;
}

enum SquareActionKind {
  ADD_SQUARE = 'ADD_SQUARE',
  DELETE_SQUARE = 'DELETE_SQUARE',
  EDIT_SQUARE = 'EDIT_SQUARE',
}

export interface SquareAction {
  type: SquareActionKind;
  payload: IronGridStateSquare;
}

enum UserActionKind {
  ADD_USER = 'ADD_USER',
  DELETE_USER = 'DELETE_USER',
  EDIT_USER = 'EDIT_USER',
}

export interface UserAction {
  type: UserActionKind;
  payload: IronGridStateUser;
}

/* 
  ESPN Types
 */

export enum HomeAway {
  home,
  away,
}

export interface Competitor {
  abbreviation: string;
  alternateColor: string;
  color: string;
  displayName: string;
  id: string;
  homeAway: HomeAway;
  location: string;
  logo: string;
  logoDark: string;
  name: string;
  record: string;
  score: string;
  uid: string;
  order: number;
  winner: boolean;
}

export interface Event {
  id: string;
  clock: string;
  competitionId: string;
  name: string;
  date: string;
  note: string;
  location: string;
  period: number;
  season: number;
  playByPlayAvailable: boolean;
  shortname: string;
  summary: string;
  week: number;
  weekText: number;
  competitors: Competitor[];
  fullStatus: {
    clock: number;
    displayClock: string;
    period: number;
  };
}

export interface SmartDate {
  label: string;
  season: number;
  seasontype: number;
  week: number;
}

export interface League {
  abbreviation: string;
  id: string;
  isTournament: boolean;
  name: string;
  shortName: string;
  slug: string;
  uid: string;
  events: Event[];
  smartdates: SmartDate[];
}

export interface Sport {
  id: string;
  name: string;
  slug: string;
  uid: string;
  leagues: League[];
}
