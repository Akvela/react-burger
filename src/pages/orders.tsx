import React, {FunctionComponent, useCallback} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/types/hooks';
import { logOut } from '../services/actions/user';
import { getCookie } from '../utils/cookie';
import { connectionStart, connectionClose } from '../services/actions/ws';
import { setUniqueId } from '../utils/utils';
import { OrderContainer } from '../components/order-container/order-container';
import { Loading } from '../components/loading/loading';
import ordersStyles from './orders.module.css';

export const Orders: FunctionComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orders } = useSelector(store => store.ws)
  const ordersList = orders?.reverse();
  const refreshToken = localStorage.getItem('refreshToken');

  const logoutUser = useCallback(() => {
    refreshToken && dispatch(logOut(refreshToken));
  }, [dispatch, logOut, history, refreshToken]);

  React.useEffect(() => {
    dispatch(connectionStart(`?token=${getCookie('accessToken')}`));

    return () => {
      dispatch(connectionClose());
    };
  }, [dispatch]);

  return(
    <>
      {orders ? (
        <main className={ordersStyles.page}>
        <div className={ordersStyles.container}>
          <ul className={ordersStyles.navigation}>
            <li className={ordersStyles.item}>
              <Link to='/profile' className={`${ordersStyles.link} text text_type_main-medium`}>Профиль</Link>
            </li>
            <li className={ordersStyles.item}>
              <Link to='/profile/orders'className={`${ordersStyles.link}  ${ordersStyles.linkActive} text text_type_main-medium`}>История заказов</Link>
            </li>
            <li className={ordersStyles.item}>
              <Link to='/' onClick={logoutUser} className={`${ordersStyles.link} text text_type_main-medium`}
              >Выход</Link>
            </li>
            <li className={ordersStyles.item}>
              <p className={`${ordersStyles.description} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
            </li>
          </ul>
          <ul className={ordersStyles.list}>
            {ordersList?.map((item)=>(
              <OrderContainer key={setUniqueId()} order={item} />
            ))}
          </ul>
        </div>
      </main> 
      ) : <Loading /> }
    </>
  )
}