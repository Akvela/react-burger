import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale'
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { setUniqueId } from '../../utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { CLICK_ON_ORDER } from '../../services/actions/orders';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderContainerStyles from './order-container.module.css';

export const OrderContainer = ({status, number, createdAt, name, ingredients, id, path}) => {
  const allIngredients = useSelector(store => store.burgerIngredients.ingredients);
  const location = useLocation();
  const dispatch = useDispatch();

  const findIngredient = (ingredient) => {
    return allIngredients.find((item) => item._id === ingredient)
  }

  const lastIngredient = findIngredient(ingredients[5]);
  const numbersHidden = ingredients.length === 6 ? '' : `+${ingredients.length - 6}`;

  const calculateAmount = () => {
    let sum = 0;
    let bun = 0;
    let count = 0;
    ingredients.forEach((ingredient) => {
      const check = allIngredients.find((item) => item._id === ingredient);
      if (check?.price) {
        sum += check.price;
        if (check?.type === 'bun') {
          sum += check.price;
          bun = check.price;
          count += 1;
        }
      }
    })
    if (count === 2) {
      sum = sum - 2 * bun
    }
    return sum;
  }

  const determineDate = (date) => {
    const relativeDate = formatRelative(new Date(date), new Date(), { locale: ru });
    return relativeDate.split(' в ').join(', ') + ' i-GMT+3'
  }

  return(
    <Link className={orderContainerStyles.box} to={{
      pathname: path,
      state: { background: location }
    }} onClick={()=> {dispatch({type: CLICK_ON_ORDER, payload: id})}}>
        <div className={orderContainerStyles.header}>
          <p className='text text_type_digits-default'>#{number}</p>
          <p className='text text_type_main-default text_color_inactive'>{determineDate(createdAt)}</p>
        </div>
        <h3 className={`${orderContainerStyles.name} text text_type_main-medium pt-6`}>{name}</h3>
        {!!status && <p className={`${orderContainerStyles.status} text text_type_main-default pt-2`}>{status === 'done' ? 'Выполнен' : status === 'pending' ? 'Готовится': status === 'created' ? 'Создан' : 'Выполнен' }</p>}
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
                <p className={`${orderContainerStyles.count} text text_type_main-default`}>{`${numbersHidden}`}</p>  
              </li>
              )
            }
          </ul>
          <div className={`${orderContainerStyles.price} text text_type_digits-default`}>
            {calculateAmount(ingredients)}
            <CurrencyIcon type='primary' />
          </div>
        </div>

    </Link>
  )
}
