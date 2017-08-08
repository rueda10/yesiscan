import {
    ADD_USER_SUCCESS,
    ADD_USER_FAIL
} from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case ADD_USER_SUCCESS: {
            return { userId: action.payload }
        }
        case ADD_USER_FAIL: {
            return { userId: null }
        }
        default:
            return state
    }
}