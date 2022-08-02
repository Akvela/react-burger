import { TIngredient } from '../types/data';

export const CLICK_ON_INGREDIENT: 'CLICK_ON_INGREDIENT' = 'CLICK_ON_INGREDIENT';
export const CLOSE_MODAL_INGREDIENT: 'CLOSE_MODAL_INGREDIENT' = 'CLOSE_MODAL_INGREDIENT';

export interface IClickOnIngredientAction {
  type: typeof CLICK_ON_INGREDIENT;
  item: Array<TIngredient>;
}
export interface ICloseModalIngredientAction {
  type: typeof CLOSE_MODAL_INGREDIENT;
}

export type TIngredientDetailsActions = 
  | IClickOnIngredientAction
  | ICloseModalIngredientAction;