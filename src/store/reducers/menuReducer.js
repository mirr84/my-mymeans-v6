import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../utils/getStorage";

const initState = {

    defaultOpenKeys: [],
    defaultSelectedKeys: []

}

export const menuReducer = (state = getStorage().getInitStorage('menuReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'menuReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}