import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Image from './common/Image';
import scienceHeroBg from '../assets/hero-bg.png';
import scienceApi from '../api/scienceApi';
import Pagination from './common/Pagination';
import { useLanguage } from '../context/LanguageContext';

const STATIC_ICON = (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
);

const STATIC_THEME = "from-blue-500 to-indigo-600";

const SciencePage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [indexData, setIndexData] = useState(null);
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [hasNext, setHasNext] = useState(false);
    const [hasPrevious, setHasPrevious] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const indexRes = await scienceApi.getIndex();
            setIndexData(indexRes);
            
            const areasRes = await scienceApi.getAreas(currentPage);
            setAreas(areasRes.results || areasRes);
            
            // Handle pagination metadata
            if (areasRes.count) {
                setTotalPages(Math.ceil(areasRes.count / 10)); // Assuming 10 per page consistent with News
                setHasNext(!!areasRes.next);
                setHasPrevious(!!areasRes.previous);
            }
        } catch (error) {
            console.error('Error fetching science data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <div className="min-h-screen bg-surface-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>;

    const stats = [
        { label: indexData?.stat1_label || t('science.stats.staff'), value: indexData?.stat1_value || "150+" },
        { label: indexData?.stat2_label || t('science.stats.publications'), value: indexData?.stat2_value || "200+" },
        { label: indexData?.stat3_label || t('science.stats.projects'), value: indexData?.stat3_value || "45+" },
        { label: indexData?.stat4_label || t('science.stats.cooperation'), value: indexData?.stat4_value || "20+" }
    ];

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 font-sans selection:bg-primary-500 selection:text-white">
            {/* Immersive Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={indexData?.cover_image_url || scienceHeroBg}
                        alt="Ilmiy tadqiqotlar"
                        className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-80 dark:opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-surface-100 dark:to-slate-900"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-12 hover:bg-white/20 transition-all active:scale-95"
                    >
                        ← {t('common.backToHome')}
                    </button>
                    
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tighter">
                        {indexData?.title || t('science.pageTitle')}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
                        {indexData?.description || t('science.pageSubtitle')}
                    </p>
                </div>
            </section>

            {/* Stats Bar */}
            <div className="container mx-auto px-6 -mt-16 relative z-20">
                <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-700 p-8 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 backdrop-blur-xl bg-white/90 dark:bg-slate-800/90">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="text-center group">
                            <div className="text-3xl md:text-4xl font-black text-primary-600 dark:text-primary-400 mb-2 group-hover:scale-110 transition-transform">{stat.value}</div>
                            <div className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Research Areas Grid */}
            <section className="py-24 md:py-32 bg-surface-100">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mb-20">
                        <span className="text-primary-500 font-black tracking-[0.3em] uppercase text-xs mb-4 block">{t('science.researchAreas')}</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">{t('science.researchTitle')}</h2>
                        <div className="w-20 h-1.5 bg-primary-500 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {areas.length > 0 ? (
                            areas.map((area, idx) => (
                                <div 
                                    key={idx} 
                                    onClick={() => navigate(`/research-detail/${area.slug}`)}
                                    className="group relative bg-white dark:bg-slate-800/50 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden flex flex-col gap-6"
                                >
                                    {/* Background Decorative Gradient */}
                                    <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${STATIC_THEME} opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl -mr-24 -mt-24`}></div>

                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${STATIC_THEME} shadow-lg flex items-center justify-center text-white flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                        <div className="scale-75">{STATIC_ICON}</div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors uppercase mb-3">{area.title}</h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3 h-[4rem]">
                                            {area.description}
                                        </p>
                                        <div className="mt-auto flex items-center gap-3 text-primary-600 dark:text-primary-400 font-black uppercase text-[10px] tracking-[0.2em] group-hover:gap-5 transition-all">
                                            {t('common.readMore')}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center bg-white dark:bg-slate-800/50 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-700">
                                <p className="text-slate-500 dark:text-slate-400 text-lg font-sans">{t('science.emptyAreas')}</p>
                                <p className="text-slate-400 dark:text-slate-500 text-sm mt-2">{t('science.emptySuggestion')}</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-16">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                hasNext={hasNext}
                                hasPrevious={hasPrevious}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter/Action Section */}
            <section className="py-24 bg-primary-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">{t('science.collabTitle')}</h2>
                    <p className="text-white/70 max-w-2xl mx-auto mb-12 text-lg font-light leading-relaxed">
                        {t('science.collabText')}
                    </p>
                    <button className="px-10 py-5 bg-white text-primary-900 hover:bg-primary-50 rounded-2xl font-black uppercase tracking-[0.1em] text-xs transition-all shadow-2xl hover:-translate-y-1 active:scale-95">
                        {t('science.contactUs')}
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SciencePage;
;
