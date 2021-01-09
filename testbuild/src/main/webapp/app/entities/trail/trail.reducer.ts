import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITrail, defaultValue } from 'app/shared/model/trail.model';

export const ACTION_TYPES = {
  FETCH_TRAIL_LIST: 'trail/FETCH_TRAIL_LIST',
  FETCH_TRAIL: 'trail/FETCH_TRAIL',
  CREATE_TRAIL: 'trail/CREATE_TRAIL',
  UPDATE_TRAIL: 'trail/UPDATE_TRAIL',
  DELETE_TRAIL: 'trail/DELETE_TRAIL',
  SET_BLOB: 'trail/SET_BLOB',
  RESET: 'trail/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITrail>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type TrailState = Readonly<typeof initialState>;

// Reducer

export default (state: TrailState = initialState, action): TrailState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRAIL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRAIL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TRAIL):
    case REQUEST(ACTION_TYPES.UPDATE_TRAIL):
    case REQUEST(ACTION_TYPES.DELETE_TRAIL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TRAIL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRAIL):
    case FAILURE(ACTION_TYPES.CREATE_TRAIL):
    case FAILURE(ACTION_TYPES.UPDATE_TRAIL):
    case FAILURE(ACTION_TYPES.DELETE_TRAIL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAIL_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRAIL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRAIL):
    case SUCCESS(ACTION_TYPES.UPDATE_TRAIL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRAIL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/trails';

// Actions

export const getEntities: ICrudGetAllAction<ITrail> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_TRAIL_LIST,
    payload: axios.get<ITrail>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ITrail> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRAIL,
    payload: axios.get<ITrail>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ITrail> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRAIL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ITrail> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRAIL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITrail> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRAIL,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
