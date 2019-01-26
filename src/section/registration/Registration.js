import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from "react-pure-lifecycle";

import {Button, Col, Form, Input, Row} from "antd";

const methods = {
    componentWillMount({dispatch}) {
        console.log('init Registration');
        dispatch.setter( 'layoutReducer', {title: 'Регистрация', subTitle: ''} );
    }
}

const Registration = ({state, dispatch}) => {

    return (
        <div>
            <Row>
                <Col sm={6}/>
                <Col sm={12}>
                    <Form onSubmit={
                        (e) => {
                            e.preventDefault();
                            alert('');
                        }
                    }>
                        <Form.Item label="E-mail">
                            <Input/>
                        </Form.Item>
                        <Row gutter={8}>
                            <Col sm={12}>
                                <Form.Item label="Password">
                                    <Input type="password"/>
                                </Form.Item>
                            </Col>
                            <Col sm={12}>
                                <Form.Item label="Confirm Password">
                                    <Input type="password"/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="Nickname">
                            <Input/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" disabled={false} htmlType="submit">Register</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )

}

export default connector(lifecycle(methods)(Registration));
