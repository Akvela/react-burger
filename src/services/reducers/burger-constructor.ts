import { ADD_BUN, ADD_ITEM, DELETE_ITEM, RESET_CONSTRUCTOR, REORDER_ITEMS } from '../actions/burger-constructor.js';
import { TBurgerConstructorActions } from '../actions/burger-constructor.js';
import { TIngredient } from '../types/data.js';

type TBurgerConstructorState = {
  elements: Array<TIngredient>;
  bun: TIngredient | { [key in any]: never };
};

const initialState: TBurgerConstructorState = {
  elements: [],
  bun: {}
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
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
      return initialState;
    default:
      return state
  }
}