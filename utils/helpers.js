import axios from 'axios';

module.exports = {
    getLists: (facebookId) => {
        return axios.get('/api/lists', { facebookId }).then(function(results) {
            return results;
        });
    },
    addList: (facebookId, name) => {
        return axios.post('api/lists', { facebookId, name }).then(function(results) {
            return results;
        });
    }
};