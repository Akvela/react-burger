import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { useLocation, Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from '../../services/types/hooks';
import { Modal } from '../modal/modal';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { OrderInfo } from '../order-info/order-info';
import { AppHeader } from '../app-header/app-header';
import { getDataIngredients } from '../../services/actions/burger-ingredients';
import { ProtectedRoute } from '../protected-route/protected-route';
import { Home, Login, Register, ForgotPassword, ResetPassword, Profile, Ingredient, Orders, NotFound, Feed, InfoOrder } from '../../pages';
import { checkAuth } from '../../services/actions/user';

export const App: FunctionComponent = () => {
  const location = useLocation<any>();
  const history = useHistory();
  const background = history.action === 'PUSH' && location?.state?.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getDataIngredients());
  }, [dispatch]);

  const closeModal = useCallback(
    (path) => {
      history.push(path);
    },
    [history]
  );

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

        <Route path='/ingredients/:id' exact={true} children={<Ingredient title='Детали ингредиента' />} />

        <Route path='/profile/orders/:id' exact={true} children={<InfoOrder />} />

        <ProtectedRoute path='/profile' exact={true} children={<Profile />} />

        <ProtectedRoute path='/profile/orders' exact={true} children={<Orders />} />

        <Route children={<NotFound />} />
      </Switch>

      {background && (<Route path='/ingredients/:id' exact={true} children={ 
        <Modal title='Детали ингредиента' onCloseClick={() => closeModal('/')}>
          <IngredientDetails />
        </Modal>} />)}

      {background && (<Route path='/feed/:id' exact={true}>
          <Modal title='' onCloseClick={() => closeModal('/feed')}>
            <OrderInfo />
          </Modal>
        </Route> )}

      {background && (<Route path='/profile/orders/:id' exact={true}>
        <Modal title='' onCloseClick={() => closeModal('/profile/orders')}>
          <OrderInfo />
        </Modal>
      </Route> )}
    </>
  );
}
