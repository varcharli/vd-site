import api from './api';

const blog = {
    get: async () => {
        const response = await api.get('/blogs');
        return response;
    },
    getById: async (id) => {
        const response = await api.get(`/blogs/${id}`);
        return response;
    },
    create: async (data) => {
        const response = await api.post('/blogs', data);
        return response;
    },
    update: async (id, data) => {
        const response = await api.put(`/blogs/${id}`, data);
        return response;
    },
    remove: async (id) => {
        const response = await api.delete(`/blogs/${id}`);
        return response;
    },
}

export default blog;