import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    MODIFY_ITEM_SUCCESS,
    MODIFY_ITEM_FAILURE
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case GET_ITEMS_SUCCESS: {
            return { currentItems: action.payload };
        }
        case GET_ITEMS_FAILURE: {
            return { currentItems: [] };
        }
        case ADD_ITEM_SUCCESS: {
            const newItems = [ ...state.currentItems, action.payload ]
            return { currentItems: newItems };
        }
        case ADD_ITEM_FAILURE: {
            return state;
        }
        case MODIFY_ITEM_SUCCESS: {
            return { currentItems: action.payload };
        }
        case MODIFY_ITEM_FAILURE: {
            return state;
        }
        default:
            return state
    }
}