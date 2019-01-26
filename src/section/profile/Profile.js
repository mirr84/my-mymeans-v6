import React from 'react';

import {connector} from "../../store/utils/connector";
import lifecycle from "react-pure-lifecycle";
import {Progress} from "antd";
import {doProfile} from "../../service/authService";

const methods = {
    componentWillMount({dispatch}) {
        console.log('init Profile');
        dispatch.setter( 'layoutReducer', {title: 'Профиль', subTitle: ''} );

        doProfile(dispatch);
    }
}

const Profile = ({state, dispatch}) => {

    return (
        <div>

            {
                state.authReducer.isProgressProfile && <Progress percent={100} showInfo={false} status="active"/>
            }
            {
                !state.authReducer.isProgressProfile && 'Profile'
            }
        </div>
    )

}

export default connector(lifecycle(methods)(Profile));
