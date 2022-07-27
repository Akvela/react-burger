import { TIngredient } from '../types/data';

export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';
export const REORDER_ITEMS: 'REORDER_ITEMS' = 'REORDER_ITEMS';

export interface IAddBunAction {
  readonly type: typeof ADD_BUN;
  readonly bunItem: TIngredient;
}
export interface IAddItemAction {
  readonly type: typeof ADD_ITEM;
  readonly data: Array<TIngredient>;
}
export interface IDeleteItemAction {
  readonly type: typeof DELETE_ITEM;
  readonly id: number;
}
export interface IResetConstructorAction {
  readonly type: typeof RESET_CONSTRUCTOR;
}
export interface IReorderItemsAction {
  readonly type: typeof REORDER_ITEMS;
  readonly data: Array<TIngredient>;
}

export type TBurgerConstructorActions = 
  | IAddBunAction
  | IAddItemAction
  | IDeleteItemAction
  | IResetConstructorAction
  | IReorderItemsAction;
