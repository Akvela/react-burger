import React, { useContext, useReducer } from 'react';
import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import List from '../list/list';
import burgerConstructorStyles from './burger-constructor.module.css';
// import PropTypes from 'prop-types';
//import { ingridientDataTypes } from '../../utils/types';
import { OrderContext } from '../../services/orderContext';
import { calculateSum } from '../../utils/sum';


const BurgerConstructor = ({ onButtonOrderClick }) => {
  const { ingredients, setIngredients } = useContext(OrderContext);
  const bun = ingredients.find(element => element.type === 'bun')
  
  const totalPrice = calculateSum(ingredients, bun);

  return(
    <div className='pt-1'>
      <div className={burgerConstructorStyles.item}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </div>
      <div className={burgerConstructorStyles.block}>
        <div className={burgerConstructorStyles.gallery}>
          <List />
        </div>
      </div>
      <div className={burgerConstructorStyles.item}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image_mobile}
        />
      </div>
      <div className={`${burgerConstructorStyles.info} pt-10 pr-4`}>
        <h2 className="text text_type_digits-medium">{totalPrice}</h2><div className={burgerConstructorStyles.coins}></div>
        <Button type="primary" size="large" onClick={() => onButtonOrderClick()}>Оформить заказ</Button>
      </div>
    </div>
  )
}

// BurgerConstructor.propTypes = {
//   ingredients: PropTypes.arrayOf(ingridientDataTypes.isRequired).isRequired,
//   onButtonOrderClick: PropTypes.func.isRequired
// }

export default BurgerConstructor;