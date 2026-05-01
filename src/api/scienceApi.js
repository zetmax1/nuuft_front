import axios from 'axios';
import { API_BASE_URL } from './baseClient';

// Dedicated client for custom science endpoints that are NOT under /api/v2/
const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const scienceApi = {
    // Get main science page content (hero, common stats)
    getIndex: async () => {
        try {
            const response = await client.get('/api/science/index/');
            return response.data;
        } catch (error) {
            console.error('Error fetching science index:', error);
            throw error;
        }
    },

    // Get all research areas (cards)
    getAreas: async (page = 1) => {
        try {
            const response = await client.get(`/api/science/areas/?page=${page}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching research areas:', error);
            throw error;
        }
    },

    // Get details for a specific research area by slug
    getDetail: async (slug) => {
        try {
            const response = await client.get(`/api/science/detail/${slug}/`);
            return response.data;
        } catch (error) {
            console.error('Error fetching research detail:', error);
            throw error;
        }
    }
};

export default scienceApi;
