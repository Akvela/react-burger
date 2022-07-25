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
import { checkAuth } from '../../services/actions/user';
import { CLOSE_MODAL_ORDER } from '../../services/actions/order-details';

export default function App() {
  const location = useLocation();
  const history = useHistory();
  const background = history.action === 'PUSH' && location.state?.background;
  const dispatch = useDispatch();
  
  React.useEffect(() => {
    dispatch(checkAuth());
    dispatch(getDataIngredients());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path='/' exact={true} children={<Home />} />

        <Route path='/login' exact={true} children={<Login />} />

        <Route path='/register' exact={true} children={<Register />} />

        <Route path='/forgot-password' exact={true} children={<ForgotPassword />} />

        <Route path='/reset-password' exact={true} children={<ResetPassword />} />

        <Route path='/feed' exact={true} children={<Feed />} />

        <Route path='/feed/:id' exact={true} children={<InfoOrder />} />
          
        <ProtectedRoute path='/profile/orders/:id' exact={true} children={<InfoOrder />} />

        <Route path='/ingredients/:id' exact={true} children={<Ingredient title='Детали ингредиента' />} />

        <ProtectedRoute path='/profile' exact={true} children={<Profile />} />

        <ProtectedRoute path='/profile/orders' exact={true} children={<Orders />} />

        <Route children={<NotFound />} />
      </Switch>

      {background && (<Route path='/ingredients/:id' exact={true} children={ 
        <Modal title='Детали ингредиента' onCloseClick={() => { history.goBack(); dispatch({ type: CLOSE_MODAL_INGREDIENT }) }}>
          <IngredientDetails />
        </Modal>} />)}
      

      {background && <Route path='/feed/:id' exact={true}>
          <Modal title='' onCloseClick={() => history.goBack()}>
            <OrderInfo />
          </Modal>
        </Route> }

      {background && <ProtectedRoute path='/profile/orders/:id' exact={true} children={ 
        <Modal title='' onCloseClick={() => history.goBack()}>
          <OrderInfo />
        </Modal>} /> }
    </>
  );
}
