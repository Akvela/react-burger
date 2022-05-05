import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './app.module.css';

const urlApi = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [ingredients, setIngredients] = React.useState([])
  const [modalIngredientOpened, setModalIngredientOpened] = React.useState(false)
  const [modalOrderOpened, setModalOrderOpened] = React.useState(false)
  const [ingredientSelected, setIngredientSelected] = React.useState({})
  
  const getIngredients = () => {
    fetch(urlApi)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status)})
      .then(data => {
        setIngredients(data.data)
      })
       .catch(e => {
        console.log(e)
      })
  }
  
  React.useEffect(() => {
    getIngredients()
  }, [])

  const closeModalIngredient = () => {
    setModalIngredientOpened(false)
  }

  const closeModalOrder = () => {
    setModalOrderOpened(false)
  }

  const handleEscCloseOrder = (evt) => {
    evt.key === 'Escape' && closeModalOrder()
  }

  const handleEscCloseIngredient = (evt) => {
    evt.key === 'Escape' && closeModalIngredient()
  }

  const openModalIngredient = (ingredient) => {
    setIngredientSelected(ingredient)
    setModalIngredientOpened(true)
  }

  const openModalOrder = () => {
    setModalOrderOpened(true)
  }

  return (
    <div className={`${appStyles.app} pt-10 pb-10`}>
      <AppHeader />
      <main className={appStyles.main}>
        <h1 className={`${appStyles.title} text text_type_main-large pt-10`}>Соберите бургер</h1>
        <BurgerIngredients ingredients={ingredients} onIngredientClick={openModalIngredient} />
        <BurgerConstructor ingredients={ingredients} onButtonOrderClick={openModalOrder} />
      </main>
      {modalIngredientOpened && (
        <Modal onCloseClick={closeModalIngredient} onCloseEsc={handleEscCloseIngredient}>
          <IngredientDetails ingredient={ingredientSelected}/>
        </Modal>
      )}
      {modalOrderOpened && (
        <Modal onCloseClick={closeModalOrder} onCloseEsc={handleEscCloseOrder}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  )
}

export default App;