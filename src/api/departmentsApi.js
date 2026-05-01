import axios from 'axios';
import { API_BASE_URL } from './baseClient';

const apiClient = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Helper to get full image URL
export const getImageUrl = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
};

// Get all departments
export const getAllDepartments = async () => {
    try {
        const response = await apiClient.get('/departments/');
        return response.data.results || [];
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

// Get single department by ID
export const getDepartmentById = async (id) => {
    try {
        const response = await apiClient.get(`/departments/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching department:', error);
        throw error;
    }
};

// Get departments by faculty
export const getDepartmentsByFaculty = async (facultyId) => {
    try {
        const response = await apiClient.get('/departments/', {
            params: { faculty: facultyId }
        });
        return response.data.results || [];
    } catch (error) {
        console.error('Error fetching departments by faculty:', error);
        throw error;
    }
};