import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNewsList, getImageUrl } from '../api/newsApi';
import Image from './common/Image';
import LoadingSpinner from './common/LoadingSpinner';
import Pagination from './common/Pagination';
import { useLanguage } from '../context/LanguageContext';
import { formatDate } from '../utils/dateFormatter';

const NewsPage = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);

    useEffect(() => {
        fetchNews();
    }, [currentPage]);

    const fetchNews = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getNewsList(currentPage, 'news', null, 10);
            setNewsItems(response.results);
            setTotalPages(Math.ceil(response.count / 10));
            setHasNext(!!response.next);
            setHasPrevious(!!response.previous);
        } catch (err) {
            console.error('Error fetching news:', err);
            setError(t('news.errorNews'));
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-surface-100">
            {/* Header Section */}
            <div className="bg-primary-900 pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('common.backToHome')}
                    </button>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">
                        {t('news.newsHeadTitle')}
                    </h1>
                    <p className="text-white/70 max-w-2xl text-lg font-normal leading-relaxed">
                        {t('news.newsHeadDesc')}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-6 py-20">
                {loading && <LoadingSpinner />}
                
                {error && (
                    <div className="text-center py-20">
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 max-w-2xl mx-auto">
                            <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-xl font-bold text-red-900 dark:text-red-300 mb-2">{t('news.errorTitle')}</h3>
                            <p className="text-red-700 dark:text-red-400">{error}</p>
                            <button
                                onClick={fetchNews}
                                className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                {t('news.retryBtn')}
                            </button>
                        </div>
                    </div>
                )}

                {!loading && !error && newsItems.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">{t('news.emptyNews')}</p>
                    </div>
                )}

                {!loading && !error && newsItems.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {newsItems.map((post) => (
                                <article
                                    key={post.id}
                                    className="group bg-white dark:bg-slate-800/60 flex flex-col h-full rounded-lg shadow-[0_5px_15px_rgba(0,0,0,0.05)] border border-slate-100 dark:border-slate-700/50 overflow-hidden transition-all hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-700">
                                        <Image
                                            src={getImageUrl(post.cover_image_url) || '/placeholder-news.jpg'}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-4 left-4 bg-primary-500 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm">
                                            {t('news.badgeNews')}
                                        </div>
                                        {post.is_pinned && (
                                            <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm flex items-center gap-1">
                                                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                {t('news.badgePinned')}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <time className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4 block">
                                            {formatDate(post.published_date, language)}
                                        </time>
                                        <h2 className="text-2xl font-bold text-text-primary mb-4 font-sans leading-tight group-hover:text-primary-500 transition-colors">
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-600 dark:text-slate-400 mb-8 line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                        <button
                                            onClick={() => navigate(`/news-detail/${post.id}`)}
                                            className="mt-auto inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-primary-500 hover:text-primary-600 transition-colors"
                                        >
                                            {t('common.readMoreButton')}
                                            <span className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-600 flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:text-white transition-all">
                                                →
                                            </span>
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                hasNext={hasNext}
                                hasPrevious={hasPrevious}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default NewsPage;

