import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFeaturesData } from '../data/features.jsx';
import { useLanguage } from '../context/LanguageContext';
import Image from './common/Image';

const FeatureDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { t } = useLanguage();
    
    const featuresData = getFeaturesData(t);
    const feature = featuresData.find(item => item.id === id);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        if (!feature?.images?.length) return;
        const interval = setInterval(() => {
            setActiveImage(prev => (prev + 1) % feature.images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [feature]);

    if (!feature) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-100">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-text-primary mb-4">{t('science.detail.notFound') || "Ma'lumot topilmadi"}</h2>
                    <button onClick={() => navigate('/')} className="text-primary-600 font-bold hover:underline">
                        {t('common.backToHome') || "Orqaga qaytish"}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 font-sans text-text-primary overflow-x-hidden">
            {/* Background Narrative Title (Floating) */}
            <div className="fixed inset-0 flex items-center justify-center z-0 opacity-10 pointer-events-none overflow-hidden">
                <h2 className="text-bg-reveal whitespace-nowrap uppercase transform -rotate-12 translate-x-1/4">
                    {feature.title} • {feature.title} • {feature.title}
                </h2>
            </div>

            {/* Navigation Overlay */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference text-white">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-4 group"
                >
                    <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                    <span className="font-bold uppercase tracking-widest text-xs hidden md:block">{t('common.backToHome') || "Orqaga qaytish"}</span>
                </button>

                <div className="flex items-center gap-6">
                    <span className="text-xs font-black tracking-widest uppercase opacity-50">JBNUU • 2025</span>
                </div>
            </nav>

            <div className="relative z-10">
                {/* Hero Section */}
                <header className="min-h-screen flex flex-col lg:flex-row">
                    {/* Visual Area (Sticky on Desktop) */}
                    <div className="w-full lg:w-1/2 h-[70vh] lg:h-screen sticky top-0 overflow-hidden bg-slate-100">
                        {feature.images?.map((img, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${idx === activeImage ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
                            >
                                <Image
                                    src={img}
                                    alt={`${feature.title} ${idx}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent"></div>
                            </div>
                        ))}

                        {/* Progress Indicator */}
                        <div className="absolute bottom-12 left-12 flex flex-col gap-4">
                            {feature.images?.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`h-12 w-1 transition-all duration-500 rounded-full ${idx === activeImage ? 'bg-white h-20' : 'bg-white/30 hover:bg-white/60'}`}
                                ></button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="w-full lg:w-1/2 bg-white px-8 md:px-16 lg:px-24 py-24 md:py-40 flex flex-col justify-center">
                        <div className="animate-fade-in-up">
                            <div className="flex items-center gap-4 mb-8 text-primary-600">
                                <span className="text-4xl">{feature.icon}</span>
                                <div className="h-0.5 w-12 bg-primary-600"></div>
                                <span className="text-xs font-black uppercase tracking-[0.4em]">{t('features.tag')}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-[1] tracking-tighter">
                                {feature.title}
                            </h1>

                            <div className="max-w-2xl">
                                <p className="text-lg md:text-xl text-slate-800 font-medium leading-relaxed mb-12 italic border-l-4 border-primary-500 pl-6">
                                    {feature.text}
                                </p>

                                <div className="prose prose-slate prose-lg text-slate-600 leading-[1.7] font-normal">
                                    {feature.fullText.split('\n\n').map((paragraph, pIdx) => {
                                        if (paragraph.startsWith('###')) {
                                            return <h3 key={pIdx} className="text-xl md:text-2xl font-bold text-text-primary mt-12 mb-6 uppercase tracking-tight">{paragraph.replace('###', '').trim()}</h3>;
                                        }
                                        if (paragraph.startsWith('-')) {
                                            return (
                                                <ul key={pIdx} className="space-y-3 my-8">
                                                    {paragraph.split('\n').map((item, iIdx) => (
                                                        <li key={iIdx} className="flex items-start gap-3">
                                                            <span className="w-5 h-5 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mt-1 flex-shrink-0">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            </span>
                                                            <span className="text-base">{item.replace('-', '').trim()}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        return <p key={pIdx} className="mb-6">{paragraph}</p>;
                                    })}
                                </div>

                                <div className="mt-20 pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <button
                                        onClick={() => navigate('/')}
                                        className="group flex items-center gap-6 px-10 py-5 bg-black text-white rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-primary-600 transition-all shadow-2xl"
                                    >
                                        {t('common.backToHome') || "Asosiy sahifa"}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>

                                    <div className="flex gap-4">
                                        <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                            </svg>
                                        </button>
                                        <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Optional Footer/Next section indicator */}
                <div className="p-12 text-center text-slate-300 font-bold uppercase tracking-[1em] text-[10px]">
                    Mirzo Ulug'bek Nomidagi O'zMU Jizzax Filiali
                </div>
            </div>
        </div>
    );
};

export default FeatureDetail;
