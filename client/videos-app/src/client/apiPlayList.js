
import api from './api';

const playList = {
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
        // console.log('getFavoriteMovies response:', response);
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
        const response = await api.post(`/playLists/${id}/movies`, { MovieId: movieId });
        return response;
    },
    removeMovie: async (id, movieId) => {
        // console.log('removeMovie id:'+id+' movieId:'+movieId);
        const response = await api.delete(`/playLists/${id}/movies/${movieId}`);
        // console.log('removeMovie response:', response);
        return response;
    },
    addFavoriteMovie: async ({ user, movieId }) => {
        const listId = user.favoriteId;
        await playList.addMovie(listId, movieId);
    },
    removeFavoriteMovie: async ({ user, movieId }) => {
        const listId = user.favoriteId;
        // console.log('removeFavoriteMovie user:'+ user.id+' movieId:'+movieId);
        await playList.removeMovie(listId, movieId);
    },
    addWatchLaterMovie: async ({ user, movieId }) => {
        const listId = user.watchLaterId;
        await playList.addMovie(listId, movieId);
    },
    removeWatchLaterMovie: async ({ user, movieId }) => {
        const listId = user.watchLaterId;
        playList.removeMovie(listId, movieId);
    },

}

export default playList;