import {
    LIST_SELECTED
} from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case LIST_SELECTED:
            return action.payload;
        default:
            return state;
    }
};