import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { setUniqueId } from '../../utils/utils';
import { useSelector } from '../../services/types/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TOrderInfo, TIngredient } from '../../services/types/data';
import orderInfoStyles from './order-info.module.css';

export const OrderInfo: FunctionComponent<TOrderInfo> = ({headerStyle}) => {
  const { orders } = useSelector(store => store.ws);
  const { id } = useParams<{ id: string }>();
  const { ingredients } = useSelector(store => store.burgerIngredients);
  const currentOrder = orders?.find((item) => item._id === id);
  const currentItems = currentOrder?.ingredients;
  const findIngredient = currentItems?.map((orderIngredient: string) => ingredients.find((ingredient: TIngredient) => ingredient._id === orderIngredient))

  const calculateAmount = (ingredientsOrder: string[]) => {
    let sum = 0;
    let bun = 0;
    let count = 0;
    ingredientsOrder.forEach((ingredient: string) => {
      const check = ingredients.find((item: TIngredient) => item._id === ingredient);
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

  return (
    <> 
    {currentOrder &&
      <div className={orderInfoStyles.item}>
        <p className={`${headerStyle} text text_type_digits-default`}>#{currentOrder?.number}</p>
        <h2 className='text text_type_main-medium pt-10'>{currentOrder?.name}</h2>
        <p className={`${orderInfoStyles.status} text text_type_main-default pt-2`}>{currentOrder?.status === 'done' ? 
                                                                                                              'Выполнен' : currentOrder?.status === 'pending' ? 
                                                                                                              'Готовится': currentOrder?.status === 'created' ? 
                                                                                                              'Создан' : 'Выполнен' }</p>
        <h3 className={`${orderInfoStyles.details} text text_type_main-medium pt-15`}>Состав:</h3>
        <ul className={orderInfoStyles.list}>
          {
            Array.from(new Set(findIngredient))?.map((ingredient) => {
              return (
                <li key={setUniqueId()} className={orderInfoStyles.ingredient}>
                  <img className={orderInfoStyles.ingredientsImage} src={ingredient?.image} alt={ingredient?.name} />
                  <h4 className={`${orderInfoStyles.name} text text_type_main-default pl-4`}>{ingredient?.name}</h4>
                  <div className={`${orderInfoStyles.price} text text_type_digits-default`}>
                    <span>
                      {findIngredient && (findIngredient.filter(item => (item?._id === ingredient?._id) && (item?.type !== 'bun')).length) === 0 ? 2 : 
                        (findIngredient?.filter(item => (item?._id === ingredient?._id)).length) }
                    </span>
                    x
                    <p className={orderInfoStyles.details}>
                      {ingredient?.price}<CurrencyIcon type='primary' />
                    </p>
                  </div>
                </li>
              )
            })
          } 
        </ul>
        <div className={`${orderInfoStyles.paragraph} text text_type_digits-default`}>
          <p className='text text_type_main-default text_color_inactive'>{determineDate(currentOrder?.createdAt)}</p>
          <div className={`${orderInfoStyles.price} text text_type_digits-default`}>
            {calculateAmount(currentOrder?.ingredients)}
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    }
    </> 
  )
}