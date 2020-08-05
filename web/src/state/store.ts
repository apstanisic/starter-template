import { Action, combineReducers, configureStore } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { authReducer } from './authSlice';
import { navReducer } from './navSlice';
import { uiReducer } from './uiSlice';

export const reducer = combineReducers({
  nav: navReducer,
  ui: uiReducer,
  auth: authReducer,
});

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<Return = void> = ThunkAction<Return, RootState, null, Action<string>>;
