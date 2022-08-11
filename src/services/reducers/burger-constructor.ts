import { ADD_ITEM, DELETE_ITEM, RESET_CONSTRUCTOR, REORDER_ITEMS } from '../actions/burger-constructor';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TIngredient } from '../types/data';
import update from 'immutability-helper';

type TBurgerConstructorState = {
  bun: TIngredient | null,
  filling: TIngredient[],
  orderIds: string[],
  totalPrice: number;
}

const initialState: TBurgerConstructorState = {
  bun: null,
  filling: [],
  orderIds: [],
  totalPrice: 0,
}

export const burgerConstructorReducer = (state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState => {
  switch (action.type) {
    case ADD_ITEM:
      if (action.item.type === 'bun') {
        if (state.bun) {
          return {
            ...state,
            bun: action.item,
            orderIds: [...state.orderIds].filter((id) => id !== state?.bun?._id).concat(action.item._id),
            totalPrice: state.totalPrice - state.bun.price * 2 + action.item.price * 2,
          }
        } else {
          return {
            ...state,
            bun: action.item,
            orderIds: [...state.orderIds, action.item._id],
            totalPrice: state.totalPrice + action.item.price * 2,
          }
        }
      }
      return {
        ...state,
        filling: [...state.filling, action.item],
        orderIds: [...state.orderIds, action.item._id],
        totalPrice: state.totalPrice + action.item.price,
      }

    case DELETE_ITEM:
      return { 
        ...state,
        filling: [...state.filling].filter((item) => item.uniqueId !== action.item.uniqueId),
        orderIds: [...state.orderIds].filter((id) => id !== action.item._id),
        totalPrice: state.totalPrice - action.item.price,
      }

    case REORDER_ITEMS:
      return { 
        ...state, 
        filling: update(state.filling, {
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.filling[action.dragIndex]],
          ],
        }), 
      }

    case RESET_CONSTRUCTOR:
      return initialState

    default:
      return state
  }
}