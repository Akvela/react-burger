import { getIngredients } from '../../utils/api';
import { TIngredient } from '../types/data';
import { AppThunk, AppDispatch } from '../types';

export const INCREASE_COUNT: 'INCREASE_COUNT' = 'INCREASE_COUNT';
export const DECREASE_COUNT: 'DECREASE_COUNT' = 'DECREASE_COUNT';
export const RESET_COUNT: 'RESET_COUNT' = 'RESET_COUNT';
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';

export interface IIncreaseCountAction {
  readonly type: typeof INCREASE_COUNT;
  readonly id: string;
}
export interface IDecreaseCountAction {
  readonly type: typeof DECREASE_COUNT;
  readonly id: string;
}
export interface IResetCountAction {
  readonly type: typeof RESET_COUNT;
}
export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  data: Array<TIngredient>
}
export interface IGetIngredientsErrorAction {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

export type TBurgerIngredientsActions = 
  | IIncreaseCountAction
  | IDecreaseCountAction
  | IResetCountAction
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsErrorAction;

export const getDataIngredients: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: GET_INGREDIENTS_REQUEST })
    getIngredients()
      .then(res => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data,
        })
      })
      .catch(err => { dispatch({ type: GET_INGREDIENTS_ERROR }) })
  }
}