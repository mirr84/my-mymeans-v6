import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from "react-pure-lifecycle";
import {Avatar, Icon, List, Progress} from "antd";
import {newsService} from "../../service/newsService";

const methods = {
    componentWillMount({dispatch}) {
        console.log('init Main');
        dispatch.setter('layoutReducer', {title: 'Главная', subTitle: ''});

        newsService({dispatch}).list()
            .then(
                (items) => dispatch.setter('newsReducer', {items})
            )
    }
}

const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

const Main = ({state, dispatch}) => {

    return (
        <div>

            {
                state.newsReducer.isProgress && <Progress percent={100} showInfo={false} status="active"/>
            }

            {
                !state.newsReducer.isProgress && <List
                    itemLayout="horizontal"
                    dataSource={state.newsReducer.items}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={
                                [
                                    <IconText type="like-o" text={item.count_like}/>
                                ]
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}/>}
                                title={
                                    <a href="#" onClick={
                                        () => {
                                            dispatch.setter('newsReducer', {item});
                                            dispatch.setter('menuReducer', {defaultSelectedKeys: ['main', 'news']});
                                        }
                                    }>
                                        {item.title}
                                    </a>
                                }
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
            }

        </div>
    )

}

export default connector(lifecycle(methods)(Main));
