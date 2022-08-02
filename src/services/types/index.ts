import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { store } from '../../index';
import { Action, ActionCreator  } from 'redux';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TIngredientDetailsActions } from '../actions/ingredient-details';
import { TOrderDetailsActions } from '../actions/order-details';
import { TUserActions } from '../actions/user';
import { TWsActions } from '../actions/ws';
import { rootReducer } from '../reducers';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TBurgerConstructorActions | TBurgerIngredientsActions | TIngredientDetailsActions | TOrderDetailsActions | TUserActions | TWsActions;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TApplicationActions>>;

export type AppDispatch = typeof store.dispatch;