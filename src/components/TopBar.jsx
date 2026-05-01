import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Image from './common/Image';
import { useLanguage } from '../context/LanguageContext';
import { getTopBarLinks } from '../api/topbarApi';
import { formatDateTime } from '../utils/dateFormatter';

const TopBar = () => {
    const navigate = useNavigate();
    const { language, changeLanguage, t } = useLanguage();
    const [currentTime, setCurrentTime] = useState('');
    const [topbarLinks, setTopbarLinks] = useState([]);

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const links = await getTopBarLinks(language);
                setTopbarLinks(links || []);
            } catch (error) {
                console.error("Error fetching top bar links:", error);
            }
        };
        fetchLinks();
    }, [language]);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(formatDateTime(now, language));
        };

        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, [language, t]);

    return (
        <div className="hidden lg:block bg-primary-900/80 backdrop-blur-md text-white/90 py-1.5 px-4 text-xs z-50 relative border-b border-white/5">
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

                {/* Left Section: Flag, Emblem, Music */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2.5">
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg"
                            alt="Uzbekistan Flag"
                            className="w-6 h-4 object-cover rounded-sm shadow-sm cursor-pointer hover:scale-110 hover:shadow-md transition-all duration-200"
                            onClick={() => navigate('/flag')}
                            title="O'zbekiston Respublikasining Davlat Bayrog'i"
                        />
                        <Image
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emblem_of_Uzbekistan.svg/200px-Emblem_of_Uzbekistan.svg.png"
                            alt="Uzbekistan Emblem"
                            className="w-5 h-5 object-contain cursor-pointer hover:scale-110 transition-all duration-200"
                            onClick={() => navigate('/emblem')}
                            title="O'zbekiston Respublikasining Davlat Gerbi"
                        />
                    </div>

                    <div className="w-px h-3.5 bg-white/15"></div>

                    <button
                        className="text-white/70 hover:text-white transition-colors duration-200"
                        title="O'zbekiston Respublikasining Davlat Madhiyasi"
                        onClick={() => navigate('/anthem')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                    </button>
                </div>

                {/* Center Section: Date, Schedule, Email */}
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1.5 text-white/80">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium capitalize">{currentTime}</span>
                    </div>

                    {topbarLinks.map((link, index) => (
                        <div key={link.id || index} className="flex items-center gap-5">
                            <div className="w-px h-3.5 bg-white/15"></div>
                            <Link to={`/dynamic-page/${link.resolved_slug}`} className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors duration-200">
                                <span>{link.title}</span>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Right Section: Search, Language */}
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder={t('common.search')}
                            className="bg-white/5 border border-white/10 rounded-full py-1 px-3 pl-8 text-xs text-white focus:outline-none focus:bg-white/10 focus:border-primary-400/40 w-32 focus:w-48 transition-all duration-300 placeholder-white/40"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="w-px h-3.5 bg-white/15"></div>

                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold">
                        <button 
                            onClick={() => changeLanguage('uz')}
                            className={`${language === 'uz' ? 'text-white bg-primary-500/30 border border-primary-400/30' : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'} px-2 py-0.5 rounded-md transition-colors duration-200`}
                        >
                            Uz
                        </button>
                        <button 
                            onClick={() => changeLanguage('ru')}
                            className={`${language === 'ru' ? 'text-white bg-primary-500/30 border border-primary-400/30' : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'} px-2 py-0.5 rounded-md transition-colors duration-200`}
                        >
                            Ru
                        </button>
                        <button 
                            onClick={() => changeLanguage('en')}
                            className={`${language === 'en' ? 'text-white bg-primary-500/30 border border-primary-400/30' : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'} px-2 py-0.5 rounded-md transition-colors duration-200`}
                        >
                            En
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
