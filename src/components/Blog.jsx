import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNews, getAnnouncements } from '../utils/storage';
import Image from './common/Image';
import { useLanguage } from '../context/LanguageContext';
import { formatDate } from '../utils/dateFormatter';
import { getLatestForHome, getImageUrl } from '../api/newsApi';

const Blog = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [latestNews, setLatestNews] = useState([]);
    const [latestAnnouncements, setLatestAnnouncements] = useState([]);

    useEffect(() => {
        // First load from local storage fallback instantly as a default
        setLatestNews(getNews().slice(0, 4));
        setLatestAnnouncements(getAnnouncements().slice(0, 4));

        // Fetch both news and announcements in parallel — not sequential
        const fetchPosts = async () => {
            try {
                const [newsData, annData] = await Promise.all([
                    getLatestForHome('news'),
                    getLatestForHome('announcement'),
                ]);

                if (Array.isArray(newsData) && newsData.length > 0) {
                    const formattedNews = newsData.map(item => ({
                        id: item.id,
                        title: item.title,
                        excerpt: item.excerpt,
                        image: getImageUrl(item.cover_image_url) || '/logo.png',
                        displayDate: new Date(item.published_date),
                        published_date: item.published_date
                    }));
                    setLatestNews(formattedNews);
                }

                if (Array.isArray(annData) && annData.length > 0) {
                    const formattedAnn = annData.map(item => ({
                        id: item.id,
                        title: item.title,
                        excerpt: item.excerpt,
                        image: getImageUrl(item.cover_image_url) || '/logo.png',
                        displayDate: new Date(item.published_date),
                        published_date: item.published_date
                    }));
                    setLatestAnnouncements(formattedAnn);
                }
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                // Local storage fallback already set above — UI stays populated
            }
        };

        fetchPosts();
    }, []);

    return (
        <section id="news" className="py-20 md:py-32 bg-surface-100 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                {/* News Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
                    <div className="max-w-2xl text-center md:text-left">
                        <span className="text-primary-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-3 md:mb-4 block">{t('news.newsTag')}</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 md:mb-6 font-sans tracking-tight">{t('news.latestNews')}</h2>
                        <div className="w-16 md:w-20 h-1 md:h-1.5 bg-primary-500 mb-4 md:mb-6 mx-auto md:mx-0 shadow-sm"></div>
                        <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                            {t('news.newsDesc')}
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-start">
                        <button
                            onClick={() => navigate('/news')}
                            className="px-8 md:px-10 py-3.5 md:py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all shadow-lg active:scale-95"
                        >
                            {t('news.newsHeadTitle')}
                        </button>
                    </div>
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                    {latestNews.map((post) => (
                        <article key={post.id} className="group bg-theme-card rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 relative flex flex-col h-full overflow-hidden border border-theme-border transform hover:-translate-y-1">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    className={`w-full h-full transition-transform duration-1000 group-hover:scale-110 ${
                                        post.image === '/logo.png' 
                                            ? 'object-contain p-4' 
                                            : 'object-cover'
                                    }`}
                                />
                                <div className="absolute top-3 left-3 bg-primary-500 text-white px-3 py-1 text-[8px] font-bold uppercase tracking-wider rounded-sm">
                                    {t('news.badgeNews')}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <time className="text-slate-400 font-bold text-[9px] uppercase tracking-wider mb-2 block">
                                    {formatDate(post.published_date, language)}
                                </time>
                                <h3 className="text-lg font-bold text-text-primary mb-3 font-sans leading-tight group-hover:text-primary-500 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <button
                                    onClick={() => navigate(`/news-detail/${post.id}`)}
                                    className="mt-auto text-[10px] font-bold text-primary-500 uppercase tracking-widest flex items-center gap-2 hover:text-primary-600 transition-colors"
                                >
                                    {t('common.readMoreButton')} <span className="text-lg">→</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Announcements Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
                    <div className="max-w-2xl text-center md:text-left">
                        <span className="text-primary-500 font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-3 md:mb-4 block">{t('news.annTag')}</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 md:mb-6 font-sans tracking-tight">{t('news.importantAnn')}</h2>
                        <div className="w-16 md:w-20 h-1 md:h-1.5 bg-primary-500 mb-4 md:mb-6 mx-auto md:mx-0 shadow-sm"></div>
                        <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                            {t('news.annDesc')}
                        </p>
                    </div>
                    <div className="flex justify-center md:justify-start">
                        <button
                            onClick={() => navigate('/announcements')}
                            className="px-8 md:px-10 py-3.5 md:py-4 bg-primary-700 hover:bg-primary-800 text-white rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all shadow-lg active:scale-95"
                        >
                            {t('news.annHeadTitle')}
                        </button>
                    </div>
                </div>

                {/* Announcements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {latestAnnouncements.map((post) => (
                        <article key={post.id} className="group bg-theme-card rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 relative flex flex-col h-full overflow-hidden border border-theme-border transform hover:-translate-y-1">
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    className={`w-full h-full transition-transform duration-1000 group-hover:scale-110 ${
                                        post.image === '/logo.png' 
                                            ? 'object-contain p-4' 
                                            : 'object-cover'
                                    }`}
                                />
                                <div className="absolute top-3 left-3 bg-primary-700 text-white px-3 py-1 text-[8px] font-bold uppercase tracking-wider rounded-sm">
                                    {t('news.badgeAnn')}
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <time className="text-slate-400 font-bold text-[9px] uppercase tracking-wider mb-2 block">
                                    {formatDate(post.published_date, language)}
                                </time>
                                <h3 className="text-lg font-bold text-text-primary mb-3 font-sans leading-tight group-hover:text-primary-700 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <button
                                    onClick={() => navigate(`/announcement-detail/${post.id}`)}
                                    className="mt-auto text-[10px] font-bold text-primary-700 uppercase tracking-widest flex items-center gap-2 hover:text-primary-800 transition-colors"
                                >
                                    {t('common.readMoreButton')} <span className="text-lg">→</span>
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
