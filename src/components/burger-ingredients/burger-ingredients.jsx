import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Gallery } from '../gallery/gallery.jsx';
import { Modal } from '../modal/modal.jsx';
import { IngredientDetails } from '../ingredient-details/ingredient-details.jsx';
import { CLOSE_MODAL_INGREDIENT } from '../../services/actions/ingredient-details';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';

export const BurgerIngredients = () => {
  const ingredients = useSelector(store => store.burgerIngredients.ingredients);
  const itemIsClicked = useSelector(store => store.ingredientDetails.itemIsClicked);
  const dispatch = useDispatch();
  
  const bunsArray = ingredients.filter(element => element.type === 'bun');
  const sauceArray = ingredients.filter(element => element.type === 'sauce');
  const mainArray = ingredients.filter(element => element.type === 'main');
  
  const [current, setCurrent] = React.useState('Булки');
  const bunsRef = React.useRef();
  const soucesRef = React.useRef();
  const mainRef = React.useRef();

  function scrollInfo(e) {
    const scrollPosition = e.target.scrollTop;
    const sauceContainer = soucesRef.current.offsetTop;
    const mainContainer = mainRef.current.offsetTop;
    if (scrollPosition + 300 <=sauceContainer) {
      setCurrent('Булки');
    }
    else if (scrollPosition + 300 <= mainContainer) {
      setCurrent('Соусы');
    } else {
      setCurrent('Начинки');
    }
  };

  return (
    <div className={`${burgerIngredientsStyles.menu} pr-10`}>
      <ul className={`${burgerIngredientsStyles.tab}`}>
        <li>
          <Tab value="Булки" active={current === 'Булки'} onClick={(value) => { setCurrent(value); bunsRef.current.scrollIntoView({ behavior: "smooth", }) }}>
            Булки
          </Tab>
        </li>
        <li>
          <Tab value="Соусы" active={current === 'Соусы'} onClick={(value) => { setCurrent(value); soucesRef.current.scrollIntoView({ behavior: "smooth", }) }}>
            Соусы
          </Tab>
        </li>
        <li>
          <Tab value="Начинки" active={current === 'Начинки'} onClick={(value) => { setCurrent(value); mainRef.current.scrollIntoView({ behavior: "smooth", }) }}>
            Начинки
          </Tab>
        </li>
      </ul>
      <div className={burgerIngredientsStyles.block} onScroll={e => { scrollInfo(e) }}>
        <Gallery ingredientsType='Булки' data={bunsArray} ref={bunsRef} />
        <Gallery ingredientsType='Соусы' data={sauceArray} ref={soucesRef} />
        <Gallery ingredientsType='Начинки' data={mainArray} ref={mainRef} />
      </div>
      {itemIsClicked && (
        <Modal onCloseClick={() => { dispatch({ type: CLOSE_MODAL_INGREDIENT }) }}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  )
}