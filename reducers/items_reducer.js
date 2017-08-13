import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case GET_ITEMS_SUCCESS: {
            return { currentItems: action.payload }
        }
        case GET_ITEMS_FAILURE: {
            return { currentItems: [] }
        }
        default:
            return state
    }
}