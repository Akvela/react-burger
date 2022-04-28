import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectItemsOfType } from '../../utils/utils';
import { data, itemType } from '../../utils/const';
import Gallery from '../gallery/gallery';
import burgerIngredientsStyles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

const bunsArray = selectItemsOfType(itemType.bun.type, data);
export const sauceArray = selectItemsOfType(itemType.sauce.type, data);
export const mainArray = selectItemsOfType(itemType.main.type, data);
export const ingredientsArray = sauceArray.concat(mainArray);

const BurgerIngredients = () => {
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
        <Gallery itemList={bunsArray} />
        <h2 id='two' className='text text_type_main-medium pt-10 pb-6'>Соусы</h2>
        <Gallery itemList={sauceArray} />
        <h2 id='three' className='text text_type_main-medium pt-10 pb-6'>Начинки</h2>
        <Gallery itemList={mainArray} />
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['bun', 'main','sauce']).isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
})

export default BurgerIngredients;