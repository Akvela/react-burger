import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from 'react-redux';
import { AppHeader } from '../app-header/app-header.jsx';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.jsx';
import { BurgerConstructor } from '../burger-constructor/burger-constructor.jsx';
import { getDataIngredients } from '../../services/actions/burger-ingredients.js';
import appStyles from './app.module.css';

export const App = () => {
  const dispatch = useDispatch();
  const ingredientsRequest = useSelector(store => store.burgerIngredients.ingredientsRequest);

  React.useEffect(() => {
    dispatch(getDataIngredients());
  }, [dispatch]);

  return (
    <div className={`${appStyles.app} pb-10`}>
      <AppHeader />
      <main className={appStyles.main}>
        <h1 className={`${appStyles.title} text text_type_main-large pt-10`}>Соберите бургер</h1>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
        {ingredientsRequest && <p className={'text text_type_digits-medium text_color_inactive'}>Загрузка...</p>}
      </main>
    </div>
  )
}
