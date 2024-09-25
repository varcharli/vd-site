import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // 设置基础 URL
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const response = await fetch(`/api/movies?page=${pagination.page}&pageSize=${pagination.pageSize}&title=${queryString}`);
// const response = await api.getMovies(pagination.page, pagination.pageSize, queryString);
const getMovies = async (page, pageSize, title) => {
  console.log('getMovies page:', page);
  const response = await api.get(`/movies?page=${page}&pageSize=${pageSize}&title=${title}`);
  console.log('getMovies response:', response);
  return response;
};
api.getMovies = getMovies;

const getMovieById = async (id) => {
  const response = await api.get(`/movies/${id}`);
  return response;
};
api.getMovieById = getMovieById;

const playLinkPath = '/playLinks';
const getPlayLinks = async (movieId) => {
  const response = await api.get(`${playLinkPath}?MovieId=${movieId}`);
  return response;
}
api.getPlayLinks = getPlayLinks;
const createPlayLink = async (data) => {
  const response = await api.post(playLinkPath, data);
  return response;
};
api.createPlayLink = createPlayLink;
const updatePlayLink = async (id, data) => {
  const response = await api.put(`${playLinkPath}/${id}`, data);
  return response;
}
api.updatePlayLink = updatePlayLink;
const deletePlayLink = async (id) => {
  const response = await api.delete(`${playLinkPath}/${id}`);
  return response;
}
api.deletePlayLink = deletePlayLink;




export default api;

