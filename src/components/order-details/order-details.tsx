import orderDetailsStyles from './order-details.module.css';
import { useSelector } from '../../services/types/hooks';
import { FunctionComponent } from 'react';

export const OrderDetails: FunctionComponent = () => {
  const { orderFailed, orderNumber } = useSelector(store => store.orderDetails);

  return(
    <div className={orderDetailsStyles.container}>
      {!orderFailed
        ? <h2 className={`${orderDetailsStyles.title} text text_type_digits-large`}>{orderNumber}</h2>
        : <p className='text text_type_main-default'>Произошла ошибка</p>
      }
      <p className={'text text_type_main-medium pt-8'}>идентификатор заказа</p>
      <div className={`${orderDetailsStyles.image} pt-15 pb-15`} />
      <p className={'text text_type_main-default'}>Ваш заказ начали готовить</p>
      <p className={'text text_type_main-default text_color_inactive pt-2'}>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}