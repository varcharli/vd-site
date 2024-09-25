import axios from 'axios';

const authPath = '/auth/login'; 

const login = async (username, password) => {
  try {
    const response = await axios.post(authPath, {
      name: username,
      passwordHash: password, 
    });

    const { token } = response.data;
    localStorage.setItem('token', token); // 存储 JWT

    return null;
  } catch (error) {
    return error.response.data.message;
  }
};

export default login;