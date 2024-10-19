import api from './api';

const director={
    get: async () => {
        const response = await api.get('/directors');
        return response;
    },
    getById: async (id) => {
        const response = await api.get(`/directors/${id}`);
        return response;
    },
}

export default director;
