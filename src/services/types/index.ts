import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { rootReducer } from '../reducers';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';
import { TOrderDetailsActions } from '../actions/order-details';
import { TUserActions } from '../actions/user';
import { TBurgerConstructorActions } from '../actions/burger-constructor';
import { TWsActions } from '../actions/ws';


export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions =  TBurgerIngredientsActions | TOrderDetailsActions | TUserActions | TBurgerConstructorActions | TWsActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;