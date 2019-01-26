import React from 'react';

import {Menu, Icon, Progress} from 'antd';
import {connector} from "../store/utils/connector";
import lifecycle from "react-pure-lifecycle";

const SubMenu = Menu.SubMenu;

const methods = {
    componentWillMount(props) {
        console.log('init MyMenu');
    }
}

const MyMenu = ({state, dispatch}) =>
    <Menu theme="dark"
          defaultSelectedKeys={state.menuReducer.defaultSelectedKeys}
          defaultOpenKeys={state.menuReducer.defaultOpenKeys}
          mode="inline"
          onOpenChange={(defaultOpenKeys) => dispatch.setter('menuReducer', {defaultOpenKeys})}
          onClick={(defaultSelectedKeys) => dispatch.setter('menuReducer', {defaultSelectedKeys: [defaultSelectedKeys.key]})}
    >

        <Menu.Item key="main">
            {!state.newsReducer.isProgress && <Icon type="desktop"/>}
            {state.newsReducer.isProgress && <Icon type="loading"/>}
            <span>Главная</span>
        </Menu.Item>

        <SubMenu
            key="user"
            title={
                <span>
                    {!state.authReducer.isProgressAuth && <Icon type="user"/>}
                    {state.authReducer.isProgressAuth && <Icon type="loading"/>}
                    <span>Пользователь</span>
                </span>
            }
        >
            {
                !state.authReducer.isAuth &&
                <Menu.Item key="auth">
                    {!state.authReducer.isProgressAuth && <Icon type="check"/>}
                    {state.authReducer.isProgressAuth && <Icon type="loading"/>}
                    <span>Авторизация</span>
                </Menu.Item>
            }
            {
                !state.authReducer.isAuth &&
                <Menu.Item key="registration"><Icon type="plus"/><span>Регистрация</span></Menu.Item>
            }
            {
                state.authReducer.isAuth &&
                <Menu.Item key="profile">
                    {!state.authReducer.isProgressProfile  && <Icon type="smile"/>}
                    {state.authReducer.isProgressProfile  && <Icon type="loading"/>}
                    <span>Профиль</span></Menu.Item>
            }
            {
                state.authReducer.isAuth &&
                <Menu.Item key="exit"><Icon type="logout" /><span>Выйти</span></Menu.Item>
            }
        </SubMenu>

        {
            state.authReducer.isAuth &&
            <SubMenu
                key="accounts"
                title={<span><Icon type="solution"/><span>Счет</span></span>}
            >
                <Menu.Item key="account"><Icon type="bars"/><span>Счета</span></Menu.Item>
                <Menu.Item key="income_and_expenses"><Icon type="database"/><span>Расходы и доходы</span></Menu.Item>
                <Menu.Item key="documentation"><Icon type="audit"/><span>Документы</span></Menu.Item>
            </SubMenu>
        }

        {
            state.authReducer.isAuth &&
            <SubMenu
                key="statistics"
                title={<span><Icon type="pie-chart"/><span>Статистика</span></span>}
            >
                <Menu.Item key="calendar"><Icon type="calendar"/><span>Календарь</span></Menu.Item>
                <Menu.Item key="balans"><Icon type="line-chart"/><span>График баланса</span></Menu.Item>
            </SubMenu>
        }

    </Menu>

export default connector(lifecycle(methods)(MyMenu));