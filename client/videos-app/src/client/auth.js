import axios from 'axios';

const authPath = '/auth/login';
const tokenKey = 'token';
export const login = async (username, password) => {
  try {
    const response = await axios.post(authPath, {
      name: username,
      password,
    });

    const { token } = response.data;
    localStorage.setItem(tokenKey, token); // 存储 JWT

    return null;
  } catch (error) {
    console.error('Login failed:', error.response);
    return error.response.data.message;
  }
};

export const logout = (needReturn=false) => {
  const currentUrl = window.location.href;

  localStorage.removeItem(tokenKey);
  // redirect to login page immediately
  if(!needReturn){
    window.location.href = '/login';
    return;
  }
  window.location.href = `/login?redirect=${encodeURIComponent(currentUrl)}`;
}


