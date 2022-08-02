import { TIngredient } from '../types/data';

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';
export const REORDER_ITEMS: 'REORDER_ITEMS' = 'REORDER_ITEMS';

export interface IAddBunAction {
  type: typeof ADD_BUN;
  bunItem: TIngredient;
}
export interface IAddItemAction {
  type: typeof ADD_ITEM;
  data: Array<TIngredient>;
}
export interface IDeleteItemAction {
  type: typeof DELETE_ITEM;
  id: string;
}
export interface IResetConstructorAction {
  type: typeof RESET_CONSTRUCTOR;
}
export interface IReorderItemsAction {
  type: typeof REORDER_ITEMS;
  data: Array<TIngredient>;
}

export type TBurgerConstructorActions = 
  | IAddBunAction
  | IAddItemAction
  | IDeleteItemAction
  | IResetConstructorAction
  | IReorderItemsAction;
