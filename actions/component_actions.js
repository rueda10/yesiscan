import {
    LIST_SELECTED
} from './types';

export const selectList = (list) => {
    return {
        type: 'LIST_SELECTED',
        payload: list
    };
};