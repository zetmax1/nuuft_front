import { useNavigate } from 'react-router-dom';
import React from 'react';
import Image from './common/Image';
import { useLanguage } from '../context/LanguageContext';

const SpiritualityPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-[#fdfdfc] font-sans text-slate-800 dark:text-slate-200">
            {/* Hero Section */}
            <div className="relative pt-32 pb-40 px-4 text-center overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-amber-50 to-transparent rounded-[100%] opacity-60 -z-10"></div>
                <div className="absolute top-20 left-10 w-24 h-24 bg-orange-200 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute top-40 right-10 w-32 h-32 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>

                <div className="container mx-auto relative z-10">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-8 inline-flex items-center gap-2 text-amber-900/60 hover:text-amber-900 font-medium transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t('common.backToHome')}
                    </button>

                    <h1 className="text-5xl md:text-7xl font-serif text-slate-900 dark:text-slate-100 mb-6 tracking-tight">
                        {t('enlightenment.spirituality.pageTitle')}
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light">
                        {t('enlightenment.spirituality.pageSubtitle')}
                    </p>
                </div>
            </div>

            {/* Clubs Showcase */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: t('enlightenment.spirituality.clubs.0.title'),
                            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                            desc: t('enlightenment.spirituality.clubs.0.desc')
                        },
                        {
                            title: t('enlightenment.spirituality.clubs.1.title'),
                            image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                            desc: t('enlightenment.spirituality.clubs.1.desc')
                        },
                        {
                            title: t('enlightenment.spirituality.clubs.2.title'),
                            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                            desc: t('enlightenment.spirituality.clubs.2.desc')
                        }
                    ].map((club, idx) => (
                        <div key={idx} className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer shadow-xl">
                            <img src={club.image} alt={club.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{club.title}</h3>
                                <p className="text-white/80 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    {club.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Latest Events Grid */}
            <div className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">{t('enlightenment.spirituality.eventsTag')}</span>
                        <h2 className="text-3xl md:text-4xl font-serif mt-2">{t('enlightenment.spirituality.eventsTitle')}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-24 text-center">
                                <span className="block text-4xl font-bold text-slate-200">21</span>
                                <span className="block text-sm font-bold text-slate-400 uppercase">{t('common.months.Mart')}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3 hover:text-amber-700 cursor-pointer">{t('enlightenment.spirituality.events.0.title')}</h3>
                                <p className="text-slate-500 leading-relaxed mb-4">
                                    {t('enlightenment.spirituality.events.0.desc')}
                                </p>
                                <a href="#" className="text-amber-600 font-bold text-sm uppercase tracking-wide border-b-2 border-amber-600/20 hover:border-amber-600 pb-1 transition-all">{t('common.readMoreButton')}</a>
                            </div>
                        </div>
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-24 text-center">
                                <span className="block text-4xl font-bold text-slate-200">15</span>
                                <span className="block text-sm font-bold text-slate-400 uppercase">{t('common.months.Fev')}</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3 hover:text-amber-700 cursor-pointer">{t('enlightenment.spirituality.events.1.title')}</h3>
                                <p className="text-slate-500 leading-relaxed mb-4">
                                    {t('enlightenment.spirituality.events.1.desc')}
                                </p>
                                <a href="#" className="text-amber-600 font-bold text-sm uppercase tracking-wide border-b-2 border-amber-600/20 hover:border-amber-600 pb-1 transition-all">{t('common.readMoreButton')}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpiritualityPage;
