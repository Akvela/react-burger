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

const getOrderNumber = (arrIdIngredients) => {
  return fetch(`${urlApi}/orders`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ "ingredients": arrIdIngredients })
  })
  .then(res => checkResponse(res))
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
      'Authorization': 'Bearer ' + token
    },
    method: 'POST',
    body: JSON.stringify({ 
      'password': password,
      'token': token
    })
  })
  .then(res => checkResponse(res))
}

const createNewUser = (name, email, password, token) => {
  return fetch(`${urlApi}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      'name': name,
      'email': email,
      'password': password
    })
  })
  .then(res => checkResponse(res))
}


export {getIngredients, getOrderNumber, requestPassword, resetPassword, createNewUser}