import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface LogginPayload {
    username: string;
    password: string;
}

export interface UserState {
    logging: boolean;
    user:any,
    isLoggedIn: boolean;
}

const initialState: UserState = {
    logging: false,
    user: {},
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<LogginPayload>) => {
            state.logging = true;
        },
        loginSuccess: (state, action: PayloadAction<any>) => {
            state.logging = false;
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
        },
        logout: (state) => {
            state.user = {};
            state.isLoggedIn = false;
        },
        getUser: (state) => {
            state.logging = true;
        },
        getUserSuccess: (state, action: PayloadAction<any>) => {
            state.logging = false;
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        getUserFailed: (state) => {
            state.logging = false;
        }
    },
})


//Actions
export const authActions = authSlice.actions;
//selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;
//reducer
const authReducer = authSlice.reducer
export default authReducer