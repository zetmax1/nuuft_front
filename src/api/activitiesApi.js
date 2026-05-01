import axios from 'axios';
import { API_BASE_URL } from './baseClient';

// We use API_BASE_URL and standard paths for Activities app
const ACTIVITIES_API_URL = `${API_BASE_URL}/api/activities/`;

/**
 * Fetch all activity categories.
 */
export const getActivities = async () => {
    try {
        const response = await axios.get(ACTIVITIES_API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching activities:', error);
        throw error;
    }
};

/**
 * Fetch a specific category and its direct child pages.
 * @param {string} slug 
 */
export const getActivityCategoryDetail = async (slug) => {
    try {
        const response = await axios.get(`${ACTIVITIES_API_URL}${slug}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching activity category detail for slug: ${slug}`, error);
        throw error;
    }
};

/**
 * Fetch a specific activity page, its nested children, and breadcrumbs.
 * @param {string} categorySlug 
 * @param {string} pageSlug 
 */
export const getActivityPageDetail = async (categorySlug, pageSlug) => {
    try {
        const response = await axios.get(`${ACTIVITIES_API_URL}${categorySlug}/pages/${pageSlug}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching activity page detail: ${categorySlug} / ${pageSlug}`, error);
        throw error;
    }
};
