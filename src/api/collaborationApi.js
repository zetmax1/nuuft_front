import axios from 'axios';
import { API_BASE_URL } from './baseClient';

const COLLABORATION_API_URL = `${API_BASE_URL}/api/collaboration/`;

/**
 * Fetch all collaboration types.
 */
export const getCollaborationTypes = async () => {
    try {
        const response = await axios.get(COLLABORATION_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching collaboration types:', error);
        throw error;
    }
};

/**
 * Fetch a specific collaboration type detail with partners and projects.
 * @param {string} slug
 */
export const getCollaborationTypeDetail = async (slug) => {
    try {
        const response = await axios.get(`${COLLABORATION_API_URL}${slug}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching collaboration type detail for slug: ${slug}`, error);
        throw error;
    }
};

/**
 * Fetch all partner organizations.
 * @param {Object} params - Optional filters: { type, country }
 */
export const getPartners = async (params = {}) => {
    try {
        const queryParams = new URLSearchParams();
        if (params.type) queryParams.append('type', params.type);
        if (params.country) queryParams.append('country', params.country);
        const queryString = queryParams.toString();
        const url = `${COLLABORATION_API_URL}partners/${queryString ? `?${queryString}` : ''}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching partners:', error);
        throw error;
    }
};

/**
 * Fetch a specific partner organization detail.
 * @param {string} slug
 */
export const getPartnerDetail = async (slug) => {
    try {
        const response = await axios.get(`${COLLABORATION_API_URL}partners/${slug}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching partner detail for slug: ${slug}`, error);
        throw error;
    }
};

/**
 * Fetch all collaboration projects.
 * @param {Object} params - Optional filters: { type }
 */
export const getProjects = async (params = {}) => {
    try {
        const queryParams = new URLSearchParams();
        if (params.type) queryParams.append('type', params.type);
        const queryString = queryParams.toString();
        const url = `${COLLABORATION_API_URL}projects/${queryString ? `?${queryString}` : ''}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

/**
 * Fetch a specific collaboration project detail.
 * @param {string} slug
 */
export const getProjectDetail = async (slug) => {
    try {
        const response = await axios.get(`${COLLABORATION_API_URL}projects/${slug}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching project detail for slug: ${slug}`, error);
        throw error;
    }
};

/**
 * Fetch a specific collaboration page detail.
 * @param {string} typeSlug - Collaboration type slug
 * @param {string} pageSlug - Page slug
 */
export const getCollaborationPageDetail = async (typeSlug, pageSlug) => {
    try {
        const response = await axios.get(`${COLLABORATION_API_URL}${typeSlug}/pages/${pageSlug}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching collaboration page: ${typeSlug}/${pageSlug}`, error);
        throw error;
    }
};
