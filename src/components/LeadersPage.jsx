import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getLeaders, getLeaderImageUrl } from '../api/leadersApi';
import RichTextRenderer from './common/RichTextRenderer';

const LeadersPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaders = async () => {
            try {
                setLoading(true);
                const data = await getLeaders();
                const results = data.results || data;
                setLeaders(Array.isArray(results) ? results : []);
            } catch (err) {
                setError(t('leaders.loading'));
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-100 font-sans">
                <div className="container mx-auto px-4 md:px-8 py-8">
                    <div className="h-5 w-72 bg-slate-200 rounded animate-pulse mb-6"></div>
                    <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-10"></div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-white rounded-xl p-8 mb-6 animate-pulse">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="w-[220px] h-[280px] bg-slate-200 rounded-lg flex-shrink-0"></div>
                                <div className="flex-1 space-y-4 py-3">
                                    <div className="h-5 w-3/4 bg-slate-200 rounded"></div>
                                    <div className="h-7 w-1/2 bg-slate-200 rounded"></div>
                                    <div className="h-5 w-1/3 bg-slate-100 dark:bg-slate-700 rounded"></div>
                                    <div className="h-5 w-2/5 bg-slate-100 dark:bg-slate-700 rounded"></div>
                                    <div className="h-5 w-1/4 bg-slate-100 dark:bg-slate-700 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-surface-100 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-600 text-lg mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                    >
                        {t('leaders.retry')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-100 font-sans text-slate-800 dark:text-slate-200">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 md:px-8 pt-8 pb-3">
                <nav className="flex items-center gap-2 text-[15px] text-slate-500 flex-wrap">
                    <button onClick={() => navigate('/')} className="hover:text-primary-600 underline transition-colors">
                        {t('leaders.breadcrumbHome')}
                    </button>
                    <span className="text-slate-300">→</span>

                    <span className="text-slate-800 font-semibold">{t('leaders.title')}</span>
                </nav>
            </div>

            {/* Page Title */}
            <div className="container mx-auto px-4 md:px-8 pb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {t('leaders.title')}
                </h1>
                <div className="w-16 h-1 bg-primary-500 rounded-full mt-3"></div>
            </div>

            {/* Leaders List */}
            <div className="container mx-auto px-4 md:px-8 pb-20">
                <div className="space-y-6">
                    {leaders.map((leader) => (
                        <div
                            key={leader.id}
                            className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Photo — fixed dimensions */}
                                <div className="md:w-[240px] flex-shrink-0">
                                    <div className="h-[300px] md:h-full min-h-[300px] overflow-hidden bg-slate-100">
                                        {leader.image_url ? (
                                            <img
                                                src={getLeaderImageUrl(leader.image_url)}
                                                alt={leader.full_name}
                                                className="w-full h-full object-cover object-top"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="flex-1 p-6 md:p-8 lg:p-10 border-l-0 md:border-l-4 border-primary-500 flex flex-col justify-center">
                                    {/* Position */}
                                    <p className="text-slate-600 text-base md:text-lg mb-1 leading-snug">
                                        {leader.position}:
                                    </p>

                                    {/* Full Name */}
                                    <h2 className="text-2xl md:text-3xl font-bold text-primary-600 mb-2 leading-tight">
                                        {leader.full_name}
                                    </h2>

                                    {/* Academic Degree */}
                                    {leader.academic_degree && (
                                        <p className="text-slate-500 text-base md:text-lg italic mb-5">
                                            {leader.academic_degree}
                                        </p>
                                    )}

                                    {/* Contact Details */}
                                    <div className="space-y-2.5 text-base">
                                        {leader.reception_days && (
                                            <p className="text-slate-700 dark:text-slate-300">
                                                <span className="font-bold">{t('leaders.labels.reception')} </span>
                                                {leader.reception_days}
                                            </p>
                                        )}

                                        {leader.phone && (
                                            <p className="text-slate-700 dark:text-slate-300">
                                                <span className="font-bold">{t('leaders.labels.phone')} </span>
                                                <a href={`tel:${leader.phone}`} className="hover:text-primary-600 transition-colors">
                                                    {leader.phone}
                                                </a>
                                            </p>
                                        )}

                                        {leader.email && (
                                            <p className="text-slate-700 dark:text-slate-300">
                                                <span className="font-bold">{t('leaders.labels.email')} </span>
                                                <a
                                                    href={`mailto:${leader.email}`}
                                                    className="text-primary-600 hover:underline transition-colors"
                                                >
                                                    {leader.email}
                                                </a>
                                            </p>
                                        )}
                                    </div>

                                    {/* Bio */}
                                    {leader.bio && (
                                        <RichTextRenderer
                                            content={leader.bio}
                                            className="mt-5 pt-5 border-t border-slate-100 text-slate-600 leading-relaxed prose prose-base max-w-none"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Empty State */}
            {leaders.length === 0 && !loading && (
                <div className="container mx-auto px-4 py-20 text-center">
                    <h3 className="text-xl font-bold text-slate-700 mb-2">{t('leaders.noData')}</h3>
                    <p className="text-slate-500 dark:text-slate-400">{t('leaders.noDataSub')}</p>
                </div>
            )}
        </div>
    );
};

export default LeadersPage;
