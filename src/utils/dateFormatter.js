const MONTH_NAMES = {
    uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr'],
    ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

export const formatDate = (dateValue, language = 'uz') => {
    if (!dateValue) return '';
    try {
        const date = new Date(dateValue);
        const day = date.getDate();
        const month = (MONTH_NAMES[language] || MONTH_NAMES.uz)[date.getMonth()];
        const year = date.getFullYear();
        
        if (language === 'en') return `${month} ${day}, ${year}`;
        if (language === 'ru') return `${day} ${month} ${year} г.`;
        return `${day} ${month} ${year} yil`;
    } catch(e) {
        return '';
    }
};

export const formatDateTime = (dateValue, language = 'uz') => {
    if (!dateValue) return '';
    try {
        const date = new Date(dateValue);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;
        const dateStr = formatDate(dateValue, language);
        return `${dateStr} ${timeStr}`;
    } catch(e) {
        return '';
    }
};
