import React, { createContext, useContext, useState } from 'react';
import { getTranslation } from '../locales';

const LanguageContext = createContext();

export const LanguageProvider = ({ children, initialLang }) => {
    const [language] = useState(initialLang || 'uz');

    const changeLanguage = (newLang) => {
        if (newLang === language) return;
        
        const currentPath = window.location.pathname;
        const search = window.location.search;
        const supportedLangs = ['uz', 'ru', 'en'];
        
        let newPath;
        const pathPrefix = currentPath.split('/')[1];
        
        if (supportedLangs.includes(pathPrefix)) {
            newPath = currentPath.replace(new RegExp(`^/${pathPrefix}`), `/${newLang}`);
        } else {
            // Unlikely to happen if main.jsx redirects, but fallback
            newPath = `/${newLang}${currentPath}`;
        }
        
        window.location.href = newPath + search;
    };

    const t = (key) => getTranslation(language, key);

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
