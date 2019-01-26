import React from 'react';

import {BackTop, Layout} from 'antd';
import {connector} from "../store/utils/connector";
import lifecycle from "react-pure-lifecycle";

const {Content, Footer, Sider} = Layout;

const methods = {
    componentWillMount(props) {
        console.log('init Layout');
    }
}

const MyLayout = ({state, dispatch, menu: MyMenu, myContent: MyContent}) =>
    <Layout style={{minHeight: '100vh'}}>
        <Sider
            collapsible
            collapsed={state.layoutReducer.onCollapse}
            onCollapse={(onCollapse) => dispatch.setter('layoutReducer', {onCollapse})}
        >
            <div className="logo"/>
            <MyMenu />
        </Sider>
        <Layout>
            <Content style={{margin: '0 16px'}}>
                <div style={{padding: 24, background: '#fff', marginTop: 5, marginBottom: 5}}>
                    <span> {state.layoutReducer.title} </span>
                    {
                        state.layoutReducer.subTitle && <span> / {state.layoutReducer.subTitle} </span>
                    }
                </div>
                <div style={{padding: 24, background: '#fff'}}>
                    <MyContent />
                </div>
            </Content>
            <Footer>
                <div style={{padding: 24, background: '#fff', marginTop: 5, marginBottom: 5}}>
                    <span> Footer </span>
                </div>
            </Footer>
        </Layout>
        <BackTop />
    </Layout>

export default connector(lifecycle(methods)(MyLayout));