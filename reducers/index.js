import { combineReducers } from 'redux';
import auth from './auth_reducer';
import user from './user_reducer';
import lists from './lists_reducer';
import listsSelection from './selection_reducer';
import currentItems from './items_reducer';

export default combineReducers({
    auth,
    user,
    lists,
    listsSelection,
    currentItems
});