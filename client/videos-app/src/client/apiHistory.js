import api from './api';

const history={
    get: async () => {
        const response = await api.get('/history');
        return response;
    },
    create: async (data) => {
        console.log('history add :', data);
        const response = await api.post('/history', data);
        console.log('history add response :'+ response);
        return response;
    },
    update: async (id) => {
        const response = await api.put(`/history/${id}`);
        return response;
    },
    remove: async (id) => {
        const response = await api.delete(`/history/${id}`);
        return response;
    },
    clear: async () => {
        const response = await api.delete('/history');
        return response;
    },
}

export default history;