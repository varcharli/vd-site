
import api from './api';

const movie = {
    get: async (params) => {
        const response = await api.get('/movies', { params });
        return response;
    },
    getById: async (id) => {
        const response = await api.get(`/movies/${id}`);
        return response;
    },
    update: async (id, data) => {
        const response = await api.put(`/movies/${id}`, data);
        return response;
    },
    delete: async (id) => {
        const response = await api.delete(`/movies/${id}`);
        return response;
    },
    create: async (data) => {
        const response = await api.post('/movies', data);
        return response;
    }
};

export default movie;