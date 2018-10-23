import {hideLoading, showLoading} from "./loading";
import { getUsers } from "../api";

export const LOG_IN = 'LOG_IN';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';
export const LOG_OUT = 'LOG_OUT';
export const RECEIVE_USERS = 'RECEIVE_USERS';

export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export const logIn = (username) => ({
    type: LOG_IN,
    username
});

export const logInError = (error) => ({
    type: LOG_IN_ERROR,
    error
});

export const logOut = () => ({
    type: LOG_OUT
});

export const handleLoadUsers = () => (dispatch) => {
    dispatch(showLoading());
    return getUsers().then((users) => {
        dispatch(hideLoading());
        dispatch(receiveUsers(users));
    });
};
