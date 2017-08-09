import axios from 'axios';

import {
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    GET_LISTS_SUCCESS,
    GET_LISTS_FAILURE
} from './types';

let prefix = 'http://localhost:3000';

if (process.env.SERVER_HOST) {
    prefix = process.env.SERVER_HOST;
}

export const addUser = (facebookId) => async (dispatch) => {
    // Returns new user ID if successful, empty string if error
    const request = await axios.post(prefix + '/api/users', { facebook_id: facebookId });
    if (request.data === '') {
        dispatch({
            type: ADD_USER_FAILURE,
            payload: request.data
        });
    } else {
        dispatch({
            type: ADD_USER_SUCCESS,
            payload: request.data
        });
    }
}

export const getLists = (userId) => async (dispatch) => {
    // Returns array of lists for user ID, empty string if error
    const request = await axios.get(prefix + '/api/users/' + userId + '/lists');

    if (request.data === '') {
        dispatch({
            type: GET_LISTS_FAILURE,
            payload: request.data
        })
    } else {
        dispatch({
            type: GET_LISTS_SUCCESS,
            payload: request.data
        })
    }
}

export const addList = (userId, name) => async (dispatch) => {
    // Returns list object of newly added list, empty string if error
    const request = await axios.post(prefix + '/api/users/' + userId + '/lists', { name });

    if (request.data === '') {
        dispatch({
            type: ADD_LIST_FAILURE,
            payload: request.data
        })
    } else {
        dispatch({
            type: ADD_LIST_SUCCESS,
            payload: request.data
        })
    }
}
