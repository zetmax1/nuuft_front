import axios from 'axios';
import { API_BASE_URL } from './baseClient';

/**
 * Get statistics from HEMIS wrapper
 * @returns {Promise<Object>} Statistics object with directions_count, students_count, teachers_count, efficiency
 */
export const getHemisStatistics = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/hemis/statistics/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching HEMIS statistics:', error);
        throw error;
    }
};

export default {
    getHemisStatistics,
};
