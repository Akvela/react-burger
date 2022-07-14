import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale'
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { setUniqueId } from '../../utils/utils';
import { useSelector, useDispatch } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderInfoStyles from './order-info.module.css';
import { useParams } from 'react-router-dom';
import { getCookie, refreshTokenUser } from '../../utils/cookie.js';
import { getUserOrderNumber } from '../../services/actions/order-details';
import { Loading } from '../loading/loading';


export const OrderInfo = () => {
  const { ordersAll, currentOrder } = useSelector(store => store.orders);
  const { ingredients } = useSelector(store => store.burgerIngredients);
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedOrder = ordersAll?.orders.find(order => order._id === id)
  const token = getCookie('token');
  const refresh = getCookie('refreshToken');
  const location = useLocation();

  const findIngredient = selectedOrder?.ingredients.map((orderIngredient) => ingredients.find((ingredient) => ingredient._id === orderIngredient))
  
  const calculateAmount = () => {
    let sum = 0;
    let bun = 0;
    let count = 0;
    selectedOrder.ingredients.forEach((ingredient) => {
      const check = ingredients.find((item) => item._id === ingredient);
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
  
  React.useEffect(() => {
    id && dispatch(getUserOrderNumber(id, token, refresh, refreshTokenUser));
  }, [dispatch, id])

  return (
    <>
      { ordersAll && currentOrder ? (
        <div className={orderInfoStyles.item}>
          <p className='text text_type_digits-default'>#{selectedOrder?.number}</p>
          <h2 className='text text_type_main-medium pt-10'>{selectedOrder?.name}</h2>
          <p className={`${orderInfoStyles.status} text text_type_main-default pt-2`}>{selectedOrder?.status === 'done' ? 
                                                                                                                'Выполнен' : selectedOrder?.status === 'pending' ? 
                                                                                                                'Готовится': selectedOrder?.status === 'created' ? 
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
                          {findIngredient && (findIngredient.filter(item => (item?._id === ingredient?._id) && (item.type !== 'bun')).length) === 0 ? 2 : 
                            (findIngredient.filter(item => (item?._id === ingredient?._id)).length) }
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
            {selectedOrder && <p className='text text_type_main-default text_color_inactive'>{determineDate(selectedOrder.createdAt)}</p>}
            <div className={`${orderInfoStyles.price} text text_type_digits-default`}>
              {selectedOrder && calculateAmount(selectedOrder.ingredients)}
              <CurrencyIcon type='primary' />
            </div>
          </div>
        </div>
      ) : <Loading /> }
    </>
  )
}