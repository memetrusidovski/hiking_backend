import { ITrail } from 'app/shared/model/trail.model';

export interface IReview {
  id?: number;
  title?: string;
  content?: any;
  rating?: number;
  trail?: ITrail;
}

export const defaultValue: Readonly<IReview> = {};
