import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from "react-pure-lifecycle";

const methods = {
    componentWillMount({dispatch}) {
        console.log('init NotFindPage');
        dispatch.setter( 'layoutReducer', {title: 'NotFindPage', subTitle: ''} )
    }
}

const NotFindPage = ({state, dispatch}) => {

    return (
        <div>
            NotFindPage
        </div>
    )

}

export default connector(lifecycle(methods)(NotFindPage));
