const urlApi = 'https://norma.nomoreparties.space/api';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

const getIngredients = () => {
  return fetch(`${urlApi}/ingredients`)
    .then(res => checkResponse(res))
};

const getOrderNumber = (arrIdIngredients) => {
  return fetch(`${urlApi}/orders`, {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    method: 'POST',
    body: JSON.stringify({ "ingredients": arrIdIngredients })
  })
  .then(res => checkResponse(res))
};


export {getIngredients, getOrderNumber}