import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor.js';
import { burgerIngredientsReducer } from './burger-ingredients.js';
import { ingredientDetailsReducer } from './ingredient-details.js';
import { orderDetailsReducer } from './order-details.js';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer
});