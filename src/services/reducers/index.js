import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor.js';
import { burgerIngredientsReducer } from './burger-ingredients.js';
import { ingredientDetailsReducer } from './ingredient-details.js';
import { orderDetailsReducer } from './order-details.js';
import { ordersReducer } from './orders.js';
import { userReducer } from './user.js';
import { wsReducer } from './ws.js';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer,
  orders: ordersReducer,
  user: userReducer,
  ws: wsReducer
});