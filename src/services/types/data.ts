import { MouseEventHandler, ReactNode } from 'react';

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count?: number | undefined;
  uniqueId?: string;
  id?: string;
  index: number;
  key?: string;
}

export type TConstructorItem = {
  id: string;
  index?: number;
  key: string
}

export type TIngredientPage = {
  title: string | number | null;
}  

export type TOrder = {
  name: string;
  number: number;
  success: boolean;
}

export type TOrderData = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export type TOrderResponse = {
  name: string;
  order: TOrder;
  success: boolean;
}

export type TPasswordResponse = {
  success: boolean;
  message: string;
}

export type TUser = {
  success: boolean;
  user: {
    email: string,
    name: string
  },
  accessToken: string;
  refreshToken: string;
}

export type TFeedOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export type TFeedOrders = {
  total: number;
  totalToday: number;
  orders: Array<TFeedOrder>;
}

export type TToken = {
  accessToken: string;
  refreshToken: string;
  requestParams: object;
  name?: string; 
  email?: string;
  password?: string;
  getUserInfo?: () => void;

}

export type TIngredientsResponse = {
  data: TIngredient[];
  success: boolean;
}

export type TCookieProps = {
  [name: string]: string | number | boolean | Date | undefined;
  expires?: Date | number | string;
}

export type TLocation = {
  hash: string;
  pathname: string;
  search: string;
  state: object | null;
}

export type TModal = {
  onCloseClick: () => void;
  title?: string | number;
  children: ReactNode;
}

export type TModalOverlay = {
  onClick: () => void;
}

export type TProtectedRoute = {
  children: ReactNode;
  path: string;
  exact: boolean;
}

export type TOrderInfo = {
  headerStyle?: string;
}

export type TIngredientDetails = {
  title?: string | number;
}

export type TGallery = {
  ingredientsType: string;
  data: Array<TIngredient>;
}
