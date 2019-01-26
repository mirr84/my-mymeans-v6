import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from "react-pure-lifecycle";
import {Avatar, List, Progress} from "antd";
import {newsService} from "../../service/newsService";

const methods = {
    componentWillMount({state, dispatch}) {
        console.log('init MainNews');
        dispatch.setter('layoutReducer', {title: 'Главная', subTitle: state.newsReducer.item.title });

        newsService({dispatch}).id(state.newsReducer.item.id)
            .then(
                (item) => dispatch.setter('newsReducer', {item})
            )

    }
}

const MainNews = ({state, dispatch}) => {

    return (
        <div>

            {
                state.newsReducer.isProgress && <Progress percent={100} showInfo={false} status="active"/>
            }

            {
                !state.newsReducer.isProgress && JSON.stringify(state.newsReducer.item)
            }

        </div>
    )

}

export default connector(lifecycle(methods)(MainNews));
