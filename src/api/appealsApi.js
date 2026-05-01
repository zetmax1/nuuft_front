import axios from 'axios';
import { API_BASE_URL } from './baseClient';

// Create axios instance for appeals API
const appealsClient = axios.create({
    baseURL: `${API_BASE_URL}/api/appeals`,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Submit an appeal to the director
 * @param {Object} appealData - Appeal form data
 * @param {string} appealData.full_name - Full name (F.I.O)
 * @param {string} appealData.email - Email address
 * @param {string} appealData.department - Faculty/department/other
 * @param {string} [appealData.group_number] - Group number (optional)
 * @param {string} appealData.phone - Phone number
 * @param {string} appealData.message - Appeal text
 * @param {boolean} appealData.terms_accepted - Terms accepted
 * @returns {Promise<Object>} Created appeal response
 */
export const submitAppeal = async (appealData) => {
    try {
        const response = await appealsClient.post('/submit/', appealData);
        return response.data;
    } catch (error) {
        console.error('Error submitting appeal:', error);
        throw error;
    }
};

export default {
    submitAppeal,
};
