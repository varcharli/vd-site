import api from './api';
const tagPath = '/tags';
const tag = {
    get: async () => {
        const response = await api.get(tagPath);
        return response;
    },
    getById: async (id) => {
        const response = await api.get(`${tagPath}/${id}`);
        return response;
    },
    create: async (data) => {
        const response = await api.post(tagPath, data);
        return response;
    },
    update: async (id, data) => {
        const response = await api.put(`${tagPath}/${id}`, data);
        console.log('update tag:'+response);
        return response;
    },
    delete: async (id) => {
        const response = await api.delete(`${tagPath}/${id}`);
        return response;
    },
    setForMovie: async (movieId, tagIds) => {
        const response = await api.post(`${tagPath}/movies/${movieId}`, { tagIds });
        return response;
    },
    getForMovie: async (movieId) => {
        const response = await api.get(`${tagPath}/movies/${movieId}`);
        return response;
    }
}

export default tag;