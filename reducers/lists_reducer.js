import {
    GET_LISTS_SUCCESS,
    GET_LISTS_FAILURE,
    ADD_LIST_SUCCESS,
    ADD_LIST_FAILURE,
    DELETE_LIST_SUCCESS,
    DELETE_LIST_FAILURE,
    RESET_NEWLY_CREATED_LIST
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case GET_LISTS_SUCCESS:
        case DELETE_LIST_SUCCESS: {
            return { lists: action.payload }
        }
        case GET_LISTS_FAILURE: {
            return { lists: [] }
        }
        case ADD_LIST_SUCCESS: {
            const newLists = [ ...state.lists, action.payload ];
            return { lists: newLists, newlyCreatedList: action.payload }
        }
        case RESET_NEWLY_CREATED_LIST: {
            return { ...state, newlyCreatedList: null }
        }
        case ADD_LIST_FAILURE:
        case DELETE_LIST_FAILURE:
        default:
            return state
    }
}