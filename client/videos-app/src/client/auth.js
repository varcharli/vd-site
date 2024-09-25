import axios from 'axios';

const authPath = '/auth/login'; 

export const login = async (username, password) => {
  try {
    const response = await axios.post(authPath, {
      name: username,
      password, 
    });

    const { token } = response.data;
    localStorage.setItem('token', token); // 存储 JWT

    return null;
  } catch (error) {
    console.error('Login failed:', error.response);
    return error.response.data.message;
  }
};

export default login;