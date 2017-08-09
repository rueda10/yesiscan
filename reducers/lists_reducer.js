import {
    GET_LISTS_SUCCESS,
    GET_LISTS_FAILURE,
    ADD_LIST_SUCCESS,
    ADD_LIST_FAILURE
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case GET_LISTS_SUCCESS: {
            return { ...state, lists: action.payload }
        }
        case GET_LISTS_FAILURE: {
            return { lists: [] }
        }
        case ADD_LIST_SUCCESS: {
            const newLists = [ ...state.lists, action.payload ];
            return { ...state, lists: newLists }
        }
        default:
            return state
    }
}