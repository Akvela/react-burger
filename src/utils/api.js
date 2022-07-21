const urlApi = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const getIngredients = () => {
  return fetch(`${urlApi}/ingredients`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
  })
    .then(res => checkResponse(res))
};

const getOrderNumber = (accessToken, arrIdIngredients) => {
  return fetch(`${urlApi}/orders`, {
    headers: {
      'Content-Type': 'application/json',
      authorization: accessToken
    },
    method: 'POST',
    body: JSON.stringify({ ingredients: arrIdIngredients })
  })
  .then(res => checkResponse(res))
};

const getOrderInfo = (number) => {
  return fetch(`${urlApi}/orders/${number}`).then(res => checkResponse(res))
};

const requestPassword = (email) => {
  return fetch(`${urlApi}/password-reset`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ 'email': email })
  })
    .then(res => checkResponse(res))
}

const resetPassword = (password, token) => {
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
  .then(res => checkResponse(res))
}

const createNewUser = (name, email, password) => {
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
  .then(res => checkResponse(res))
}

const getUser = (accessToken) => {
  return fetch(`${urlApi}/auth/user`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken
    },
  })
  .then(res => checkResponse(res))
}

const refreshUser = (name, email, password, accessToken) => {
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
  .then(res => checkResponse(res))
}

const login = (email, password) => {
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
  .then(res => checkResponse(res))
}

const refreshTokenUser = (refreshToken) => {
  return fetch(`${urlApi}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 'token': refreshToken })
  })
  .then(res => checkResponse(res))
}

const logout = (accessToken) => {
  return fetch(`${urlApi}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    },
    body: JSON.stringify({ 'token': accessToken })
  })
  .then(res => checkResponse(res))
}

export {getIngredients, getOrderNumber, requestPassword, resetPassword, createNewUser, login, 
  refreshTokenUser, logout, getUser, refreshUser, getOrderInfo}