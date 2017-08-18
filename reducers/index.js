import { combineReducers } from 'redux';
import auth from './auth_reducer';
import user from './user_reducer';
import lists from './lists_reducer';
import current from './selection_reducer';
import currentItems from './items_reducer';
import scannedItem from './scanned_item_reducer';

export default combineReducers({
    auth,
    user,
    lists,
    current,
    currentItems,
    scannedItem
});