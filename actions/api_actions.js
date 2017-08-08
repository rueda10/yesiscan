import axios from 'axios';

import {
    ADD_USER_SUCCESS,
    ADD_USER_FAIL
} from './types';

let prefix = 'http://localhost:3000';

if (process.env.SERVER_HOST) {
    prefix = process.env.SERVER_HOST;
}

export const addUser = (facebookId) => async (dispatch) => {
    // Returns new user ID if successful, empty string if error
    const request = await axios.post(prefix + '/api/users', { facebook_id: facebookId });
    if (request === '') {
        dispatch({
            type: ADD_USER_FAIL,
            payload: request.data
        });
    } else {
        dispatch({
            type: ADD_USER_SUCCESS,
            payload: request.data
        });
    }
}
