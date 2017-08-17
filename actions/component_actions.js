import {
    LIST_SELECTED,
    ITEM_SELECTED
} from './types';

export const selectList = (list) => {
    return {
        type: LIST_SELECTED,
        payload: list
    };
};

export const selectItem = (item) => {
    return {
        type: ITEM_SELECTED,
        payload: item
    }
}