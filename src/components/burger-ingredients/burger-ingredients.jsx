import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { selectItemsOfType } from '../../utils/utils';
import { data, itemType } from '../../utils/const';
import Gallery from '../gallery/gallery';
import burgerIngredientsStyles from './burger-ingredients.module.css';

const buns = selectItemsOfType(itemType.bun.type, data);
const sauce = selectItemsOfType(itemType.sauce.type, data);
const main = selectItemsOfType(itemType.main.type, data);

const BurgerIngredients = () => {
  const [current, setCurrent] = React.useState('one');

  return (
    <div className={`${burgerIngredientsStyles.menu} mb-10`}>
      <div className={`${burgerIngredientsStyles.tab} pb-10`}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
        </div>
      <div className={burgerIngredientsStyles.blocks}>
        <h2 className='text text_type_main-medium pb-6'>Булки</h2>
        <Gallery itemList={buns} />
        <h2 className='text text_type_main-medium pt-10 pb-6'>Соусы</h2>
        <Gallery itemList={sauce} />
        <h2 className='text text_type_main-medium pt-10 pb-6'>Начинки</h2>
        <Gallery itemList={main} />
      </div>
    </div>
  )


}

export default BurgerIngredients;