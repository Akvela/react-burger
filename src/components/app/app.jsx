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
  const background = location.state?.background;
  const dispatch = useDispatch();
  const from = location.state?.from;
  const userName = useSelector(store => store.user.userName);
  const { orders, wsOpen } = useSelector(store => store.ws)
  
  React.useEffect(() => {}, []);
  
  React.useEffect(() => {
    dispatch(getDataIngredients());
    refresh && refreshToken(refresh).then(res => { setCookie('token', res.accessToken.split('Bearer ')[1]); setCookie('refreshToken', res.refreshToken) })
    .then(() => {
      dispatch(getUserInfo(token));
    })
    const interval = setInterval(refreshTokenUser, 100000)
    return () => {
      clearInterval(interval)
    }
  }, [])


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

        <Route path='/feed/:id' exact={true}>
          {!!orders.length && <InfoOrder />}
        </Route>

        <Route path='/profile/orders/:id' exact={true}>
          <InfoOrder />
        </Route>

        <Route path='/ingredients/:id' exact={true} children={<Ingredient title='Детали ингредиента' />} />

        <ProtectedRoute path='/profile' exact={true} check={userName}>
          <Profile />
        </ProtectedRoute>

        <ProtectedRoute path='/profile/orders' exact={true} check={userName}>
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
      

      {background && !!orders.length && (<Route path={`${from}/:id`} exact={true} children={
          <Modal onCloseClick={() => { background && history.goBack(); dispatch({ type: CLOSE_MODAL_ORDER }) }}>
            <OrderInfo />
          </Modal>} />
        )}
    </>
  );
}
