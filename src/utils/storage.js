import { newsData, announcementsData } from '../data/news';
import { universityStructure } from '../data/structure';

const NEWS_STORAGE_KEY = 'jbnuu_news';
const ANNOUNCEMENTS_STORAGE_KEY = 'jbnuu_announcements';
const STRUCTURE_STORAGE_KEY = 'jbnuu_structure';

export const getNews = () => {
    try {
        const storedNews = localStorage.getItem(NEWS_STORAGE_KEY);
        if (storedNews) {
            return JSON.parse(storedNews);
        }
    } catch (e) {
        console.error('Failed to load news from storage', e);
    }
    return newsData;
};

export const saveNews = (news) => {
    try {
        localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news));
    } catch (e) {
        console.error('Failed to save news to storage', e);
    }
};

export const getAnnouncements = () => {
    try {
        const stored = localStorage.getItem(ANNOUNCEMENTS_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load announcements from storage', e);
    }
    return announcementsData;
};

export const saveAnnouncements = (data) => {
    try {
        localStorage.setItem(ANNOUNCEMENTS_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save announcements to storage', e);
    }
};

export const getStructure = () => {
    try {
        const stored = localStorage.getItem(STRUCTURE_STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (e) {
        console.error('Failed to load structure from storage', e);
    }
    return universityStructure;
};

export const saveStructure = (data) => {
    try {
        localStorage.setItem(STRUCTURE_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error('Failed to save structure to storage', e);
    }
};

// Reset to default
export const resetStorage = () => {
    localStorage.removeItem(NEWS_STORAGE_KEY);
    localStorage.removeItem(ANNOUNCEMENTS_STORAGE_KEY);
    localStorage.removeItem(STRUCTURE_STORAGE_KEY);
};
