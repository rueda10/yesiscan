import {
    LIST_SELECTED
} from './types';

export const selectList = (listId) => {
    return {
        type: 'LIST_SELECTED',
        payload: listId
    };
};