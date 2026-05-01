import axios from 'axios';
import { API_BASE_URL } from './baseClient';

const topbarClient = axios.create({
    baseURL: `${API_BASE_URL}/api/navigation/topbar`,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Get list of top bar links
 * @param {string|null} locale - Language code: 'uz', 'ru', 'en' (default: null)
 * @returns {Promise<Array>}
 */
export const getTopBarLinks = async (locale = null) => {
    try {
        const params = locale ? { locale } : {};
        const response = await topbarClient.get('/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching top bar links:', error);
        throw error;
    }
};

export default {
    getTopBarLinks,
};
