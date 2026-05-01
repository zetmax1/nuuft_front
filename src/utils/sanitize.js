import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content to prevent XSS attacks.
 * Use this whenever rendering HTML from the backend (e.g. Wagtail rich text).
 * 
 * @param {string} dirty - Raw HTML string from the API
 * @returns {string} Sanitized HTML safe for dangerouslySetInnerHTML
 */
export const sanitizeHtml = (dirty) => {
    if (!dirty) return '';
    return DOMPurify.sanitize(dirty);
};
