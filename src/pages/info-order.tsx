import React, {FunctionComponent} from 'react';
import { useDispatch } from '../services/types/hooks';
import { OrderInfo } from '../components/order-info/order-info';
import { connectionStart, connectionClose } from '../services/actions/ws';
import infoOrderStyles from './info-order.module.css';

export const InfoOrder: FunctionComponent = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(connectionStart('/all'));

    return () => {
      dispatch(connectionClose());
    };
  }, [dispatch]);
  
  return (
    <div className={infoOrderStyles.item}>
      <OrderInfo headerStyle={'pl-30 ml-30'} />
    </div>
  )
}
