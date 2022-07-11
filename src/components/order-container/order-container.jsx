import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale'
import React from 'react';
import { setUniqueId } from '../../utils/utils';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderContainerStyles from './order-container.module.css';

export const OrderContainer = ({status, number, createdAt, name, ingredients}) => {
  const allIngredients = useSelector(store => store.burgerIngredients.ingredients);
  const findIngredient = (ingredient) => {
    return allIngredients.find((item) => item._id === ingredient)
  }

  const lastIngredient = findIngredient(ingredients[5]);
  const numbersHidden = ingredients.length - 6;

  const calculateAmount = () => {
    let sum = 0;
    ingredients.forEach((ingredient) => {
      const check = allIngredients.find((item) => item._id === ingredient)
      if (check?.price) {
        sum += check.price
        if (check?.type === 'bun') {
          sum += check.price
        }
      }
    })
    return sum;
  }

  const determineDate = (date) => {
    const relativeDate = formatRelative(new Date(date), new Date(), { locale: ru });
    return relativeDate.split(' в ').join(', ') + ' i-GMT+3'
  }

  return(
    <div className={orderContainerStyles.box}>
      <div className={orderContainerStyles.header}>
        <p className='text text_type_digits-default'>{number}</p>
        <p className='text text_type_main-default text_color_inactive'>{determineDate(createdAt)}</p>
      </div>
      <h3 className='text text_type_main-medium pt-6'>{name}</h3>
      {!!status && <p className={`${orderContainerStyles.status} text text_type_main-default pt-2`}>{status}</p>}
      <div className={`${orderContainerStyles.details} pt-6`}>
        <ul className={orderContainerStyles.ingredients}>
          {ingredients.map((ingredient, index) => {
            const selectedElement = findIngredient(ingredient)
            if (index < 5) {
              return (
                <li key={setUniqueId()} style={{zIndex: 10 - index}} className={orderContainerStyles.ingredient}>
                  <img className={orderContainerStyles.ingredientsImage} src={selectedElement?.image}
                    alt={selectedElement?.name} />
                </li>
              )
          }})} 
          {lastIngredient && (
            <li key={setUniqueId()} style={{zIndex: 10 - 5}} className={orderContainerStyles.ingredient}>
              <img className={orderContainerStyles.lastIngredient} src={lastIngredient?.image}
                alt={lastIngredient?.name} />
              <p className={`${orderContainerStyles.count} text text_type_main-default`}>{`+${numbersHidden}`}</p>  
            </li>
            )
          }
        </ul>
        <div className={`${orderContainerStyles.price} text text_type_digits-default`}>
          {calculateAmount(ingredients)}
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  )
}
