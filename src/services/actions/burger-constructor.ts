import { setUniqueId } from '../../utils/utils';
import { TIngredient } from '../types/data';

export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const RESET_CONSTRUCTOR: 'RESET_CONSTRUCTOR' = 'RESET_CONSTRUCTOR';
export const REORDER_ITEMS: 'REORDER_ITEMS' = 'REORDER_ITEMS';

export interface IAddItemAction {
  type: typeof ADD_ITEM;
  item: TIngredient;
}
export interface IDeleteItemAction {
  type: typeof DELETE_ITEM;
  item: TIngredient;
}
export interface IResetConstructorAction {
  type: typeof RESET_CONSTRUCTOR;
}
export interface IReorderItemsAction {
  type: typeof REORDER_ITEMS;
  dragIndex: number;
  hoverIndex: number;
}

export function resetConstructor(): IResetConstructorAction {
  return { type: RESET_CONSTRUCTOR };
}
export function addItem(item: TIngredient): IAddItemAction {
  return { type: ADD_ITEM, item: { ...item, uniqueId: setUniqueId() } }
}
export function removeItem(item: TIngredient): IDeleteItemAction {
  return { type: DELETE_ITEM, item };
}
export function reorderItems(dragIndex: number, hoverIndex: number): IReorderItemsAction {
  return { type: REORDER_ITEMS, dragIndex, hoverIndex };
}

export type TBurgerConstructorActions = 
  | IAddItemAction
  | IDeleteItemAction
  | IResetConstructorAction
  | IReorderItemsAction;
