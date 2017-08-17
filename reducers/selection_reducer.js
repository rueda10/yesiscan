import {
    LIST_SELECTED,
    ITEM_SELECTED
} from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case LIST_SELECTED:
            return { list: action.payload }
        case ITEM_SELECTED:
            return { ...state, item: action.payload }
        default:
            return state;
    }
};