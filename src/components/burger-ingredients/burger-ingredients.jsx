import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Gallery from '../gallery/gallery';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { ingridientDataTypes } from '../../utils/types';

const BurgerIngredients = ({ ingredients, onIngredientClick }) => {
  const bunsArray = ingredients.filter(element => element.type === 'bun');
  const sauceArray = ingredients.filter(element => element.type === 'sauce');
  const mainArray = ingredients.filter(element => element.type === 'main');
  
  const [current, setCurrent] = React.useState('one');

  const handleClick = (activeTab) => {
    setCurrent(activeTab);
    let anchorElement = document.getElementById(activeTab)
    anchorElement.scrollIntoView({behavior: 'smooth'});
 }

  return (
    <div className={`${burgerIngredientsStyles.menu} pr-10`}>
      <div className={`${burgerIngredientsStyles.tab}`}>
        <Tab value="one" active={current === 'one'} onClick={()=>{handleClick('one')}}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={()=>{handleClick('two')}}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={()=>{handleClick('three')}}>
          Начинки
        </Tab>
      </div>
      <div className={burgerIngredientsStyles.block}>
        <h2 id='one' className='text text_type_main-medium pb-6 pt-10'>Булки</h2>
        <Gallery itemList={bunsArray} handleClick={onIngredientClick} />
        <h2 id='two' className='text text_type_main-medium pt-10 pb-6'>Соусы</h2>
        <Gallery itemList={sauceArray} handleClick={onIngredientClick} />
        <h2 id='three' className='text text_type_main-medium pt-10 pb-6'>Начинки</h2>
        <Gallery itemList={mainArray} handleClick={onIngredientClick} />
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingridientDataTypes.isRequired).isRequired,
  onIngredientClick: PropTypes.func.isRequired
}

export default BurgerIngredients;