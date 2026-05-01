import axios from 'axios';
import { API_BASE_URL } from './baseClient';

// Create axios instance for common API
const commonClient = axios.create({
    baseURL: `${API_BASE_URL}/api/common`,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Get list of active vacancies
 * @param {string|null} category - Filter by category: 'academic', 'technical', 'admin' (null = all)
 * @returns {Promise<Array>} Array of vacancy objects
 */
export const getVacancies = async (category = null) => {
    try {
        const params = {};
        if (category && category !== 'all') {
            params.category = category;
        }
        const response = await commonClient.get('/vacancies/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching vacancies:', error);
        throw error;
    }
};

/**
 * Get single vacancy detail
 * @param {number} id - Vacancy ID
 * @returns {Promise<Object>} Vacancy detail
 */
export const getVacancyDetail = async (id) => {
    try {
        const response = await commonClient.get(`/vacancies/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching vacancy detail:', error);
        throw error;
    }
};

/**
 * Submit a job application
 * @param {FormData|Object} applicationData - Application form data
 * @returns {Promise<Object>} Created application response
 */
export const applyForVacancy = async (applicationData) => {
    try {
        // Use FormData for file upload support
        const isFormData = applicationData instanceof FormData;
        const response = await commonClient.post('/vacancies/apply/', applicationData, {
            headers: isFormData
                ? { 'Content-Type': 'multipart/form-data' }
                : { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error('Error submitting application:', error);
        throw error;
    }
};

export default {
    getVacancies,
    getVacancyDetail,
    applyForVacancy,
};
