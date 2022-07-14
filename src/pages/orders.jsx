import { Link, Redirect } from 'react-router-dom';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT_USER } from '../services/actions/user';
import { logout } from '../utils/api';
import ordersStyles from './orders.module.css';
import { deleteCookie, getCookie } from '../utils/cookie';
import { WS_AUTH_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions/orders';
import { setUniqueId } from '../utils/utils';
import { OrderContainer } from '../components/order-container/order-container';

export function Orders() {
  const dispatch = useDispatch();
  const { ordersUser } = useSelector(store => store.orders)
  const { userName } = useSelector(store => store.user)

  React.useEffect(() => {
    dispatch({ type: WS_AUTH_CONNECTION_START })

   return () => {
     dispatch({ type: WS_CONNECTION_CLOSED })
   }
 }, [])


  if (userName === '') {
    return (
      <Redirect to='/login' />
    )
  }
  
  return(
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
            <Link to='/profile'
              onClick={() => { 
                const match = getCookie('refreshToken'); 
                match && logout(match); 
                deleteCookie('token'); 
                deleteCookie('refreshToken'); 
                dispatch({type: LOGOUT_USER}) 
              }}
              className={`${ordersStyles.link} text text_type_main-medium`}
            >Выход</Link>
          </li>
          <li className={ordersStyles.item}>
            <p className={`${ordersStyles.description} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
          </li>
        </ul>
        <ul className={ordersStyles.list}>
          {ordersUser && ordersUser?.orders.map((item)=>(
            <OrderContainer id={item._id} key={setUniqueId()} status={item.status} number={item.number} createdAt={item.createdAt} name={item.name} 
              ingredients={item.ingredients} path={`/profile/orders/${item._id}`} />
          ))}
        </ul>
      </div>
    </main>
  )
}