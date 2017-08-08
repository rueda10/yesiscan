import axios from 'axios';

module.exports = {
    addUser: (facebookId) => {
        return axios.post('/api/users', { facebookId }).then(function(results) {
            // Returns new user ID if successful, empty string if error
            return results;
        });
    },
    getLists: (userId) => {
        return axios.get('/api/users/' + userId + '/lists').then(function(results) {
            // Returns array of lists for user ID, empty string if error
            return results;
        });
    },
    getList: (listId) => {
        return axios.get('/api/users/lists/' + listId).then(function(results) {
            // Returns list object for list ID, empty string if error
            return results;
        });
    },
    addList: (userId, name) => {
        return axios.post('/api/users/' + userId + '/lists', { name }).then(function(results) {
            // Returns list object of newly added list, empty string if error
            return results;
        });
    },
    modifyList: (listId, name) => {
        return axios.put('/api/users/lists/' + listId, { name }).then(function(results) {
            // Returns list object that was changed (previous), empty string if error
            return results;
        });
    },
    deleteList: (userId, listId) => {
        return axios.delete('/api/users/' + userId + '/lists/' + listId).then(function(results) {
            // Returns array of lists without deleted list, empty string if error
            return results;
        });
    },
    addItem: (listId, name) => {
        return axios.post('/api/users/lists/' + listId + '/items', { name }).then(function(resilts) {
            // Returns item object that was just added, empty string if error
            return results;
        });
    },
    getItems: (listId) => {
        return axios.get('/api/users/lists/' + listId + '/items').then(function(results) {
            // Returns array of items for given list, empty string if error
            return results;
        });
    },
    getItem: (itemId) => {
        return axios.get('/api/users/lists/items/' + itemId).then(function(results) {
            // Returns item object for given item ID, empty string if error
            return results;
        });
    },
    modifyItem: (itemId, item) => {
        return axios.put('/api/users/lists/items/' + itemId, item).then(function(results) {
            // Returns item object that was modified (previous), empty string if error
            return results;
        });
    },
    removeItem: (listId, itemId) => {
        return axios.delete('/api/users/lists/' + listId + '/items/' + itemId).then(function(results) {
            // Returns array of items without deleted item, empty string if error
            return results;
        });
    }
};