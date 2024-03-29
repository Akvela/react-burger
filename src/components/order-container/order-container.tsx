import { FunctionComponent } from 'react';
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale'
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { setUniqueId } from '../../utils/utils';
import { useSelector } from '../../services/types/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient, TOrderData, TOrderDataContainer } from '../../services/types/data';
import orderContainerStyles from './order-container.module.css';


export const OrderContainer: FunctionComponent<TOrderDataContainer> = ({ order }) => {
  const allIngredients = useSelector(store => store.burgerIngredients.ingredients);
  const { number, _id, createdAt, name, status, ingredients } = order;
  const location = useLocation();
  const { url } = useRouteMatch();
  const numbersHidden = ingredients.length === 6 ? '' : `+${ingredients.length - 6}`;

  const findIngredient = (ingredient: string) => {
    return allIngredients.find((item: TIngredient) => item._id === ingredient)
  }
  
  const lastIngredient = findIngredient(ingredients[5]);

  const calculateAmount = (arrayId: string[]) => {
    let sum = 0;
    let bun = 0;
    let count = 0;
    arrayId.forEach((ingredient) => {
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

  const determineDate = (date: string) => {
    const relativeDate = formatRelative(new Date(date), new Date(), { locale: ru });
    return relativeDate.split(' в ').join(', ') + ' i-GMT+3'
  }

  return(
    <li className={orderContainerStyles.card}>
      <Link className={orderContainerStyles.box} to={{ pathname: `${url}/${_id}`, state: { background: location} }}>
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
    </li>
  )
}