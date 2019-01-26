import {combineReducers} from 'redux';

import {commonReducer} from "./commonReducer"
import {layoutReducer} from "./layoutReducer";
import {menuReducer} from "./menuReducer";
import {newsReducer} from "./newsReducer";
import {authReducer} from "./authReducer";

export default combineReducers(
    {
        commonReducer,
        layoutReducer,
        menuReducer,
        newsReducer,
        authReducer
    }
);