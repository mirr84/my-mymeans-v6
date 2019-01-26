import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from "react-pure-lifecycle";

const methods = {
    componentWillMount({dispatch}) {
        console.log('init Documentation');
        dispatch.setter( 'layoutReducer', {title: 'Документы', subTitle: ''} );
    }
}

const Documentation = ({state, dispatch}) => {

    return (
        <div>
            Documentation
        </div>
    )

}

export default connector(lifecycle(methods)(Documentation));
