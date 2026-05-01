import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPartnerDetail } from '../api/collaborationApi';
import RichTextRenderer from './common/RichTextRenderer';

import { useLanguage } from '../context/LanguageContext';

const PartnerDetail = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { slug } = useParams();
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const data = await getPartnerDetail(slug);
                setPartner(data);
            } catch (err) {
                setError("Hamkor tashkilot topilmadi");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error || !partner) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
                <p className="text-red-500">{error || "Sahifa topilmadi"}</p>
                <button onClick={() => navigate('/international')} className="text-primary-600 underline font-medium">{t('common.back')}</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 animate-fade-in lg:pt-[115px] pt-20">
            {/* Breadcrumb */}
            <div className="border-b border-slate-200 dark:border-slate-700">
                <div className="container mx-auto px-4 md:px-8 max-w-5xl py-3">
                    <nav className="flex items-center text-sm text-slate-500 gap-1 overflow-x-auto whitespace-nowrap">
                        <button onClick={() => navigate('/')} className="hover:text-primary-600 transition-colors">Bosh sahifa</button>
                        <span className="text-slate-300 mx-1">/</span>
                        <button onClick={() => navigate('/international')} className="hover:text-primary-600 transition-colors">Xalqaro Hamkorlik</button>
                        {partner.collaboration_type_slug && (
                            <>
                                <span className="text-slate-300 mx-1">/</span>
                                <button
                                    onClick={() => navigate(`/collaboration-type/${partner.collaboration_type_slug}`)}
                                    className="hover:text-primary-600 transition-colors"
                                >
                                    {partner.collaboration_type_title}
                                </button>
                            </>
                        )}
                        <span className="text-slate-300 mx-1">/</span>
                        <span className="text-slate-800 font-semibold truncate max-w-[200px]">{partner.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-5xl py-10">
                {/* Cover Image Banner */}
                {partner.cover_image_url && (
                    <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
                        <img
                            src={partner.cover_image_url}
                            alt={partner.name}
                            className="w-full h-48 md:h-72 object-cover"
                        />
                    </div>
                )}

                {/* Partner Header */}
                <div className="flex flex-col md:flex-row items-start gap-8 mb-10">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        {partner.logo_url ? (
                            <div className="w-32 h-32 md:w-40 md:h-40 bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 flex items-center justify-center border border-slate-100 dark:border-slate-700/50">
                                <img
                                    src={partner.logo_url}
                                    alt={partner.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ) : (
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                <span className="text-primary-600 font-bold text-5xl">
                                    {partner.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3">{partner.name}</h1>

                        <div className="space-y-2">
                            {partner.country && (
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>{partner.country}</span>
                                </div>
                            )}

                            {partner.collaboration_type_title && (
                                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span>{partner.collaboration_type_title}</span>
                                </div>
                            )}
                        </div>

                        {partner.website && (
                            <a
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 mt-5 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-sm font-medium"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Veb-saytga o'tish
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                {partner.description && (
                    <div className="border-t border-slate-100 pt-8">
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Tashkilot haqida</h2>
                        <RichTextRenderer
                            content={partner.description}
                            className="prose prose-slate max-w-none text-slate-600 leading-relaxed"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartnerDetail;
