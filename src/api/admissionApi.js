import axios from 'axios';
import { API_BASE_URL } from './baseClient';

const ADMISSION_API_URL = `${API_BASE_URL}/api/admission/`;

/**
 * Fetch all active admission years.
 */
export const getAdmissionYears = async () => {
    try {
        const response = await axios.get(ADMISSION_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching admission years:', error);
        throw error;
    }
};

/**
 * Fetch a specific admission year with steps and quotas.
 * @param {number} id
 */
export const getAdmissionYearDetail = async (id) => {
    try {
        const response = await axios.get(`${ADMISSION_API_URL}${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching admission year detail for id: ${id}`, error);
        throw error;
    }
};
