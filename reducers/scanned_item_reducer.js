import {
    GET_SCANNED_ITEM_SUCCESS
} from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case GET_SCANNED_ITEM_SUCCESS:
            return { scannedItem: action.payload }
        default:
            return state
    }
}