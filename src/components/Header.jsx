import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TopBar from './TopBar';
import Image from './common/Image';
import { getNavItems } from '../api/navApi';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

// Maximum number of top-level nav items visible before overflow into "More" dropdown
const MAX_VISIBLE = 7;

// Fallback nav items if API is unavailable
const FALLBACK_NAV_ITEMS = [
    { name: 'Bosh sahifa', id: 'home', path: '/' },
    {
        name: 'Universitet',
        id: 'about-dropdown',
        children: [
            { name: 'Filial haqida', id: 'about', path: '/about' },
            { name: 'Rahbariyat', id: 'leadership', path: '/leadership' },
            { name: 'Tuzilma', id: 'structure', path: '/structure' },
            { name: "Bo'sh ish o'rinlari", id: 'vacancies', path: '/vacancies' }
        ]
    },
    {
        name: 'Faoliyat',
        id: 'activity-dropdown',
        children: [
            { name: "O'quv faoliyati", id: 'education', path: '/education' },
            { name: 'Fakultetlar', id: 'faculties', path: '/faculties' },
            { name: 'Kafedralar', id: 'departments', path: '/departments' },
            { name: 'Ilmiy faoliyat', id: 'science', path: '/science' },
            { name: "Ma'naviy faoliyat", id: 'spirituality', path: '/spirituality' },
            { name: 'Xalqaro hamkorlik', id: 'international', path: '/international' }
        ]
    },
    {
        name: 'Talaba',
        id: 'students-dropdown',
        children: [
            { name: 'Qabul 2024', id: 'admission', path: '/admission' },
            { name: "Masofaviy ta'lim", id: 'distance-learning', path: '/distance-learning' },
            { name: 'Kutubxona', id: 'library', path: '/library' },
            { name: 'Elektron tizimlar', id: 'systems', path: '/systems' },
            { name: "To'lov-kontrakt", id: 'payment', path: '/payment' }
        ]
    },
    { name: 'Yangiliklar', id: 'news', path: '/news' },
    { name: "E'lonlar", id: 'announcements', path: '/announcements' },
    { name: 'Tizimlar', id: 'systems', path: '/systems' },
];

// Helper to build a path string from page id and optional params
const buildPath = (pageId, params = null) => {
    if (pageId === 'home') return '/';
    return params ? `/${pageId}/${params}` : `/${pageId}`;
};

