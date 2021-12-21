import { all } from 'redux-saga/effects';
import authSaga from '../features/Auth/authSaga';

export default function* rootSaga() {
    yield all([authSaga()]);
}