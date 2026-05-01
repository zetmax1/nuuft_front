import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import scienceApi from '../api/scienceApi';
import Image from './common/Image';
import RichTextRenderer from './common/RichTextRenderer';
import { useLanguage } from '../context/LanguageContext';

const ResearchDetail = () => {
    const { id } = useParams(); // id is the slug
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [area, setArea] = useState(null);
    const [loading, setLoading] = useState(true);

    const ArrowLeft = () => (
        <svg className="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const data = await scienceApi.getDetail(id);
                setArea(data);
            } catch (error) {
                console.error('Error fetching research detail:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-surface-100 flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div></div>;

    if (!area) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-100">
                <div className="text-center">
                    <h2 className="text-3xl font-black mb-4">{t('science.notFoundTitle')}</h2>
                    <button onClick={() => navigate('/science')} className="text-primary-600 font-bold hover:underline">{t('common.goBack')}</button>
                </div>
            </div>
        );
    }

    const detail = area.details;

    const colorClasses = "text-blue-600 bg-blue-50 border-blue-100";

    const stats = [
        { label: detail?.stat1_label || t('science.stat1'), value: detail?.stat1_value || "0" },
        { label: detail?.stat2_label || t('science.stat2'), value: detail?.stat2_value || "0" },
        { label: detail?.stat3_label || t('science.stat3'), value: detail?.stat3_value || "0" }
    ];

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 font-serif selection:bg-primary-900 selection:text-white pb-24">
            {/* Header / Hero - Blended background */}
            <header className="relative pt-34 pb-12">
                <div className="container mx-auto px-6 max-w-6xl">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-primary-600 transition-colors uppercase tracking-[0.2em] text-[10px] font-black mb-8 group bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
                    >
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                        {t('common.goBack')}
                    </button>
                    
                    <div className={`inline-block px-3 py-1 rounded border ${colorClasses} text-[10px] font-black uppercase tracking-[0.2em] mb-6 font-sans`}>
                        {detail?.subtitle || area.title}
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-[1.1] tracking-tight">
                        {area.title}
                    </h1>
                    
                    {area.description && (
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed font-sans font-light italic">
                            "{area.description}"
                        </p>
                    )}
                </div>
            </header>

            <div className="container mx-auto px-6 max-w-6xl -mt-6 relative z-10">
                {/* Single Unified Alignment-focused layout */}
                <div className="md:px-0">
                    
                    {/* Top Row: Image & Stats - Even tighter proportions */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-12">
                        {/* Image Section (9/12) */}
                        <div className="lg:col-span-9">
                            {detail?.main_image_url ? (
                                <Image 
                                    src={detail.main_image_url} 
                                    alt={area.title}
                                    className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800"
                                />
                            ) : (
                                <div className="w-full h-[400px] md:h-[500px] bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-slate-300 dark:text-slate-600 font-sans italic border-2 border-dashed border-slate-100 dark:border-slate-800">
                                    {t('science.noImage')}
                                </div>
                            )}
                        </div>

                        {/* Statistics Section (3/12) - Even more compact */}
                        <div className="lg:col-span-3">
                            <div className="bg-primary-900 h-full p-5 md:p-6 rounded-[1rem] text-white shadow-xl relative overflow-hidden group flex flex-col justify-center">
                                <div className="absolute -right-10 -bottom-10 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                
                                <h4 className="text-[8px] font-black uppercase tracking-[0.4em] text-primary-300 mb-6 border-b border-white/10 pb-3">
                                    {t('science.scientificStats')}
                                </h4>
                                
                                <div className="space-y-6 relative z-10">
                                    {stats.map((stat, idx) => (
                                        <div key={idx} className="group/stat">
                                            <div className="text-2xl font-black mb-1 font-sans tracking-tight group-hover/stat:translate-x-1 transition-transform origin-left">{stat.value}</div>
                                            <div className="text-[9px] font-bold uppercase tracking-widest text-primary-200/50 leading-tight">{stat.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row: Full Description - Aligned with image and widened */}
                    <div className="pt-8">
                        <div className="max-w-none">
                            <div className="flex items-center gap-4 mb-10 pl-0">
                                <div className="w-12 h-1 bg-primary-500 rounded-full"></div>
                                <h3 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-[0.3em] font-sans">
                                    {t('science.detailedInfo')}
                                </h3>
                            </div>
                            
                            <RichTextRenderer
                                content={detail?.content || ""}
                                className="prose prose-xl prose-slate dark:prose-invert max-w-6xl 
                                    prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900 dark:prose-headings:text-white
                                    prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:font-sans
                                    prose-li:text-slate-600 dark:prose-li:text-slate-400 prose-li:font-sans
                                    prose-strong:text-slate-900 dark:prose-strong:text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResearchDetail;





