import axios from 'axios';
import { API_BASE_URL } from './baseClient';

const ENLIGHTENMENT_API_URL = `${API_BASE_URL}/api/enlightenment/`;

/**
 * Fetch all achievement sections for the "Yuksak marralar" page.
 */
export const getAchievementSections = async () => {
    try {
        const response = await axios.get(`${ENLIGHTENMENT_API_URL}achievements/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching achievement sections:', error);
        throw error;
    }
};

/**
 * Fetch all enlightenment sections for the "Ma'rifiy muhit" page.
 */
export const getEnlightenmentSections = async () => {
    try {
        const response = await axios.get(`${ENLIGHTENMENT_API_URL}sections/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching enlightenment sections:', error);
        throw error;
    }
};

/**
 * Fetch all active clubs.
 */
export const getClubs = async () => {
    try {
        const response = await axios.get(`${ENLIGHTENMENT_API_URL}clubs/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching clubs:', error);
        throw error;
    }
};

/**
 * Fetch a single club detail by slug.
 * @param {string} slug
 */
export const getClubDetail = async (slug) => {
    try {
        const response = await axios.get(`${ENLIGHTENMENT_API_URL}clubs/${slug}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching club detail for slug: ${slug}`, error);
        throw error;
    }
};

/**
 * Fetch dynamic stats for the Achievements page sidebar.
 */
export const getEnlightenmentStats = async () => {
    try {
        const response = await axios.get(`${ENLIGHTENMENT_API_URL}stats/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching enlightenment stats:', error);
        throw error;
    }
};
