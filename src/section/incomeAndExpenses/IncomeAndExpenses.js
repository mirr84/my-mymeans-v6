import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from "react-pure-lifecycle";

const methods = {
    componentWillMount({dispatch}) {
        console.log('init IncomeAndExpenses');
        dispatch.setter( 'layoutReducer', {title: 'Расходы и доходы', subTitle: ''} );
    }
}

const IncomeAndExpenses = ({state, dispatch}) => {

    return (
        <div>
            IncomeAndExpenses
        </div>
    )

}

export default connector(lifecycle(methods)(IncomeAndExpenses));
