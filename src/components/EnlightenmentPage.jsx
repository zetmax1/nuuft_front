import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from './common/Image';
import RichTextRenderer from './common/RichTextRenderer';
import { getEnlightenmentSections, getClubs } from '../api/enlightenmentApi';
import { useLanguage } from '../context/LanguageContext';

const EnlightenmentPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [sections, setSections] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [sectionsData, clubsData] = await Promise.all([
                getEnlightenmentSections().catch(() => []),
                getClubs().catch(() => [])
            ]);
            setSections(sectionsData && sectionsData.length > 0 ? sectionsData : t('enlightenment.fallbackSections', { returnObjects: true }));
            setClubs(clubsData && clubsData.length > 0 ? clubsData : t('enlightenment.fallbackClubs', { returnObjects: true }));
        } catch {
            setSections(t('enlightenment.fallbackSections', { returnObjects: true }));
            setClubs(t('enlightenment.fallbackClubs', { returnObjects: true }));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 font-sans selection:bg-blue-900 selection:text-white pb-24">
            {/* Minimalist Header */}
            <header className="relative pt-36 pb-16">
                <div className="container mx-auto px-6 max-w-6xl">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors mb-12 mt-4 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('common.backToHome')}
                    </button>
                    
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tighter">
                            {t('enlightenment.pageTitle')}
                        </h1>
                        
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium italic">
                            {t('enlightenment.pageSubtitle')}
                        </p>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    /* Content Layout */
                    <div className="space-y-24">
                        {/* Dynamic Sections */}
                        {sections.map((section, idx) => (
                            <section key={section.id || idx} className="animate-fade-in-up">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-1.5 bg-blue-600 rounded-full"></div>
                                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                        {section.title}
                                    </h2>
                                </div>
                                
                                <div className={`flex flex-col ${section.cover_image_url ? 'lg:flex-row' : ''} gap-12 items-start`}>
                                    {section.content && (
                                        <RichTextRenderer
                                            content={section.content}
                                            className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium prose prose-lg dark:prose-invert max-w-none text-justify ${section.cover_image_url ? 'lg:w-1/2' : 'w-full'}`}
                                        />
                                    )}

                                    {section.cover_image_url && (
                                        <div className="w-full lg:w-1/2">
                                            <Image 
                                                src={section.cover_image_url}
                                                alt={section.title}
                                                className="w-full h-[400px] object-cover rounded-[2rem] shadow-xl"
                                            />
                                        </div>
                                    )}
                                </div>
                            </section>
                        ))}

                        {/* Clubs Section */}
                        <section className="animate-fade-in-up">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-1.5 bg-blue-600 rounded-full"></div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                    {t('enlightenment.clubsTitle')}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                                {clubs.map((club, cIdx) => (
                                    <div 
                                        key={club.id || cIdx} 
                                        onClick={() => navigate(`/club/${club.slug}`)}
                                        className="bg-white dark:bg-slate-800/50 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all group overflow-hidden relative cursor-pointer hover:scale-[1.02]"
                                    >
                                        <div className="absolute top-0 right-0 p-6 text-6xl opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-125 group-hover:-rotate-12">
                                            {club.icon}
                                        </div>
                                        <div className="text-3xl mb-6">{club.icon}</div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tighter">{club.name}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{club.description}</p>
                                        <div className="mt-6 flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                            {t('common.more')}
                                            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </div>

            {/* Quote Section */}
            <div className="mt-32 py-24 bg-primary-600 relative overflow-hidden text-center text-white">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <span className="text-6xl mb-8 block opacity-30 font-serif font-black">"</span>
                    <p className="text-2xl md:text-4xl font-black max-w-4xl mx-auto leading-tight tracking-tighter mb-12">
                        {t('enlightenment.quote')}
                    </p>
                    <div className="w-20 h-1 bg-white/30 mx-auto rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default EnlightenmentPage;
