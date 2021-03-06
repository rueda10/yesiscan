import axios from 'axios';

import {
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    GET_LISTS_SUCCESS,
    GET_LISTS_FAILURE,
    ADD_LIST_SUCCESS,
    ADD_LIST_FAILURE,
    DELETE_LIST_SUCCESS,
    DELETE_LIST_FAILURE,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    MODIFY_ITEM_SUCCESS,
    MODIFY_ITEM_FAILURE,
    GET_SCANNED_ITEM_SUCCESS
} from './types';

let prefix = 'https://calm-journey-35242.herokuapp.com';
// let prefix = 'http://localhost:3000';

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
            payload: request.data.id
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

export const deleteList = (userId, listId) => async (dispatch) => {
    // Returns array of lists without deleted list, empty string if error
    const request = await axios.delete(prefix + '/api/users/' + userId + '/lists/' + listId);

    if (request.data === '') {
        dispatch({
            type: DELETE_LIST_FAILURE,
            payload: request.data
        })
    } else {
        dispatch({
            type: DELETE_LIST_SUCCESS,
            payload: request.data
        })
    }
}

export const getItems = (listId) => async (dispatch) => {
    // Returns array of items for given list, empty string if error
    const request = await axios.get(prefix + '/api/users/lists/' + listId + '/items');

    if (request.data === '') {
        dispatch({
            type: GET_ITEMS_FAILURE,
            payload: request.data
        })
    } else {
        dispatch({
            type: GET_ITEMS_SUCCESS,
            payload: request.data
        })
    }
}

export const addItem = (listId, itemObject) => async (dispatch) => {
    // Returns item object of newly added item, empty string if error
    const request = await axios.post(prefix + '/api/users/lists/' + listId + '/items', itemObject);

    if (request.data === '') {
        dispatch({
            type: ADD_ITEM_FAILURE,
            payload: request.data
        })
    } else {
        dispatch({
            type: ADD_ITEM_SUCCESS,
            payload: request.data
        })
    }
}

export const modifyItem = (listId, itemId, itemObject) => async (dispatch) => {
    // Returns item object that was modified (previous), empty string if error
    const request = await axios.put(prefix + '/api/users/lists/' + listId + '/items/' + itemId, itemObject);

    if (request.data === '') {
        dispatch({
            type: MODIFY_ITEM_FAILURE,
            payload: request.data
        })
    } else {
        dispatch({
            type: MODIFY_ITEM_SUCCESS,
            payload: request.data
        })
    }
}

export const removeItem = (listId, itemId) => async (dispatch) => {
    // Returns array of items without deleted item, empty string if error
    const request = await axios.delete(prefix + '/api/users/lists/' + listId + '/items/' + itemId);

    if (request.data === '') {
        dispatch({
            type: MODIFY_ITEM_FAILURE,
            payload: request.data
        })
    } else {
        dispatch({
            type: MODIFY_ITEM_SUCCESS,
            payload: request.data
        })
    }
}

export const getScannedItem = (code) => async (dispatch) => {
    const request = await axios.get('https://api.upcitemdb.com/prod/trial/lookup?upc=' + code);

    if (request.data) {
        dispatch({
            type: GET_SCANNED_ITEM_SUCCESS,
            payload: request.data.items[0]
        })
    }
}
