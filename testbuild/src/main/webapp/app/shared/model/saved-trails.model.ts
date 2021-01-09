import { IUser } from 'app/shared/model/user.model';
import { ITrail } from 'app/shared/model/trail.model';

export interface ISavedTrails {
  id?: number;
  title?: string;
  user?: IUser;
  trail?: ITrail;
}

export const defaultValue: Readonly<ISavedTrails> = {};
