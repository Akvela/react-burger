import React, { FunctionComponent } from 'react';
import { useSelector } from '../../services/types/hooks';
import { Gallery } from '../gallery/gallery';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burger-ingredients.module.css';

export const BurgerIngredients: FunctionComponent = () => {
  const ingredients = useSelector(store => store.burgerIngredients.ingredients);
  
  const bunsArray = ingredients.filter(element => element.type === 'bun');
  const sauceArray = ingredients.filter(element => element.type === 'sauce');
  const mainArray = ingredients.filter(element => element.type === 'main');
  
  const [current, setCurrent] = React.useState('Булки');
  const bunsRef = React.useRef<HTMLDivElement>(null);
  const soucesRef = React.useRef<HTMLDivElement>(null);
  const mainRef = React.useRef<HTMLDivElement>(null);

  function scrollInfo(e: React.UIEvent<HTMLDivElement, UIEvent>) {
    const scrollPosition = e.currentTarget.scrollTop;
    const sauceContainer = soucesRef.current !== null && soucesRef.current.offsetTop;
    const mainContainer = mainRef.current !== null && mainRef.current.offsetTop;
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
          <Tab value="Булки" active={current === 'Булки'} onClick={(value) => { setCurrent(value); bunsRef.current?.scrollIntoView({ behavior: "smooth", }) }}>
            Булки
          </Tab>
        </li>
        <li>
          <Tab value="Соусы" active={current === 'Соусы'} onClick={(value) => { setCurrent(value); soucesRef.current?.scrollIntoView({ behavior: "smooth", }) }}>
            Соусы
          </Tab>
        </li>
        <li>
          <Tab value="Начинки" active={current === 'Начинки'} onClick={(value) => { setCurrent(value); mainRef.current?.scrollIntoView({ behavior: "smooth", }) }}>
            Начинки
          </Tab>
        </li>
      </ul>
      <div className={burgerIngredientsStyles.block} onScroll={scrollInfo}>
        <Gallery ingredientsType='Булки' data={bunsArray} ref={bunsRef} />
        <Gallery ingredientsType='Соусы' data={sauceArray} ref={soucesRef} />
        <Gallery ingredientsType='Начинки' data={mainArray} ref={mainRef} />
      </div>
    </div>
  )
}