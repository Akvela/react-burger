import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { store } from '../../index';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TIngredientDetailsActions } from '../actions/ingredient-details';
import { TOrderDetailsActions } from '../actions/order-details';
import { TUserActions } from '../actions/user';
import { TWsActions } from '../actions/ws';

export type TApplicationActions = TBurgerConstructorActions | TBurgerIngredientsActions | TIngredientDetailsActions | TOrderDetailsActions | TUserActions | TWsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;
