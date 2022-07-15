import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import infoOrderStyles from './info-order.module.css';
import { OrderInfo } from '../components/order-info/order-info';
import { Loading } from '../components/loading/loading';

export function InfoOrder() {
  const { userName } = useSelector(store => store.user)

  if (userName === '') {
    return (
      <Redirect to='/login' />
    )
  }
  return (
    <div className={infoOrderStyles.item}>
      <OrderInfo headerStyle={'pl-30 ml-30'} />
    </div>
  )
}
