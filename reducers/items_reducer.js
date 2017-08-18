import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    MODIFY_ITEM_SUCCESS,
    MODIFY_ITEM_FAILURE,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case GET_ITEMS_SUCCESS:
        case MODIFY_ITEM_SUCCESS:
        case DELETE_ITEM_SUCCESS:
        case ADD_ITEM_SUCCESS: {
            return { currentItems: action.payload };
        }
        case GET_ITEMS_FAILURE: {
            return { currentItems: [] };
        }
        case ADD_ITEM_FAILURE:
        case MODIFY_ITEM_FAILURE:
        case DELETE_ITEM_FAILURE:
        default:
            return state
    }
}