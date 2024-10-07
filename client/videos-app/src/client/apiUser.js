import api from './api';

const user = {
    // use when App.js is loading.Get current user info and fill in GlobalContext.
    getCurrent: async () => {
        const response = await api.get('/users/current');
        return response;
    }
};

export default user;