import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Image from './common/Image';
import jbnuuBuilding from '../assets/jbnuu-building.png';
import { useLanguage } from '../context/LanguageContext';

// Import custom history images
import img1 from '../assets/about/img-1.jpg';
import img2 from '../assets/about/img-2.jpg';
import img3 from '../assets/about/img-3.jpg';
import img4 from '../assets/about/img-4.jpg';
import img5 from '../assets/about/img-5.jpg';
import jizzaxFilialiImg from '../assets/about/jizzax filiali.jpg';

const AboutPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const timelineTexts = t('about.timeline');
    const historyData = Array.isArray(timelineTexts) && timelineTexts.length === 6 ? [
        { ...timelineTexts[0], image: img1 },
        { ...timelineTexts[1], image: img2 },
        { ...timelineTexts[2], image: img3 },
        { ...timelineTexts[3], image: img4 },
        { ...timelineTexts[4], image: img5 },
        { ...timelineTexts[5], image: jizzaxFilialiImg }
    ] : [];

    return (
        <div className="min-h-screen bg-surface-100 font-serif text-text-primary selection:bg-primary-900 selection:text-white transition-colors duration-300">
            
            {/* Elegant Header Section */}
            <header className="relative pt-24 pb-12 border-b border-slate-200 dark:border-slate-800 bg-surface-100 dark:bg-slate-900/40">
                <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
                    <button
                        onClick={() => navigate('/')}
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-900 dark:hover:text-primary-400 transition-colors uppercase tracking-widest text-xs font-bold mb-8 group"
                    >
                        <span className="w-6 h-px bg-slate-400 dark:bg-slate-600 group-hover:bg-primary-900 dark:group-hover:bg-primary-400 transition-colors"></span>
                        {t('common.backToHome')}
                    </button>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
                        {t('about.pageTitle')}
                    </h1>
                    <div className="w-24 h-1 bg-primary-900 mx-auto mb-8"></div>
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-sans font-light">
                        {t('about.pageSubtitle')}
                    </p>
                </div>
            </header>

            {/* Historical Timeline - Formal Side-by-Side Style */}
            <section className="py-12 md:py-16 bg-surface-100">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-xs font-bold tracking-[0.3em] text-primary-900 uppercase mb-4">{t('about.chronology')}</h2>
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">{t('about.developmentStages')}</h3>
                        <div className="w-16 h-px bg-slate-300 dark:bg-slate-700 mx-auto"></div>
                    </div>

                    <div className="relative">
                        {/* Vertical Connector Line (Desktop) */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 hidden lg:block -translate-x-1/2"></div>

                        <div className="space-y-12 lg:space-y-0">
                            {historyData.map((item, idx) => (
                                <article key={idx} className={`relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''} lg:pb-24 last:pb-0`}>
                                    
                                    {/* Small Dot Connector (Desktop) */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-900/10 border-2 border-surface-100 ring-2 ring-primary-900/10 hidden lg:block z-20"></div>

                                    {/* Image Side */}
                                    <div className="w-full lg:w-1/2">
                                        <div className="relative group overflow-hidden rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                                            <img 
                                                src={item.image} 
                                                alt={item.title}
                                                className="w-full h-[300px] md:h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                            />
                                            {/* <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest text-slate-500 dark:text-slate-400 uppercase rounded border border-slate-100 dark:border-slate-800">
                                                Tarixiy Tasvir
                                            </div> */}
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                                        <div className="inline-block px-3 py-1 bg-surface-100 dark:bg-slate-900 text-primary-900 dark:text-primary-400 font-bold tracking-widest text-[11px] mb-4 border border-slate-100 dark:border-slate-800 uppercase">
                                            {item.period}
                                        </div>
                                        <h4 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight mb-4">
                                            {item.title}
                                        </h4>
                                        <div className="font-sans text-slate-600 dark:text-slate-400 leading-relaxed text-[15px] max-w-xl">
                                            {item.content.split('\n\n').map((para, pIdx) => (
                                                <p key={pIdx} className="mb-3 last:mb-0">
                                                    {para}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
