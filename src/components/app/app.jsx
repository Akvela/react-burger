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
import { Loading } from '../loading/loading';

export default function App() {
  const refresh = getCookie('refreshToken');
  const token = getCookie('token');
  const location = useLocation();
  const history = useHistory();
  const background = location.state?.background;
  const dispatch = useDispatch();
  const userName = useSelector(store => store.user.userName);
  
  React.useEffect(() => {
    dispatch(getDataIngredients());
    refresh && refreshToken(refresh).then(res => { setCookie('token', res.accessToken.split('Bearer ')[1]); setCookie('refreshToken', res.refreshToken) })
    .then(() => {
      dispatch(getUserInfo(token));
    })
    const interval = setInterval(refreshTokenUser, 10000000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL_ORDER })
    background && history.goBack();
  };

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <Home />
        </Route>

        <Route path="/login" exact={true}>
          <Login />
        </Route>

        <Route path="/register" exact={true}>
          <Register />
        </Route>

        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>

        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>

        <Route path="/feed" exact={true}>
          <Feed />
        </Route>

        <Route path='/feed/:id' exact={true} children={<InfoOrder />} />

        <Route path='/ingredients/:id'  exact={true} children={<Ingredient title='Детали ингредиента' />} />

        <ProtectedRoute path="/profile" redirectPath='/login' exact={true} check={userName}>
          <Profile />
        </ProtectedRoute>

        <ProtectedRoute path="/profile/orders" redirectPath='/login' exact={true} check={userName}>
          <Orders />
        </ProtectedRoute>

        <ProtectedRoute path='/profile/orders/:id' redirectPath='/login' exact={true} check={userName} >
          <InfoOrder />
        </ProtectedRoute>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>

      {background && <Route path='/ingredients/:id'>
        <Modal title='Детали ингредиента' onCloseClick={() => closeModal()}>
          <IngredientDetails />
        </Modal>
      </Route>}

      {background && <ProtectedRoute path='/profile/orders/:id' redirectPath='/login' exact={true} check={userName}>
          <Modal onCloseClick={() => closeModal()}>
            <OrderInfo />
          </Modal>
        } 
      </ProtectedRoute>}

      {background && <Route path='/feed/:id' exact={true}>
        <Modal onCloseClick={() => { closeModal()}}>
          <OrderInfo />
        </Modal>
      </Route>}

    </>
  );
}
