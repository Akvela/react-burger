import { CLICK_ON_ORDER, CLOSE_MODAL_ORDER } from "../actions/orders";

const initialState = {
  orderInfo: {},
  orderIsClicked: false
}

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLICK_ON_ORDER:
      return {
        ...state,
        orderInfo: action.item,
        orderIsClicked: true
      }
    case CLOSE_MODAL_ORDER:
      return {
        ...state,
        orderInfo: {},
        orderIsClicked: false
      }

    default:
      return state
  }
}