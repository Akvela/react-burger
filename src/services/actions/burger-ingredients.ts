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
  type: typeof INCREASE_COUNT;
  id: string;
}
export interface IDecreaseCountAction {
  type: typeof DECREASE_COUNT;
  id: string;
}
export interface IResetCountAction {
  type: typeof RESET_COUNT;
}
export interface IGetIngredientsRequestAction {
  type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  data: Array<TIngredient>
}
export interface IGetIngredientsErrorAction {
  type: typeof GET_INGREDIENTS_ERROR;
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