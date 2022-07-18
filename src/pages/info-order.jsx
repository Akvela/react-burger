import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import infoOrderStyles from './info-order.module.css';
import { OrderInfo } from '../components/order-info/order-info';
import { Loading } from '../components/loading/loading';
import { useLocation, useParams } from 'react-router-dom';

export function InfoOrder() {
  
  return (
    <div className={infoOrderStyles.item}>
      <OrderInfo headerStyle={'pl-30 ml-30'} />
    </div>
  )
}
