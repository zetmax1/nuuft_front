import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllFaculties, getImageUrl } from '../api/facultiesApi';
import { useLanguage } from '../context/LanguageContext';

const FacultiesPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [faculties, setFaculties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const data = await getAllFaculties();

                setFaculties(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching faculties:", err);
                setError(t('faculties.errorLoading'));
                setLoading(false);
            }
        };

        fetchFaculties();
    }, [t]);

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-100">
                <div className="relative h-[60vh] min-h-[500px] bg-gradient-to-r from-primary-900 to-primary-800 animate-pulse">
                    <div className="container mx-auto px-4 h-full flex items-center">
                        <div className="space-y-4">
                            <div className="h-12 bg-white/10 rounded w-64"></div>
                            <div className="h-8 bg-white/10 rounded w-96"></div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 -mt-20 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-theme-card rounded-2xl p-8 shadow-lg animate-pulse border border-theme-border">
                                <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-xl mb-6"></div>
                                <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-6"></div>
                                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-surface-100 flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary mb-2">{t('faculties.errorTitle')}</h2>
                    <p className="text-text-secondary mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-primary-500 text-white rounded-full font-bold hover:bg-primary-600 transition-colors shadow-lg hover:shadow-primary-500/20"
                    >
                        {t('faculties.retry')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-100 font-sans">
            {/* Hero Section */}
            <div className="relative h-[40vh] min-h-[100px] overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/70" />
                </div>
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-32 left-4 md:left-8 text-white/80 hover:text-white flex items-center gap-2 transition-colors group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t('common.backToHome')}
                    </button>
                </div>
            </div>

            {/* Faculties Grid */}
            <div className="container mx-auto px-4 -mt-20 relative z-10 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {faculties.map((faculty, idx) => {
                        const coverImageUrl = getImageUrl(faculty.cover_image_url);
                        
                        return (
                            <div
                                key={faculty.id}
                                className="group bg-theme-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-theme-border animate-fade-in-up"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {/* Faculty Image/Gradient */}
                                <div className="relative h-48 overflow-hidden">
                                    {coverImageUrl ? (
                                        <img
                                            src={coverImageUrl}
                                            alt={faculty.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => {
                                                console.error('Image failed to load:', coverImageUrl);
                                                e.target.style.display = 'none';
                                                e.target.parentElement.innerHTML = `
                                                    <div class="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                        </svg>
                                                    </div>
                                                `;
                                            }}
                                        />
                                    ) : (
                                        <div className={`w-full h-full bg-gradient-to-br ${
                                            idx % 6 === 0 ? 'from-blue-500 to-indigo-600' :
                                            idx % 6 === 1 ? 'from-purple-500 to-pink-600' :
                                            idx % 6 === 2 ? 'from-green-500 to-teal-600' :
                                            idx % 6 === 3 ? 'from-orange-500 to-red-600' :
                                            idx % 6 === 4 ? 'from-cyan-500 to-blue-600' :
                                            'from-violet-500 to-purple-600'
                                        } group-hover:scale-110 transition-transform duration-700 flex items-center justify-center`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                </div>

                                {/* Faculty Content */}
                                <div className="p-8">
                                    <h2 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-primary-500 transition-colors line-clamp-2">
                                        {faculty.name}
                                    </h2>
                                    
                                    {faculty.dean_name && (
                                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-theme-border">
                                            <div className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center text-primary-600 shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-xs text-text-secondary uppercase tracking-wider">{t('faculties.dean')}</p>
                                                <p className="text-sm font-semibold text-text-primary">{faculty.dean_name}</p>
                                            </div>
                                        </div>
                                    )}

                                    {faculty.short_description && (
                                        <div className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                                            {faculty.short_description}
                                        </div>
                                    )}

                                    <button
                                        onClick={() => navigate(`/faculty-detail/${faculty.id}`)}
                                        className="w-full py-3 bg-primary-500 text-white rounded-xl font-bold hover:bg-primary-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-md hover:shadow-xl"
                                    >
                                        {t('common.readMore')}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {faculties.length === 0 && (
                    <div className="text-center py-24">
                        <div className="w-20 h-20 bg-surface-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-text-primary mb-2">{t('faculties.notFound')}</h3>
                        <p className="text-text-secondary">{t('faculties.noData')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FacultiesPage;