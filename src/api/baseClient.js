import axios from 'axios';

// Base configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export const API_V2_URL = `${API_BASE_URL}/api/v2`;


const baseClient = axios.create({
    baseURL: API_V2_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default baseClient;