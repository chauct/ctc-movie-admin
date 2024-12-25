import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://movienew.cybersoft.edu.vn/',
  headers: {
    TokenCybersoft:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OSIsIkhldEhhblN0cmluZyI6IjAzLzA5LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1Njg1NzYwMDAwMCIsIm5iZiI6MTcyOTcwMjgwMCwiZXhwIjoxNzU3MDA1MjAwfQ.nPo29RkxTkE_C16RhJnxw90M3v3cu3Ur91a47F5epxA',
  },

  // timeout: 10000,
});
// interceptor;
instance.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  };
  return config;
});

export default instance;
