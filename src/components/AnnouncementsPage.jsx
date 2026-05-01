import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnnouncements, getPinnedNews, getImageUrl } from '../api/newsApi';
import Image from './common/Image';
import LoadingSpinner from './common/LoadingSpinner';
import Pagination from './common/Pagination';
import { useLanguage } from '../context/LanguageContext';
import { formatDate } from '../utils/dateFormatter';

const AnnouncementsPage = () => {
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [announcements, setAnnouncements] = useState([]);
    const [pinnedAnnouncements, setPinnedAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);

    useEffect(() => {
        fetchAnnouncements();
    }, [currentPage]);

    useEffect(() => {
        fetchPinnedAnnouncements();
    }, []);

    const fetchPinnedAnnouncements = async () => {
        try {
            const pinnedData = await getPinnedNews();
            // Filter only announcements
            const pinnedAnnouncementsOnly = pinnedData.filter(item => item.post_type === 'announcement');
            setPinnedAnnouncements(pinnedAnnouncementsOnly);
        } catch (err) {
            console.error('Error fetching pinned announcements:', err);
        }
    };

    const fetchAnnouncements = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAnnouncements(currentPage, null, 10);
            // Filter out pinned announcements to avoid duplication
            const unpinned = response.results.filter(item => !item.is_pinned);
            setAnnouncements(unpinned);
            setTotalPages(Math.ceil(response.count / 10));
            setHasNext(!!response.next);
            setHasPrevious(!!response.previous);
        } catch (err) {
            console.error('Error fetching announcements:', err);
            setError(t('news.errorAnn'));
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderAnnouncementCard = (post, isPinned = false) => (
        <article
            key={post.id}
            className={`group bg-white dark:bg-slate-800/60 flex flex-col h-full rounded-lg overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 border ${
                isPinned ? 'border-amber-300 dark:border-amber-500/30 ring-2 ring-amber-200 dark:ring-amber-500/20' : 'border-slate-100 dark:border-slate-700/50'
            } transform hover:-translate-y-1`}
        >
            <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-slate-700">
                <Image
                    src={getImageUrl(post.cover_image_url) || '/placeholder-announcement.jpg'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-4 left-4 bg-primary-700 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm">
                    {t('news.badgeAnn')}
                </div>
                {isPinned && (
                    <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest rounded-sm flex items-center gap-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {t('news.badgePinned')}
                    </div>
                )}
            </div>
            <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <time className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                        {formatDate(post.published_date, language)}
                    </time>
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-4 font-sans leading-tight group-hover:text-primary-700 transition-colors">
                    {post.title}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 line-clamp-3">
                    {post.excerpt}
                </p>
                <button
                    onClick={() => navigate(`/announcement-detail/${post.id}`)}
                    className="mt-auto py-4 bg-slate-50 dark:bg-slate-700/50 group-hover:bg-primary-700 text-primary-700 dark:text-primary-400 group-hover:text-white rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                    {t('common.readMore')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>
            </div>
        </article>
    );

    return (
        <div className="min-h-screen bg-surface-100">
            {/* Header Section */}
            <div className="bg-primary-800 pt-32 pb-20">
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
                        {t('news.annHeadTitle')}
                    </h1>
                    <p className="text-white/70 max-w-2xl text-lg font-normal leading-relaxed">
                        {t('news.annHeadDesc')}
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
                                onClick={fetchAnnouncements}
                                className="mt-4 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                {t('news.retryBtn')}
                            </button>
                        </div>
                    </div>
                )}

                {!loading && !error && announcements.length === 0 && pinnedAnnouncements.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-slate-500 text-lg">{t('news.emptyAnn')}</p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Pinned Announcements */}
                        {pinnedAnnouncements.length > 0 && (
                            <div className="mb-16">
                                <h2 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
                                    <svg className="h-6 w-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    {t('news.pinnedAnnTitle')}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                    {pinnedAnnouncements.map((post) => renderAnnouncementCard(post, true))}
                                </div>
                            </div>
                        )}

                        {/* Regular Announcements */}
                        {announcements.length > 0 && (
                            <>
                                {pinnedAnnouncements.length > 0 && (
                                    <h2 className="text-2xl font-bold text-text-primary mb-8">{t('news.otherAnnTitle')}</h2>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {announcements.map((post) => renderAnnouncementCard(post, false))}
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
                    </>
                )}
            </div>
        </div>
    );
};

export default AnnouncementsPage;

