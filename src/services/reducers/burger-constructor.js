import { ADD_BUN, ADD_ITEM, DELETE_ITEM, RESET_CONSTRUCTOR, REORDER_ITEMS } from '../actions/burger-constructor.js';

const initialState = {
  elements: [],
  bun: ''
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN:
      return { ...state, bun: action.bunItem ? {...action.bunItem, count: 2 } : state.bun }
    case ADD_ITEM:
      return { ...state, elements: [...state.elements, ...action.data] }
    case DELETE_ITEM:
      return { ...state, elements: [...state.elements].filter(item => { return item.uniqueId !== action.id }) }
    case REORDER_ITEMS:
      return { ...state, elements: action.data }
    case RESET_CONSTRUCTOR:
      return {
        ...state,
        elements: [],
        bun: ''
      }
    default:
      return state
  }
}