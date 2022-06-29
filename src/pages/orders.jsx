import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT_USER } from '../services/actions/user';
import { logout } from '../utils/api';
import ordersStyles from './orders.module.css';
import { deleteCookie, getCookie } from '../utils/cookie';


export function Orders() {
  const dispatch = useDispatch();

  const { userName } = useSelector(store => store.user)
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
          <li className={`${ordersStyles.item} pt-20`}>
            <p className={`${ordersStyles.description} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
          </li>
        </ul>
      </div>
    </main>
  )
}