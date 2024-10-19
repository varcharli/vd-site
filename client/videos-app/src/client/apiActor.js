import api from './api';

const actor={
    get: async () => {
        const response = await api.get('/actors');
        return response;
    },
    getById: async (id) => {
        const response = await api.get(`/actors/${id}`);
        return response;
    },
}

export default actor;
