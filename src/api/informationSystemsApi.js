import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const getInformationSystems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/information-systems/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching information systems:', error);
        throw error;
    }
};
