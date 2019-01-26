import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from "react-pure-lifecycle";
import {Button, Col, Form, Input, Row, notification} from "antd";
import {doLogin} from "../../service/authService";

const methods = {
    componentWillMount({dispatch}) {
        console.log('init Auth');
        dispatch.setter('layoutReducer', {title: 'Авторизация', subTitle: ''});
    }
}

const Auth = ({state, dispatch}) => {

    return (
        <div>
            <Row>
                <Col sm={6}/>
                <Col sm={12}>
                    <Form onSubmit={
                        (e) => {
                            e.preventDefault();
                            doLogin(dispatch, state.authReducer.email, state.authReducer.password);
                        }
                    }>
                        <Form.Item label="E-mail">
                            <Input disabled={state.authReducer.isProgressAuth}
                                   value={state.authReducer.email}
                                   onChange={({target}) => dispatch.setter('authReducer', {email: target.value})}
                            />
                        </Form.Item>
                        <Form.Item label="Пароль">
                            <Input type="password"
                                   disabled={state.authReducer.isProgressAuth}
                                   value={state.authReducer.password}
                                   onChange={({target}) => dispatch.setter('authReducer', {password: target.value})}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary"
                                    disabled={
                                        !state.authReducer.login ||
                                        !state.authReducer.password ||
                                        state.authReducer.isProgressAuth
                                    } htmlType="submit">Войти</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )

}

export default connector(lifecycle(methods)(Auth));
