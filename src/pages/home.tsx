import React, {FunctionComponent} from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector, useDispatch } from '../services/types/hooks';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { getDataIngredients } from '../services/actions/burger-ingredients';
import { Loading } from '../components/loading/loading';
import homeStyles from './home.module.css';

export const Home: FunctionComponent = () => {
  const dispatch = useDispatch();
  const ingredientsRequest = useSelector(store => store.burgerIngredients.ingredientsRequest);

  React.useEffect(() => {
    dispatch(getDataIngredients());
  }, [dispatch]);

  return (
    <>
      <div className={`${homeStyles.app} pb-10`}>
        <main className={homeStyles.main}>
          <h1 className={`${homeStyles.title} text text_type_main-large pt-10`}>Соберите бургер</h1>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
          {ingredientsRequest && <Loading />}
        </main>
      </div>
    </>
  )
}