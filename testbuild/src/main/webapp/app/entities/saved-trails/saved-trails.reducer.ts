import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISavedTrails, defaultValue } from 'app/shared/model/saved-trails.model';

export const ACTION_TYPES = {
  FETCH_SAVEDTRAILS_LIST: 'savedTrails/FETCH_SAVEDTRAILS_LIST',
  FETCH_SAVEDTRAILS: 'savedTrails/FETCH_SAVEDTRAILS',
  CREATE_SAVEDTRAILS: 'savedTrails/CREATE_SAVEDTRAILS',
  UPDATE_SAVEDTRAILS: 'savedTrails/UPDATE_SAVEDTRAILS',
  DELETE_SAVEDTRAILS: 'savedTrails/DELETE_SAVEDTRAILS',
  RESET: 'savedTrails/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISavedTrails>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SavedTrailsState = Readonly<typeof initialState>;

// Reducer

export default (state: SavedTrailsState = initialState, action): SavedTrailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SAVEDTRAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SAVEDTRAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SAVEDTRAILS):
    case REQUEST(ACTION_TYPES.UPDATE_SAVEDTRAILS):
    case REQUEST(ACTION_TYPES.DELETE_SAVEDTRAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SAVEDTRAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SAVEDTRAILS):
    case FAILURE(ACTION_TYPES.CREATE_SAVEDTRAILS):
    case FAILURE(ACTION_TYPES.UPDATE_SAVEDTRAILS):
    case FAILURE(ACTION_TYPES.DELETE_SAVEDTRAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SAVEDTRAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SAVEDTRAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SAVEDTRAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_SAVEDTRAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SAVEDTRAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/saved-trails';

// Actions

export const getEntities: ICrudGetAllAction<ISavedTrails> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SAVEDTRAILS_LIST,
  payload: axios.get<ISavedTrails>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISavedTrails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SAVEDTRAILS,
    payload: axios.get<ISavedTrails>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISavedTrails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SAVEDTRAILS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISavedTrails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SAVEDTRAILS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISavedTrails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SAVEDTRAILS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
