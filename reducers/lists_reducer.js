import {
    GET_LISTS_SUCCESS,
    GET_LISTS_FAILURE,
    ADD_LIST_SUCCESS,
    ADD_LIST_FAILURE
} from '../actions/types';

export default function(state = [], action) {
    console.log('%%%%%%%%%%%%%%%%%%%%%%%', action);
    switch(action.type) {
        case GET_LISTS_SUCCESS: {
            return { lists: action.payload }
        }
        case GET_LISTS_FAILURE: {
            return { lists: [] }
        }
        case ADD_LIST_SUCCESS: {
            const newLists = [ ...state.lists, action.payload ];
            console.log('###################', newLists);
            return { lists: newLists }
        }
        case ADD_LIST_FAILURE: {
            console.log('&&&&&&&&&&&&&&&&&& STATE', state);
            return state
        }
        default:
            return state
    }
}