const Header = ({ scrolled }) => {
    const { theme, toggleTheme } = useTheme();
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    let devMessage = 'This website is currently under development';
    if (language === 'uz') {
        devMessage = 'Ushbu veb-sayt hozirda test rejimida ishlamoqda'; 
    } else if (language === 'ru') {
        devMessage = 'Данный веб-сайт находится в тестовом режиме';
    } else if (language === 'en') {
        devMessage = 'This website is currently working test mode';
    }
    const devMessageRepeats = Array(3).fill(null);

    // Derive current page from pathname
    const currentPage = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];
    const forceSolid = currentPage !== 'home';
    const isSolid = scrolled || forceSolid;

    const [currentTime, setCurrentTime] = useState('');
    const [navItems, setNavItems] = useState(FALLBACK_NAV_ITEMS);

    // Fetch dynamic nav items from the API
    useEffect(() => {
        const fetchNavItems = async () => {
            try {
                const data = await getNavItems();
                if (data && data.length > 0) {
                    // Transform API response to match the component's format
                    const transformed = data.map(item => {
                        const hasChildren = item.children && item.children.length > 0;

                        // Determine the item path based on link type
                        let itemId;
                        let itemPath;
                        if (hasChildren) {
                            itemId = item.resolved_page_id 
                                ? `${item.resolved_page_id}-dropdown` 
                                : `dropdown-${item.id || item.title.replace(/\\s+/g, '-')}`;
                            itemPath = null;
                        } else if (item.link_type === 'dynamic') {
                            itemId = `dynamic-page-${item.resolved_slug || item.id}`;
                            itemPath = `/dynamic-page/${item.resolved_slug}`;
                        } else if (item.link_type === 'activity-category') {
                            itemId = `activity-category-${item.resolved_slug || item.id}`;
                            itemPath = `/activity-category/${item.resolved_slug}`;
                        } else {
                            itemId = item.resolved_page_id || item.id || `page-${item.title.replace(/\\s+/g, '-')}`;
                            itemPath = buildPath(item.resolved_page_id);
                        }

                        // Transform child items
                        const transformChild = (child) => {
                            if (child.link_type === 'dynamic') {
                                return { name: child.title, id: `dynamic-page-${child.resolved_slug || child.id}`, path: `/dynamic-page/${child.resolved_slug}` };
                            } else if (child.link_type === 'activity-category') {
                                return { name: child.title, id: `activity-category-${child.resolved_slug || child.id}`, path: `/activity-category/${child.resolved_slug}` };
                            }
                            return { name: child.title, id: child.resolved_page_id || child.id || `child-${child.title.replace(/\\s+/g, '-')}`, path: buildPath(child.resolved_page_id) };
                        };

                        return {
                            name: item.title,
                            id: itemId,
                            ...(itemPath && { path: itemPath }),
                            ...(hasChildren && {
                                children: item.children.map(transformChild)
                            })
                        };
                    });
                    setNavItems(transformed);
                }
            } catch (err) {
                // Silently fall back to hardcoded items
                console.warn('Using fallback navigation items');
            }
        };
        fetchNavItems();
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const date = String(now.getDate()).padStart(2, '0');
            const monthNamesUz = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];
            const monthKey = monthNamesUz[now.getMonth()];
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            
            const transMonth = t('common.months.' + monthKey);
            setCurrentTime(`${date} ${transMonth} ${year} ${hours}:${minutes}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, [t, language]);

    // Split nav items into visible and overflow groups
    const { visibleItems, overflowItems } = useMemo(() => {
        if (navItems.length <= MAX_VISIBLE) {
            return { visibleItems: navItems, overflowItems: [] };
        }
        return {
            visibleItems: navItems.slice(0, MAX_VISIBLE),
            overflowItems: navItems.slice(MAX_VISIBLE),
        };
    }, [navItems]);

    const handleNavigate = (path) => {
        navigate(path);
        setMobileMenuOpen(false);
        setActiveDropdown(null);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col font-sans">
            <div className="w-full bg-gradient-to-r from-primary-600 to-primary-900 text-white py-1.5 overflow-hidden text-xs md:text-sm font-bold tracking-wider relative z-[60] flex items-center shadow-md">
                <div className="animate-marquee pt-0.5">
                    <div className="flex items-center shrink-0 px-2">
                        {devMessageRepeats.map((_, i) => (
                            <div key={`msg-${i}`} className="flex items-center">
                                <span className="mx-8">{devMessage}</span>
                                <span className={i === 2 ? "hidden" : "text-white/40"}>•</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <TopBar />
            <div className={`w-full transition-all duration-500 border-b border-white/10 ${isSolid
                ? 'bg-theme-header backdrop-blur-xl shadow-xl py-1 md:py-2'
                : 'bg-white/5 backdrop-blur-md py-2 md:py-3'
                }`}>
                <div className="container mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between">
                        <a
                            href="/"
                            onClick={(e) => { e.preventDefault(); handleNavigate('/'); }}
                            className={`flex items-center gap-3 md:gap-4 transition-all duration-300 transform hover:scale-105 ${isSolid ? 'text-primary-500' : 'text-white'
                                }`}
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-300">
                                <Image src="/logo.png" alt="O'zMU JF Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-[9px] sm:text-[10px] md:text-[12px] font-bold font-sans leading-tight max-w-[150px] md:max-w-[240px] ${isSolid ? 'text-theme-nav' : 'text-white drop-shadow-md'}`}>
                                    {t('common.universityName')}
                                </span>
                            </div>
                        </a>

                        <nav className="hidden lg:block">
                            <ul className="flex items-center gap-4 xl:gap-6">
                                {visibleItems.map((item) => (
                                    <li
                                        key={item.id}
                                        className="relative group h-full py-4"
                                        onMouseEnter={() => setActiveDropdown(item.id)}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <a
                                            href={item.path || '#'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (!item.children && item.path) handleNavigate(item.path);
                                            }}
                                            className={`text-[15px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 py-2 ${currentPage === item.id ? 'text-primary-400' :
                                                (isSolid ? 'text-theme-nav hover:text-primary-500' : 'text-white hover:text-primary-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_50%)]')
                                                }`}
                                        >
                                            {item.name}
                                            {item.children && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform duration-300 ${activeDropdown === item.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            )}
                                        </a>

                                        {/* Dropdown Menu */}
                                        {item.children && (
                                            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-theme-dropdown backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 p-2 transition-all duration-300 origin-top overflow-hidden ${activeDropdown === item.id ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible -translate-y-2 scale-95'
                                                }`}>
                                                <div className="grid grid-cols-1 gap-1">
                                                    {item.children.map((child) => (
                                                        <a
                                                            key={child.id}
                                                            href={child.path || '#'}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handleNavigate(child.path);
                                                            }}
                                                            className="px-4 py-3 rounded-lg text-sm font-bold text-theme-nav hover:bg-primary-500 hover:text-white transition-all flex items-center justify-between group/link"
                                                        >
                                                            {child.name}
                                                            <span className="opacity-0 group-hover/link:opacity-100 transition-all -translate-x-2 group-hover/link:translate-x-0">
                                                                →
                                                            </span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </li>
                                ))}

                                {/* Overflow "Ko'proq" dropdown */}
                                {overflowItems.length > 0 && (
                                    <li
                                        className="relative group h-full py-4"
                                        onMouseEnter={() => setActiveDropdown('more-dropdown')}
                                        onMouseLeave={() => setActiveDropdown(null)}
                                    >
                                        <button
                                            className={`text-[15px] font-black uppercase tracking-wider transition-all flex items-center gap-1.5 py-2 ${isSolid ? 'text-theme-nav hover:text-primary-500' : 'text-white hover:text-primary-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_50%)]'
                                                }`}
                                        >
                                            {t('common.more')}
                                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform duration-300 ${activeDropdown === 'more-dropdown' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        <div className={`absolute top-full right-0 w-72 bg-theme-dropdown backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 p-2 transition-all duration-300 origin-top overflow-visible ${activeDropdown === 'more-dropdown' ? 'opacity-100 visible translate-y-0 scale-100' : 'opacity-0 invisible -translate-y-2 scale-95'
                                            }`}>
                                            <div className="grid grid-cols-1 gap-1">
                                                {overflowItems.map((item) => (
                                                    <div key={item.id} className="relative group/overflow">
                                                        <a
                                                            href={item.path || '#'}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (!item.children && item.path) handleNavigate(item.path);
                                                            }}
                                                            className="px-4 py-3 rounded-lg text-sm font-bold text-theme-nav hover:bg-primary-500 hover:text-white transition-all flex items-center justify-between"
                                                        >
                                                            {item.name}
                                                            {item.children && (
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                </svg>
                                                            )}
                                                        </a>

                                                        {/* Nested sub-dropdown for overflow items with children */}
                                                        {item.children && (
                                                            <div className="absolute top-0 left-full ml-1 w-64 bg-theme-dropdown backdrop-blur-xl rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 p-2 opacity-0 invisible group-hover/overflow:opacity-100 group-hover/overflow:visible transition-all duration-200">
                                                                {item.children.map((child) => (
                                                                    <a
                                                                        key={child.id}
                                                                        href={child.path || '#'}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleNavigate(child.path);
                                                                        }}
                                                                        className="px-4 py-3 rounded-lg text-sm font-bold text-theme-nav hover:bg-primary-500 hover:text-white transition-all flex items-center justify-between group/sublink"
                                                                    >
                                                                        {child.name}
                                                                        <span className="opacity-0 group-hover/sublink:opacity-100 transition-all -translate-x-2 group-hover/sublink:translate-x-0">
                                                                            →
                                                                        </span>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                )}

                                <li>
                                    <button
                                        onClick={toggleTheme}
                                        className={`p-2.5 rounded-full transition-all duration-300 ${isSolid
                                            ? 'bg-primary-50 text-primary-500 hover:bg-primary-100'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                            }`}
                                        aria-label="Toggle Theme"
                                    >
                                        {theme === 'light' ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M3 12h2.25m.386-6.364 1.591 1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                            </svg>
                                        )}
                                    </button>
                                </li>

                                <li>
                                    <a
                                        href="#contact"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="px-6 py-2.5 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-bold transition-all shadow-lg active:scale-95 text-[13px] border border-primary-600/20"
                                    >
                                        {t('common.contactBtn')}
                                    </a>
                                </li>
                            </ul>
                        </nav>

                        <button
                            className={`lg:hidden flex flex-col gap-1.5 p-2 md:p-3 rounded-lg transition-colors ${isSolid ? 'bg-primary-50' : 'bg-white/10 hover:bg-white/20'
                                }`}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span className={`w-6 md:w-7 h-0.5 rounded-full transition-all ${isSolid ? 'bg-primary-500' : 'bg-white'}`}></span>
                            <span className={`w-6 md:w-7 h-0.5 rounded-full transition-all ${isSolid ? 'bg-primary-500' : 'bg-white'}`}></span>
                            <span className={`w-6 md:w-7 h-0.5 rounded-full transition-all ${isSolid ? 'bg-primary-500' : 'bg-white'}`}></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed inset-0 z-[9999] w-full h-full overflow-y-auto bg-slate-900/95 backdrop-blur-xl transition-all duration-500 ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="min-h-screen flex flex-col p-6">
                    <div className="flex items-center justify-between mb-12">
                        <div className="w-12 h-12">
                            <Image src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-white hover:text-primary-300 transition-colors"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'light' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                                        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-7 w-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M3 12h2.25m.386-6.364 1.591 1.591M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                    </svg>
                                )}
                            </button>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 text-white hover:text-primary-300 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <div key={item.id} className="border-b border-white/5 pb-4">
                                <button
                                    onClick={() => {
                                        if (item.children) {
                                            setActiveDropdown(activeDropdown === item.id ? null : item.id);
                                        } else {
                                            handleNavigate(item.path || '/');
                                        }
                                    }}
                                    className="w-full flex items-center justify-between text-xl font-bold text-white uppercase tracking-widest py-2"
                                >
                                    {item.name}
                                    {item.children && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${activeDropdown === item.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </button>

                                {item.children && activeDropdown === item.id && (
                                    <div className="mt-4 flex flex-col gap-4 pl-4 animate-fade-in">
                                        {item.children.map((child) => (
                                            <a
                                                key={child.id}
                                                href={child.path || '#'}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleNavigate(child.path);
                                                }}
                                                className="text-white/60 hover:text-white font-semibold text-base py-1"
                                            >
                                                {child.name}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            setMobileMenuOpen(false);
                            setTimeout(() => {
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }, 300);
                        }}
                        className="mt-8 w-full py-4 bg-primary-500 text-white rounded-full font-bold text-base uppercase tracking-widest shadow-2xl text-center"
                    >
                        {t('common.contactBtn')}
                    </a>

                    {/* Integrated TopBar Content for Mobile */}
                    <div className="mt-12 flex flex-col gap-8 pb-10 border-t border-white/10 pt-8">
                        {/* Search and Language */}
                        <div className="flex flex-col gap-6">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder={t('common.search')}
                                    className="w-full bg-white/10 border border-white/10 rounded-full py-3 px-5 pl-12 text-white placeholder-white/50 focus:outline-none focus:bg-white/20"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <div className="flex items-center justify-center gap-4">
                                <button className="text-white hover:text-primary-300 bg-white/10 px-4 py-2 rounded-lg font-bold">O'zbekcha</button>
                                <button className="text-white/60 hover:text-white px-4 py-2 font-medium">Русский</button>
                                <button className="text-white/60 hover:text-white px-4 py-2 font-medium">English</button>
                            </div>
                        </div>

                        {/* Date, Schedule, Email */}
                        <div className="flex flex-col gap-4 items-center text-white/80">
                            <div className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="font-medium capitalize text-center">{currentTime}</span>
                            </div>

                            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>{t('common.schedule')}</span>
                            </a>

                            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>{t('common.email')}</span>
                            </a>
                        </div>

                        {/* Flag, Emblem, Music */}
                        <div className="flex items-center justify-center gap-6 pt-4 border-t border-white/5 w-full">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg"
                                alt="Uzbekistan Flag"
                                className="h-8 object-cover rounded shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => { navigate('/flag'); setMobileMenuOpen(false); }}
                            />
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emblem_of_Uzbekistan.svg/200px-Emblem_of_Uzbekistan.svg.png"
                                alt="Uzbekistan Emblem"
                                className="h-10 object-contain cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => { navigate('/emblem'); setMobileMenuOpen(false); }}
                            />
                            <button
                                className="hover:text-primary-300 text-white transition-colors"
                                onClick={() => { navigate('/anthem'); setMobileMenuOpen(false); }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
