import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCollaborationTypeDetail } from '../api/collaborationApi';
import RichTextRenderer from './common/RichTextRenderer';
import { useLanguage } from '../context/LanguageContext';

const CollaborationTypeDetail = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { slug } = useParams();
    const [type, setType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const data = await getCollaborationTypeDetail(slug);
                setType(data);
            } catch (err) {
                setError(t('admission.error'));
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
        window.scrollTo(0, 0);
    }, [slug]);

    // Group partners by country
    const groupByCountry = (partners) => {
        const groups = {};
        partners.forEach((partner) => {
            const country = partner.country || t('common.more');
            if (!groups[country]) groups[country] = [];
            groups[country].push(partner);
        });
        // Sort country names
        return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error || !type) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
                <p className="text-red-500">{error || t('common.error404.title')}</p>
                <button onClick={() => navigate('/international')} className="text-primary-600 underline font-medium">{t('common.back')}</button>
            </div>
        );
    }

    const partnerGroups = groupByCountry(type.partners || []);

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 animate-fade-in lg:pt-[115px] pt-20">
            {/* Breadcrumb */}
            <div className="border-b border-slate-200 dark:border-slate-700">
                <div className="container mx-auto px-4 md:px-8 max-w-5xl py-3">
                    <nav className="flex items-center text-sm text-slate-500 gap-1 overflow-x-auto whitespace-nowrap">
                        <button onClick={() => navigate('/')} className="hover:text-primary-600 transition-colors">{t('common.error404.btn')}</button>
                        <span className="text-slate-300 mx-1">/</span>
                        <button onClick={() => navigate('/international')} className="hover:text-primary-600 transition-colors">{t('footer.links.international')}</button>
                        <span className="text-slate-300 mx-1">/</span>
                        <span className="text-slate-800 font-semibold">{type.title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-5xl py-10">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                    {type.icon && <span className="text-3xl mt-1">{type.icon}</span>}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200">{type.title}</h1>
                        <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 dark:text-slate-400">
                            {type.partners && type.partners.length > 0 && (
                                <span>{type.partners.length} ta hamkor tashkilot</span>
                            )}
                            {type.projects && type.projects.length > 0 && (
                                <span>{type.projects.length} ta loyiha</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description */}
                {type.description && (
                    <RichTextRenderer
                        content={type.description}
                        className="prose prose-slate max-w-none mt-4 mb-10 text-slate-600 leading-relaxed"
                    />
                )}

                {/* Pages (sub-sections) */}
                {type.pages && type.pages.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            Sahifalar
                        </h2>
                        <div className="divide-y divide-slate-200 border-t border-b border-slate-200 dark:border-slate-700">
                            {type.pages.map((page) => (
                                <button
                                    key={page.id}
                                    onClick={() => navigate(`/collaboration-page/${slug}/${page.slug}`)}
                                    className="w-full flex items-center justify-between py-4 px-2 md:px-4 text-left hover:bg-slate-50 transition-colors group"
                                >
                                    <div>
                                        <h3 className="text-base md:text-lg font-medium text-slate-800 group-hover:text-primary-600 transition-colors">
                                            {page.title}
                                        </h3>
                                        {page.has_children && (
                                            <span className="text-sm text-slate-400">Ichki sahifalar mavjud</span>
                                        )}
                                    </div>
                                    <svg className="w-5 h-5 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Partners by Country */}
                {partnerGroups.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {t('footer.links.departments')}
                        </h2>

                        <div className="space-y-8">
                            {partnerGroups.map(([country, countryPartners]) => (
                                <div key={country}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">{country}</h3>
                                        <span className="bg-slate-100 text-slate-500 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            {countryPartners.length}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {countryPartners.map((partner) => (
                                            <button
                                                key={partner.id}
                                                onClick={() => navigate(`/partner-detail/${partner.slug}`)}
                                                className="group flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl hover:bg-primary-50 hover:shadow-md transition-all duration-200 text-left border border-transparent hover:border-primary-200"
                                            >
                                                {partner.logo_url ? (
                                                    <img
                                                        src={partner.logo_url}
                                                        alt={partner.name}
                                                        className="w-12 h-12 object-contain rounded-lg flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-primary-600 font-bold text-base">
                                                            {partner.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors line-clamp-2">
                                                        {partner.name}
                                                    </p>
                                                    {partner.website && (
                                                        <p className="text-xs text-slate-400 mt-0.5 truncate">{partner.website.replace(/^https?:\/\//, '')}</p>
                                                    )}
                                                </div>
                                                <svg className="w-4 h-4 text-slate-300 group-hover:text-primary-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {type.projects && type.projects.length > 0 && (
                    <div className="mt-14">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Loyihalar va Dasturlar
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {type.projects.map((project) => (
                                <button
                                    key={project.id}
                                    onClick={() => navigate(`/project-detail/${project.slug}`)}
                                    className="group text-left bg-white dark:bg-slate-800/60 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary-200"
                                >
                                    {project.cover_image_url && (
                                        <div className="h-40 overflow-hidden">
                                            <img
                                                src={project.cover_image_url}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <h3 className="text-base font-semibold text-slate-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                                            {project.title}
                                        </h3>
                                        {(project.start_date || project.end_date) && (
                                            <p className="text-sm text-slate-400 mt-2 flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                {project.start_date && project.start_date}
                                                {project.start_date && project.end_date && ' — '}
                                                {project.end_date && project.end_date}
                                            </p>
                                        )}
                                        {project.external_link && (
                                            <p className="text-xs text-primary-500 mt-2 truncate">
                                                {project.external_link.replace(/^https?:\/\//, '')}
                                            </p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty state */}
                {(!type.partners || type.partners.length === 0) && (!type.projects || type.projects.length === 0) && (
                    <p className="text-slate-500 py-8">{t('common.noData')}</p>
                )}
            </div>
        </div>
    );
};

export default CollaborationTypeDetail;
