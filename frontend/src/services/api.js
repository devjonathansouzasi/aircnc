import axios from 'axios';

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}` 
});

export default api;

