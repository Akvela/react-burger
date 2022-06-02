import { INCREASE_COUNT, DECREASE_COUNT, RESET_COUNT, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR } from "../actions/burger-ingredients.js";

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
}

export const burgerIngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_COUNT:
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => {
          return item._id === action.id && item.type !== 'bun' ? {...item, count: item.count + 1 } : item
        })
      }
    case DECREASE_COUNT:
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => {
          return item._id === action.id ? {...item, count: item.count - 1 } : item
        })
      }
    case RESET_COUNT:
      return {
        ...state,
        ingredients: [...state.ingredients].map(item => {
          return {...item, count: 0 }
        })
      }
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        ingredientsRequest: true
      }
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.data.map(item => { return {...item, count: 0 } }),
        ingredientsRequest: false
      }
    case GET_INGREDIENTS_ERROR:
      return {
        ...state,
        ingredients: [],
        ingredientsRequest: false,
        ingredientsFailed: true,
    }
    default:
      return state
  }
}