import { NextApiRequest, NextApiResponse } from 'next';
import type { Prisma, Grid, Square, User } from '@prisma/client';

export interface GridWithSquares extends Grid {
  squares: Square[];
}

export interface UserWithGridsAndSquares extends User {
  squares: Square[];
  grids: Grid[];
}

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
  [UserTypes.Create]: UserWithGridsAndSquares;
  [UserTypes.Delete]: Pick<UserWithGridsAndSquares, 'id'>;
  [UserTypes.Update]: Partial<User>;
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
  [GridTypes.Create]: GridWithSquares;
  [GridTypes.Delete]: Pick<GridWithSquares, 'id'>;
  [GridTypes.Update]: Partial<Grid>;
  [GridTypes.CreateSquare]: GridWithSquares;
  [GridTypes.DeleteSquare]: Pick<Square, 'id'>;
  [GridTypes.UpdateSquare]: Partial<Square>;
};

export interface NextApiRequestWithGridData extends NextApiRequest {
  body: Prisma.GridCreateInput;
  query: Pick<Grid, 'id'>;
}

export interface NextApiResponsetWithGridData extends NextApiResponse {
  body: Grid;
}

// types for squares.ts
export interface NextApiRequestWithSquareData extends NextApiRequest {
  body: Prisma.SquareCreateInput;
  query: Pick<Square, 'id'>;
}

export interface NextApiResponseWithSquareData extends NextApiResponse {
  body: Square;
}

// types for users.ts
export interface NextApiRequestWithUserData extends NextApiRequest {
  body: Prisma.UserCreateInput;
  query: Pick<User, 'id'>;
}

export interface NextApiResponseWithUserData extends NextApiResponse {
  body: User;
}

//types for espn.ts
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
