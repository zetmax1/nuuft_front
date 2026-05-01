import axios from 'axios';
import { API_BASE_URL } from './baseClient';

// Create axios instance for sections API
const sectionsClient = axios.create({
    baseURL: `${API_BASE_URL}/api/sections`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to get full image URL
export const getLeaderImageUrl = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
};

/**
 * Get list of all active university leaders (Rahbariyat)
 * Sorted by order (Rector first, then pro-rectors, etc.)
 * @returns {Promise<Array>} Array of leader objects
 */
export const getLeaders = async () => {
    try {
        const response = await sectionsClient.get('/leaders/');
        return response.data;
    } catch (error) {
        console.error('Error fetching leaders:', error);
        throw error;
    }
};

/**
 * Get university structure tree (all top-level sections with nested children)
 * Each section includes leader, members, and child sections
 * @returns {Promise<Array>} Array of top-level structure sections
 */
export const getStructureTree = async () => {
    try {
        const response = await sectionsClient.get('/structure/');
        return response.data;
    } catch (error) {
        console.error('Error fetching structure tree:', error);
        throw error;
    }
};

/**
 * Get a single structure section detail by slug
 * Includes full description, leader, members, and children
 * @param {string} slug - Section slug
 * @returns {Promise<Object>} Section detail object
 */
export const getStructureSection = async (slug) => {
    try {
        const response = await sectionsClient.get(`/structure/${slug}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching structure section:', error);
        throw error;
    }
};

export default {
    getLeaders,
    getLeaderImageUrl,
    getStructureTree,
    getStructureSection,
};
