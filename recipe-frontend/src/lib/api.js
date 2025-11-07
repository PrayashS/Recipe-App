// import axios from 'axios';
// const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
// export function getToken(){ return localStorage.getItem('token'); }
// export default axios.create({ baseURL: API_BASE });

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
});

export default api;
