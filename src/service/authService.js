import axios from "axios";
import {notification} from "antd";

export const authService = ({dispatch}) => {

    return {
        auth: (email, password) => {
            dispatch.setter('authReducer', {isProgressAuth: true})
            return axios.post(`/auth`, {email, password})
                .then(
                    (r) => {
                        return r.headers.token;
                    },
                    (e) => {
                        return '';
                    }
                )
                .then(
                    (r) => {
                        dispatch.setter('authReducer', {isProgressAuth: false});
                        return r;
                    }
                )
        },
        logout: () => {
            dispatch.setter('authReducer', {isProgressLogout: true});
            return axios.get(`/logout`)
                .then(
                    (r) => {
                        dispatch.setter('authReducer', {isProgressLogout: false});
                        return r;
                    }
                )
        },
        profile: () => {
            dispatch.setter('authReducer', {isProgressProfile: true});
            return axios.get(`/profile`)
                .then(
                    (r) => {
                        dispatch.setter('authReducer', {isProgressProfile: false});
                        return r;
                    }
                )
        },
        check: () => {
            return axios.get(`/check`)
                .then(
                    (r) => {
                        return true;
                    },
                    (r) => {
                        return false;
                    }
                )
        }
    }

}

export const doLogin = (dispatch, email, password) =>
    authService({dispatch})
        .auth(email, password)
        .then(
            (token) => {
                if (token) {
                    dispatch.setter('authReducer', {isAuth: true, token, password: ''});
                    dispatch.setter('menuReducer', {defaultOpenKeys: ['user'], defaultSelectedKeys: ['profile']});
                    notification.success({
                        message: 'Авторизация успешна'
                    });
                } else {
                    dispatch.setter('authReducer', {isAuth: false, token, password: ''});
                    notification.error({
                        message: 'Ошибка авторизации'
                    });
                }
            }
        )

export const doLogout = (dispatch) =>
    authService({dispatch})
        .logout()

export const doProfile = (dispatch) =>
    authService({dispatch})
        .profile()

export const doCheck = (token, dispatch) => {

    if (token) {
        return authService({dispatch})
            .check()
            .then(
                (r) => {
                    if (r) {
                        notification.success({
                            message: 'Проверка авторизации успешна'
                        });
                    } else {
                        notification.error({
                            message: 'Проверка авторизации провалена'
                        });
                        dispatch.setter('authReducer', {isAuth: false, token: '', password: ''});
                        dispatch.setter('menuReducer', {defaultOpenKeys: ['user'], defaultSelectedKeys: ['auth']});
                    }
                }
            )
    } else {
        dispatch.setter('authReducer', {isAuth: false, token, password: ''});
    }

}
