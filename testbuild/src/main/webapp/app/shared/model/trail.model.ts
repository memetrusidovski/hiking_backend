import { Moment } from 'moment';
import { IReview } from 'app/shared/model/review.model';
import { IComments } from 'app/shared/model/comments.model';

export interface ITrail {
  id?: number;
  title?: string;
  url?: string;
  content?: any;
  date?: Moment;
  trails?: IReview[];
  tags?: IComments[];
}

export const defaultValue: Readonly<ITrail> = {};
