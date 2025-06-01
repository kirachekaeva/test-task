import axios from "axios";

export const API_URL = 'http://localhost:3001/'


export const api = axios.create({
    withCredentials: false,
    baseURL: API_URL
})