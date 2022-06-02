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


export {getIngredients, getOrderNumber}