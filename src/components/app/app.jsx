import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './app.module.css';

const urlApi = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [ingredients, setIngredients] = React.useState([])
  
  const getIngredients = () => {
    fetch(urlApi)
      .then(res => res.json())
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

  return (
    <div className={`${appStyles.app} pt-10 pb-10`}>
      <AppHeader />
      <main className={appStyles.main}>
        <h1 className={`${appStyles.title} text text_type_main-large pt-10`}>Соберите бургер</h1>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  )
}

export default App;