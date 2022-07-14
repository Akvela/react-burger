import { useSelector, useDispatch } from 'react-redux';
import infoOrderStyles from './info-order.module.css';
import { OrderInfo } from '../components/order-info/order-info';
import { Loading } from '../components/loading/loading';

export function InfoOrder() {
  const { ordersAll, currentOrder } = useSelector(store => store.orders);

  return (
    <>
      { currentOrder ? (
        <div className={infoOrderStyles.item}>
          <OrderInfo />
        </div>
    ) : <Loading /> }
    </>
  )
}
