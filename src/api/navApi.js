import axios from 'axios';
import { API_BASE_URL } from './baseClient';

const navClient = axios.create({
    baseURL: `${API_BASE_URL}/api/navigation`,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Get all navigation items with their children
 * @returns {Promise<Array>} Array of nav items with nested children
 */
export const getNavItems = async () => {
    try {
        const response = await navClient.get('/items/');
        return response.data;
    } catch (error) {
        console.error('Error fetching nav items:', error);
        throw error;
    }
};

/**
 * Get a dynamic page by its slug
 * @param {string} slug - The page slug
 * @returns {Promise<Object>} Page object with title and body
 */
export const getDynamicPage = async (slug) => {
    if (!slug || slug === 'null' || slug === 'undefined') {
        throw new Error('Invalid or missing slug');
    }
    try {
        const response = await navClient.get(`/pages/${slug}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching dynamic page:', error);
        throw error;
    }
};

export default { getNavItems, getDynamicPage };
