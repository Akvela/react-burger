import React from 'react';
import { IngredientsContext } from '../../services/ingredients-context';
import { getIngredients, getOrderNumber } from '../../utils/api';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import appStyles from './app.module.css';

const App = () => {
  const [modalIngredientOpened, setModalIngredientOpened] = React.useState(false);
  const [modalOrderOpened, setModalOrderOpened] = React.useState(false);
  const [ingredientSelected, setIngredientSelected] = React.useState({});
  const [orderInfo, setOrderInfo] = React.useState({
    numberOrder: 0,
    errorOrder: false
  });
  
  const [state, setState] = React.useState({
    ingredients: [],
    selectedIngredients: [],
    isLoading: true
  })
  
  React.useEffect(() => {
    getIngredients()
      .then(res => setState({
        ...state,
        ingredients: res.data,
        selectedIngredients: [res.data[0], res.data[3], res.data[4], res.data[5], res.data[6], res.data[7]],
        isLoading: false
        })
      )
      .catch(error => {
        setState({...state, isLoading: false})
      })
    }, [])

  const closeModal = () => {
    setModalIngredientOpened(false)
    setModalOrderOpened(false)
  }

  const openModalIngredient = (ingredient) => {
    setIngredientSelected(ingredient)
    setModalIngredientOpened(true)
  }

  const openModalOrder = () => {
    const arrId = state.selectedIngredients.map((ingredient) => ingredient._id);
    getOrderNumber(arrId)
      .then(res => setOrderInfo({
        numberOrder: res.order.number,
        errorOrder: false
      }))
      .catch(error => setOrderInfo({
        numberOrder: 0,
        errorOrder: true
      }))
      .finally (() => setModalOrderOpened(true))
  }

  return (
    <div className={`${appStyles.app} pb-10`}>
      <AppHeader />
      <main className={appStyles.main}>
        <h1 className={`${appStyles.title} text text_type_main-large pt-10`}>Соберите бургер</h1>
        {!state.isLoading &&
          <IngredientsContext.Provider value={state}>
            <BurgerIngredients onIngredientClick={openModalIngredient} />
            <BurgerConstructor onButtonOrderClick={openModalOrder} />
          </IngredientsContext.Provider>
        }
        {state.isLoading && <p className={'text text_type_main-large'}>Загрузка...</p>}
      </main>
      {modalIngredientOpened && (
        <Modal onCloseClick={closeModal}>
          <IngredientDetails ingredient={ingredientSelected}/>
        </Modal>
      )}
      {modalOrderOpened && (
        <Modal onCloseClick={closeModal}>
          <OrderDetails orderInfo={orderInfo} />
        </Modal>
      )}
    </div>
  )
}

export default App;