import {ACTION_SETTER} from "../actions/actionConst";
import {getStorage} from "../utils/getStorage";

const initState = {

    onCollapse: false,
    title: '',
    subTitle: ''

}

export const layoutReducer = (state = getStorage().getInitStorage('layoutReducer', initState), action) => {

    let newState = Object.assign({}, state);

    if (action.reducer === 'layoutReducer') {
        if (action.type === ACTION_SETTER) {
            newState = Object.assign(newState, action.payload);
        }
    }

    return newState;

}