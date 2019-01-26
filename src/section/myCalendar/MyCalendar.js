import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from "react-pure-lifecycle";
import moment from "moment";
import { Calendar } from 'antd';

const methods = {
    componentWillMount({dispatch}) {
        console.log('init MyCalendar');
        dispatch.setter( 'layoutReducer', {title: 'Календарь', subTitle: ''} );
    }
}

const value = moment('2017-01-25');

const MyCalendar = ({state, dispatch}) => {

    return (
        <div>
            <Calendar value={value} onSelect={()=>{}} onPanelChange={()=>{}} />
        </div>
    )

}

export default connector(lifecycle(methods)(MyCalendar));
