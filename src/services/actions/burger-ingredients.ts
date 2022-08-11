import { getIngredients } from '../../utils/api';
import { TIngredient, TIngredientResponse } from '../types/data';
import { AppThunk } from '../types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';

export interface IGetIngredientsRequestAction {
  type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: Array<TIngredient>
}
export interface IGetIngredientsErrorAction {
  type: typeof GET_INGREDIENTS_ERROR;
}

export function getIngredientsRequest(): IGetIngredientsRequestAction {
  return { type: GET_INGREDIENTS_REQUEST };
}
export function getIngredientsSuccess(res: TIngredientResponse): IGetIngredientsSuccessAction {
  return { type: GET_INGREDIENTS_SUCCESS, ingredients: res.data };
}
export function getIngredientsError(): IGetIngredientsErrorAction {
  return { type: GET_INGREDIENTS_ERROR };
}

export type TBurgerIngredientsActions = 
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsErrorAction;

export const getDataIngredients = (): AppThunk => (dispatch) => {
  dispatch(getIngredientsRequest())
  return getIngredients()
    .then(res => {
      dispatch(getIngredientsSuccess(res))
    })
    .catch(err => { dispatch(getIngredientsError()) })
}