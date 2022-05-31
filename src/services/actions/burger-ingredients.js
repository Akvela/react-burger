import { getIngredients } from '../../utils/api';

export const INCREASE_COUNT = 'INCREASE_COUNT';
export const DECREASE_COUNT = 'DECREASE_COUNT';
export const RESET_COUNT = 'RESET_COUNT';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export function getDataIngredients() {
  return function(dispatch) {
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