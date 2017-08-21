import {
    LIST_SELECTED,
    ITEM_SELECTED,
    RESET_NEWLY_CREATED_LIST
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

export const resetNewlyCreatedList = () => {
    return {
        type: RESET_NEWLY_CREATED_LIST,
        payload: ''
    }
}