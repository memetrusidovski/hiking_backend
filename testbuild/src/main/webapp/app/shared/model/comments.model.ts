import { ITrail } from 'app/shared/model/trail.model';

export interface IComments {
  id?: number;
  author?: string;
  description?: string;
  entries?: ITrail[];
}

export const defaultValue: Readonly<IComments> = {};
