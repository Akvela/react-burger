import { Link, Redirect } from 'react-router-dom';
import React, {FunctionComponent} from 'react';
import { useSelector, useDispatch } from '../services/types/hooks';
import { logout } from '../utils/api';
import ordersStyles from './orders.module.css';
import { deleteCookie, getCookie } from '../utils/cookie';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSE } from '../services/actions/ws';
import { setUniqueId } from '../utils/utils';
import { OrderContainer } from '../components/order-container/order-container';
import { Loading } from '../components/loading/loading';
import { LOG_OUT_SUCCESS } from '../services/actions/user';

export const Orders: FunctionComponent = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(store => store.ws)
  const { userName } = useSelector(store => store.user)
  const refreshToken = localStorage.getItem('refreshToken');
  const ordersList = orders?.reverse();
  const accessToken = getCookie('accessToken');

  const logoutUser = () => {
    logout(refreshToken);
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    dispatch({ type: LOG_OUT_SUCCESS });
  }

  React.useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: `?token=${getCookie('accessToken')}` });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSE });
    };
  }, [dispatch]);
  
  if (userName === '') {
    return (
      <Redirect to='/login' />
    )
  }

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
              <Link to='/' onClick={() => logoutUser()} className={`${ordersStyles.link} text text_type_main-medium`}
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