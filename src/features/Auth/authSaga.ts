import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, fork, put, take, takeLatest  } from 'redux-saga/effects';
import authApi from '../../api/authApi';
import { Token, User } from '../../models/user';
import { authActions, LogginPayload } from './authSlice';
import { toast } from 'react-toastify';

function* handleLogin(payload: LogginPayload) {
    try {
        const response: Token = yield call(authApi.login, payload);
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        const user: User = yield call(authApi.getUser, {access: response.access});
        yield put(
            authActions.loginSuccess(user)
        );
        toast.success('🦄 Đăng nhập thành công', {autoClose: 5000});
        yield put(push('/'));
    } catch (error: any) {
        yield put(authActions.loginFailed(error.message));
        toast.error('🦄 Đăng nhập thất bại', {autoClose: 5000});
    }
}

function* handleLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    yield put(push('/login'));
}

function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if (!isLoggedIn) {
            //lắng nghe login. đứng đây đợi chờ login.. logout không ảnh hưởng
            const action: PayloadAction<LogginPayload> = yield take(authActions.login.type);
            //xử lý login
            yield fork(handleLogin, action.payload);
        }
        //Khi đã login thì đừng đây đợi lắng nghe logout
        yield take(authActions.logout.type);
        //xử lý logout
        yield call(handleLogout);
    }
}

function* getUser(action: PayloadAction<any>) {
    try {
        const access = localStorage.getItem('access_token');
        const user: User = yield call(authApi.getUser, {access: access});
        yield put(authActions.getUserSuccess(user))
    } catch (error) {
        toast.error('🦄 Xin vui lòng đăng nhập lại', {autoClose: 5000});
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        yield put(authActions.logout());
        yield put(authActions.getUserFailed());
        yield put(push('/login'));
        throw Error("🦄 Xin vui lòng đăng nhập lại");
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
    yield takeLatest(authActions.getUser.type, getUser);
}