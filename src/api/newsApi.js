import axios from 'axios';
import { API_BASE_URL } from './baseClient';

// Helper to get full image URL
export const getImageUrl = (imageObj) => {
    if (!imageObj) return null;
    
    if (typeof imageObj === 'string') {
        return imageObj.startsWith('http') ? imageObj : `${API_BASE_URL}${imageObj}`;
    }
    
    if (imageObj.url) {
        return imageObj.url.startsWith('http') ? imageObj.url : `${API_BASE_URL}${imageObj.url}`;
    }
    
    return null;
};

// Create axios instance for news API
const newsClient = axios.create({
    baseURL: `${API_BASE_URL}/api/news`,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Get paginated list of news and announcements
 * @param {number} page - Page number (default: 1)
 * @param {string|null} type - Filter by type: 'news' or 'announcement' (default: null for all)
 * @param {string|null} locale - Language code: 'uz', 'ru', 'en' (default: null)
 * @param {number} pageSize - Items per page (default: 10)
 * @returns {Promise<{count: number, next: string|null, previous: string|null, results: Array}>}
 */
export const getNewsList = async (page = 1, type = null, locale = null, pageSize = 10) => {
    try {
        const params = { page, page_size: pageSize };
        if (type) params.type = type;
        if (locale) params.locale = locale;
        
        const response = await newsClient.get('/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching news list:', error);
        throw error;
    }
};

/**
 * Get single news/announcement detail
 * @param {number} id - News/announcement ID
 * @returns {Promise<Object>} News detail with full content and gallery images
 */
export const getNewsDetail = async (id) => {
    try {
        const response = await newsClient.get(`/${id}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching news detail:', error);
        throw error;
    }
};

/**
 * Get only pinned/featured news and announcements
 * @param {string|null} locale - Language code
 * @returns {Promise<Array>} Array of pinned news items
 */
export const getPinnedNews = async (locale = null) => {
    try {
        const params = locale ? { locale } : {};
        const response = await newsClient.get('/pinned/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching pinned news:', error);
        throw error;
    }
};

/**
 * Get only announcements (paginated)
 * @param {number} page - Page number
 * @param {string|null} locale - Language code
 * @param {number} pageSize - Items per page
 * @returns {Promise<{count: number, next: string|null, previous: string|null, results: Array}>}
 */
export const getAnnouncements = async (page = 1, locale = null, pageSize = 10) => {
    try {
        const params = { page, page_size: pageSize };
        if (locale) params.locale = locale;
        
        const response = await newsClient.get('/announcements/', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching announcements:', error);
        throw error;
    }
};

/**
 * Get latest news/announcements for home page
 * @param {string} type - 'news' or 'announcement'
 * @returns {Promise<Array>} Array of latest posts
 */
export const getLatestForHome = async (type = 'news') => {
    try {
        const response = await newsClient.get('/latest_for_home/', {
            params: { type }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching latest ${type} for home:`, error);
        throw error;
    }
};

export default {
    getNewsList,
    getNewsDetail,
    getPinnedNews,
    getAnnouncements,
    getImageUrl,
    getLatestForHome,
};
