import { TIngredientsResponse, TOrderResponse, TPasswordResponse, TUser, TToken } from "../services/types/data";

const urlApi = 'https://norma.nomoreparties.space/api';

const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const getIngredients = () => {
  return fetch(`${urlApi}/ingredients`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
  })
    .then(res => checkResponse<TIngredientsResponse>(res))
};

const getOrderNumber = (accessToken: string, order: Array<string>) => {
  return fetch(`${urlApi}/orders`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: accessToken
    },
    method: 'POST',
    body: JSON.stringify({ ingredients: order })
  })
  .then(res => checkResponse<TOrderResponse>(res))
};

const requestPassword = (email: string) => {
  return fetch(`${urlApi}/password-reset`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ 'email': email })
  })
    .then(res => checkResponse<TPasswordResponse>(res))
}

const resetPassword = (password: string, token: string) => {
  return fetch(`${urlApi}/password-reset/reset`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ 
      'password': password,
      'token': token
    })
  })
  .then(res => checkResponse<TPasswordResponse>(res))
}

const createNewUser = (name: string, email: string, password: string) => {
  return fetch(`${urlApi}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': name,
      'email': email,
      'password': password
    })
  })
  .then(res => checkResponse<TUser>(res))
}

const getUser = (accessToken: string) => {
  return fetch(`${urlApi}/auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
  })
  .then(res => checkResponse<TUser>(res))
}


const refreshUser = (name: string, email: string, password: string, accessToken: string) => {
  return fetch(`${urlApi}/auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
    method: 'PATCH',
    body: JSON.stringify({ 
      'name': name,
      'email': email,
      'password': password
    })
  })
  .then(res => checkResponse<TUser>(res))
}

const login = (email: string, password: string) => {
  return fetch(`${urlApi}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  })
  .then(res => checkResponse<TUser>(res))
}

const refreshTokenUser = (refreshToken: string) => {
  return fetch(`${urlApi}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'token': refreshToken })
  })
  .then(res => checkResponse<TUser>(res))
}

const logout = (refreshToken: string) => {
  return fetch(`${urlApi}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + refreshToken
    },
    body: JSON.stringify({ 'token': refreshToken })
  })
  .then(res => checkResponse<TToken>(res))
}

export {getIngredients, getOrderNumber, requestPassword, resetPassword, createNewUser, login, 
  refreshTokenUser, logout, getUser, refreshUser}