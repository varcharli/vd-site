import axios from 'axios';
import {logout} from './auth';

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

// 添加响应拦截器
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // 401
      // alert('Session expired. Please log in again.');
      logout();
    }
    return error;
  }
);


// const response = await fetch(`/api/movies?page=${pagination.page}&pageSize=${pagination.pageSize}&title=${queryString}`);
// const response = await api.getMovies(pagination.page, pagination.pageSize, queryString);
const getMovies = async ({page=1, pageSize=12, title='',tagIds=[]}) => {
  // console.log('getMovies page:', page);
  let requestUrl = `/movies?page=${page}&pageSize=${pageSize}&title=${title}`;
  if ( tagIds.length > 0) {
    //tagIds: [1,2,3] => tagIds='1,2,3'
    tagIds = tagIds.join(',');
    requestUrl += `&tagIds=${tagIds}`;
  }
  const response = await api.get(requestUrl);
  // console.log('getMovies response:', response);
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

const tagPath = '/tags';
const getTags = async () => {
  const response = await api.get(tagPath);
  return response;
};
api.getTags = getTags;

const getTagById = async (id) => {
  const response = await api.get(`${tagPath}/${id}`);
  return response;
}
api.getTagById = getTagById;

const createTag = async (data) => {
  const response = await api.post(tagPath, data);
  return response;
};
api.createTag = createTag;


const updateTag = async (id, data) => {
  const response = await api.put(`${tagPath}/${id}`, data);
  return response;
}
api.updateTag = updateTag;

const deleteTag = async (id) => {
  const response = await api.delete(`${tagPath}/${id}`);
  return response;
}
api.deleteTag = deleteTag;

const setTagsForMovie = async (movieId, tagIds) => {
  const response = await api.post(`${tagPath}/movies/${movieId}`, { tagIds });
  return response;
}
api.setTagsForMovie = setTagsForMovie;

const getTagsForMovie = async (movieId) => {
  const response = await api.get(`${tagPath}/movies/${movieId}`);
  return response;
}
api.getTagsForMovie = getTagsForMovie;





export default api;

