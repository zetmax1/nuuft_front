import axios from 'axios';
import { API_BASE_URL } from './baseClient';

// DRF client for faculties/departments REST API (not Wagtail Pages API)
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

// ═══════════════════════════════════════
// Faculties
// ═══════════════════════════════════════

// Get all faculties (list view — lightweight)
export const getAllFaculties = async () => {
    try {
        const response = await apiClient.get('/faculties/');
        return response.data.results || [];
    } catch (error) {
        console.error('Error fetching faculties:', error);
        throw error;
    }
};

// Get faculty by ID (detail view — includes departments & achievements)
export const getFacultyById = async (id) => {
    try {
        const response = await apiClient.get(`/faculties/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching faculty:', error);
        throw error;
    }
};

// ═══════════════════════════════════════
// Departments
// ═══════════════════════════════════════

// Get all departments (list view — lightweight)
export const getAllDepartments = async () => {
    try {
        const response = await apiClient.get('/departments/');
        return response.data.results || [];
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error;
    }
};

// Get departments by faculty ID
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

// Get department by ID (detail view — includes programs, subjects, staff, publications)
export const getDepartmentById = async (id) => {
    try {
        const response = await apiClient.get(`/departments/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching department:', error);
        throw error;
    }
};
