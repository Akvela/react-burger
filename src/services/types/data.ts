export type TIngredient = {
  _id: string,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number,
  count?: number | undefined,
  uniqueId?: number
}

export type TOrder = {
  name: string,
  order: { number: number },
  success: boolean
}

export type TOrderData = {
  createdAt: string,
  ingredients: string[],
  name: string,
  number: number,
  status: string,
  updatedAt: string,
  _id: string
}

export type TUser = {
  success: boolean,
  user: {
    email: string,
    name: string
  },
  accessToken: string,
  refreshToken: string
}

export type TFeedOrder = {
  createdAt: string,
  ingredients: string[],
  name: string,
  number: number,
  status: string,
  updatedAt: string,
  _id: string
}

export type TFeedOrders = {
  total: number,
  totalToday: number,
  orders: Array<TFeedOrder>
}

export type TToken = {
  accessToken: string
}