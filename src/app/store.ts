import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Auth/authSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { connectRouter } from 'connected-react-router'
import { routerMiddleware } from 'connected-react-router'
import { history } from '../utils/history';



const sagaMiddleware = createSagaMiddleware();


const rootReducer =  combineReducers({
  router: connectRouter(history),
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware).concat(routerMiddleware(history)),
});

sagaMiddleware.run(rootSaga) 

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;