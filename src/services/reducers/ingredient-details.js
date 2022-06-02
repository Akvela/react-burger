import { CLICK_ON_INGREDIENT, CLOSE_MODAL_INGREDIENT } from "../actions/ingredient-details.js";

const initialState = {
  currentItem: {},
  itemIsClicked: false
}

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_ON_INGREDIENT:
      return {
        ...state,
        currentItem: action.item[0],
        itemIsClicked: true
      }
    case CLOSE_MODAL_INGREDIENT:
      return {
        ...state,
        currentItem: {},
        itemIsClicked: false
      }
    default:
      return state
  }
}