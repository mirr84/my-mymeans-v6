import React from 'react';

import {connector} from "../store/utils/connector";
import lifecycle from "react-pure-lifecycle";

import MyLayout from "../MyLayout/MyLayout";
import MyMenu from "../MyLayout/MyMenu";

import Main from "../section/main/Main";
import Auth from "../section/auth/Auth";
import NotFindPage from "../section/notFindPage/NotFindPage";
import Registration from "../section/registration/Registration";
import Profile from "../section/profile/Profile";
import Account from "../section/account/Account";
import IncomeAndExpenses from "../section/incomeAndExpenses/IncomeAndExpenses";
import Documentation from "../section/documentation/Documentation";
import Balans from "../section/balans/Balans";
import MyCalendar from "../section/myCalendar/MyCalendar";
import MainNews from "../section/main/MainNews";
import {doCheck, doLogout} from "../service/authService";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init App');

        doCheck(state.authReducer.token, dispatch);
    }
}

const App = ({state, dispatch}) => {

    let myContent = () => <span/>;

    if (
        state.menuReducer.defaultSelectedKeys &&
        Array.isArray(state.menuReducer.defaultSelectedKeys) &&
        state.menuReducer.defaultSelectedKeys.length > 0
    ) {

        switch(state.menuReducer.defaultSelectedKeys[0]) {
            case 'main': {
                if (state.menuReducer.defaultSelectedKeys.length === 1) {
                    myContent = Main;
                } else {
                    myContent = MainNews;
                }
                break;
            }
            case 'auth': myContent = Auth; break;
            case 'registration': myContent = Registration; break;
            case 'profile': myContent = Profile; break;
            case 'exit':
                dispatch.setter('authReducer', {isAuth: false, token: '', password: ''});
                dispatch.setter('menuReducer', {defaultOpenKeys: [], defaultSelectedKeys: ['main']});
                doLogout(dispatch);
                break;
            case 'account': myContent = Account; break;
            case 'income_and_expenses': myContent = IncomeAndExpenses; break;
            case 'documentation': myContent = Documentation; break;
            case 'calendar': myContent = MyCalendar; break;
            case 'balans': myContent = Balans; break;
            default: myContent = NotFindPage; break;
        }

    } else {
        dispatch.setter('menuReducer', {defaultSelectedKeys: ['main']} )
        myContent = Main;
    }

    return (
        <MyLayout
            menu={MyMenu}
            myContent={myContent}
        />
    )

}

export default connector(lifecycle(methods)(App));
