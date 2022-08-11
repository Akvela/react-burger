import { ReactNode } from 'react';

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
  uniqueId: number;
  id?: string;
}

export type TIngredientCard = {
  item: TIngredient
}

export type TConstructorItem = {
  id: number;
  index: number;
  key: number;
  children: ReactNode;
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

export type TOrderDataContainer = {
  order: TOrderData;
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

export type TIngredientResponse = {
  data: TIngredient[];
  success: boolean;
}

export type TUser = {
  email: string,
  name: string
}

export type TUserResponse = {
  success: boolean;
  user: TUser;
}

export type TLoginResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUser;
}

export type TLogoutResponse = {
  success: boolean;
  message: string;
}

export type TRefreshTokenResponse = {
  success: boolean;
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
  title?: string;
  children?: ReactNode;
}

export type TModalOverlay = {
  onClick: (evt: React.MouseEvent<HTMLDivElement>) => void;
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

export type TOrderIngredient = {
  item: {
    _id: string;
  }
}

export type TError = {
  success: boolean;
  message: string;
}