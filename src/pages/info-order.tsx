import React, {FunctionComponent} from 'react';
import { useDispatch } from '../services/types/hooks';
import { Link, Redirect } from 'react-router-dom';
import infoOrderStyles from './info-order.module.css';
import { OrderInfo } from '../components/order-info/order-info';
import { Loading } from '../components/loading/loading';
import { useLocation, useParams } from 'react-router-dom';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/ws';

export const InfoOrder: FunctionComponent = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: '/all' });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, [dispatch]);
  
  return (
    <div className={infoOrderStyles.item}>
      <OrderInfo headerStyle={'pl-30 ml-30'} />
    </div>
  )
}
