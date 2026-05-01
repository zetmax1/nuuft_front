import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import Image from './common/Image';
import RichTextRenderer from './common/RichTextRenderer';
import { getClubDetail } from '../api/enlightenmentApi';

const ClubDetailPage = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { t } = useLanguage();
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchClub();
    }, [slug]);

    const fetchClub = async () => {
        try {
            setLoading(true);
            const data = await getClubDetail(slug);
            setClub(data);
        } catch (err) {
            setError(t('enlightenment.clubDetail.notFound'));
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-100 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error || !club) {
        return (
            <div className="min-h-screen bg-surface-100 flex flex-col items-center justify-center gap-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">{error || t('enlightenment.clubDetail.notFound')}</h2>
                <button
                    onClick={() => navigate('/enlightenment')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                >
                    {t('common.back')}
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 font-sans selection:bg-blue-900 selection:text-white pb-24">
            {/* Header */}
            <header className="relative pt-36 pb-16">
                <div className="container mx-auto px-6 max-w-6xl">
                    <button
                        onClick={() => navigate('/enlightenment')}
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors mb-12 mt-4 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        {t('enlightenment.clubDetail.back')}
                    </button>
                    
                    <div className="text-center">
                        {club.icon && (
                            <div className="text-6xl mb-6">{club.icon}</div>
                        )}
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tighter">
                            {club.name}
                        </h1>
                        
                        {club.description && (
                            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium italic">
                                "{club.description}"
                            </p>
                        )}
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className={`flex flex-col ${club.cover_image_url ? 'lg:flex-row' : ''} gap-12 items-start`}>
                    {/* Content */}
                    {club.content && (
                        <div className={`w-full ${club.cover_image_url ? 'lg:w-1/2' : ''}`}>
                            <RichTextRenderer
                                content={club.content}
                                className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed text-justify
                                    prose-headings:text-slate-900 prose-headings:dark:text-white prose-headings:font-black prose-headings:tracking-tight prose-headings:text-left
                                    prose-a:text-blue-600 prose-a:dark:text-blue-400
                                    prose-img:rounded-2xl prose-img:shadow-lg"
                            />
                        </div>
                    )}

                    {/* Cover Image */}
                    {club.cover_image_url && (
                        <div className="w-full lg:w-1/2">
                            <Image 
                                src={club.cover_image_url}
                                alt={club.name}
                                className="w-full h-[400px] object-cover rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClubDetailPage;
