import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Gallery from '../gallery/gallery';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../services/ingredients-context';

const BurgerIngredients = ({ onIngredientClick }) => {
  const ingredients = React.useContext(IngredientsContext).ingredients;

  const bunsArray = ingredients.filter(element => element.type === 'bun');
  const sauceArray = ingredients.filter(element => element.type === 'sauce');
  const mainArray = ingredients.filter(element => element.type === 'main');
  
  const [current, setCurrent] = React.useState('bun');

  const handleClick = (activeTab) => {
    setCurrent(activeTab);
    let anchorElement = document.getElementById(activeTab)
    anchorElement.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <div className={`${burgerIngredientsStyles.menu} pr-10`}>
      <div className={`${burgerIngredientsStyles.tab}`}>
        <Tab value="bun" active={current === 'bun'} onClick={()=>{handleClick('bun')}}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={()=>{handleClick('sauce')}}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={()=>{handleClick('main')}}>
          Начинки
        </Tab>
      </div>
      <div className={burgerIngredientsStyles.block}>
        <h2 id='bun' className='text text_type_main-medium pb-6 pt-10'>Булки</h2>
        <Gallery itemList={bunsArray} handleClick={onIngredientClick} />
        <h2 id='sauce' className='text text_type_main-medium pt-10 pb-6'>Соусы</h2>
        <Gallery itemList={sauceArray} handleClick={onIngredientClick} />
        <h2 id='main' className='text text_type_main-medium pt-10 pb-6'>Начинки</h2>
        <Gallery itemList={mainArray} handleClick={onIngredientClick} />
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  onIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredients;