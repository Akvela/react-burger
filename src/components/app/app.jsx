import React from 'react';
import { useLocation, Switch, Route, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_MODAL_INGREDIENT } from '../../services/actions/ingredient-details';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderInfo } from '../order-info/order-info';
import { AppHeader } from '../app-header/app-header';
import { getCookie, setCookie, refreshTokenUser } from '../../utils/cookie';
import { getDataIngredients } from '../../services/actions/burger-ingredients';
import { refreshToken } from '../../utils/api';
import ProtectedRoute from '../protected-route/protected-route';
import { Home, Login, Register, ForgotPassword, ResetPassword, Profile, Ingredient, Orders, NotFound, Feed, InfoOrder } from '../../pages';
import { getUserInfo } from '../../services/actions/user';
import { CLOSE_MODAL_ORDER } from '../../services/actions/order-details';

export default function App() {
  const refresh = getCookie('refreshToken');
  const token = getCookie('token');
  const location = useLocation();
  const history = useHistory();
  const background = history.action === 'PUSH' && location.state?.background;
  console.log('что есть history.action', history.action)
  const dispatch = useDispatch();
  const loginStatus = useSelector(store => store.user.loginStatus);
  const { orders } = useSelector(store => store.ws)
  
  React.useEffect(() => {
    dispatch(getDataIngredients());
    refresh && refreshToken(refresh).then(res => { setCookie('token', res.accessToken.split('Bearer ')[1]); setCookie('refreshToken', res.refreshToken) })
    .then(() => {
      dispatch(getUserInfo(token));
    })
    const interval = setInterval(refreshTokenUser, 60 * 60 * 1000)
    return () => {
      clearInterval(interval)
    }
  }, [background])

  const closeModal = () => {
    history.goBack();
  }

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/' exact={true}>
          <Home />
        </Route>

        <Route path='/login' exact={true}>
          <Login />
        </Route>

        <Route path='/register' exact={true}>
          <Register />
        </Route>

        <Route path='/forgot-password' exact={true}>
          <ForgotPassword />
        </Route>

        <Route path='/reset-password' exact={true}>
          <ResetPassword />
        </Route>

        <Route path='/feed' exact={true}>
          <Feed />
        </Route>

        <Route path='/feed/:id' exact={true} children={<InfoOrder />} />
          
        <ProtectedRoute path='/profile/orders/:id' exact={true} check={loginStatus} children={<InfoOrder />} />

        <Route path='/ingredients/:id' exact={true} children={<Ingredient title='Детали ингредиента' />} />

        <ProtectedRoute path='/profile' exact={true} check={loginStatus}>
          <Profile />
        </ProtectedRoute>

        <ProtectedRoute path='/profile/orders' exact={true} check={loginStatus}>
          <Orders />
        </ProtectedRoute>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>

      {background && (<Route path='/ingredients/:id' exact={true} children={ 
        <Modal title='Детали ингредиента' onCloseClick={() => { history.goBack(); dispatch({ type: CLOSE_MODAL_INGREDIENT }) }}>
          <IngredientDetails />
        </Modal>} />)}
      

      {background && <Route path='/feed/:id' exact={true}>
          <Modal title='' onCloseClick={() => {history.goBack(); console.log('click')}}>
            <OrderInfo />
          </Modal>
        </Route>
      }

      {background && <ProtectedRoute path='/profile/orders/:id' exact={true} check={loginStatus} children={ 
        <Modal title='' onCloseClick={() => history.goBack()}>
          <OrderInfo /> {console.log('тут background order: ', background)}
        </Modal>} /> }
    </>
  );
}
