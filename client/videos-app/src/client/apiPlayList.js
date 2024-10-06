
import api from './api';

const playList={
    create: async (data) => {
        const response = await api.post('/playLists', data);
        return response;
    },
    get: async () => {
        const response = await api.get('/playLists');
        return response;
    },
    getFavorite: async () => {
        const response = await api.get('/playLists/favorite');
        return response;
    },
    getFavoriteMovies: async () => {
        const response = await api.get('/playLists/favorite/movies');
        return response;
    },
    getWatchLater: async () => {
        const response = await api.get('/playLists/watchLater');
        return response;
    },
    getWatchLaterMovies: async () => {
        const response = await api.get('/playLists/watchLater/movies');
        return response;
    },
    getById: async (id) => {
        const response = await api.get(`/playLists/${id}`);
        return response;
    },
    update: async (id, data) => {
        const response = await api.put(`/playLists/${id}`, data);
        return response;
    },
    delete: async (id) => {
        const response = await api.delete(`/playLists/${id}`);
        return response;
    },
    getMovies: async (id) => {
        const response = await api.get(`/playLists/${id}/movies`);
        return response;
    },
    addMovie: async (id, movieId) => {
        const response = await api.post(`/playLists/${id}/movies/${movieId}`);
        return response;
    },
    removeMovie: async (id, movieId) => {
        const response = await api.delete(`/playLists/${id}/movies/${movieId}`);
        return response;
    },
}

export default playList;