import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getProjectDetail } from '../api/collaborationApi';
import RichTextRenderer from './common/RichTextRenderer';
import { useLanguage } from '../context/LanguageContext';

const ProjectDetail = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const data = await getProjectDetail(slug);
                setProject(data);
            } catch (err) {
                setError("Loyiha topilmadi");
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

    if (error || !project) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
                <p className="text-red-500">{error || t('common.error404.title')}</p>
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
                        <button onClick={() => navigate('/')} className="hover:text-primary-600 transition-colors">{t('common.error404.btn')}</button>
                        <span className="text-slate-300 mx-1">/</span>
                        <button onClick={() => navigate('/international')} className="hover:text-primary-600 transition-colors">{t('footer.links.international')}</button>
                        {project.collaboration_type_slug && (
                            <>
                                <span className="text-slate-300 mx-1">/</span>
                                <button
                                    onClick={() => navigate(`/collaboration-type/${project.collaboration_type_slug}`)}
                                    className="hover:text-primary-600 transition-colors"
                                >
                                    {project.collaboration_type_title}
                                </button>
                            </>
                        )}
                        <span className="text-slate-300 mx-1">/</span>
                        <span className="text-slate-800 font-semibold truncate max-w-[200px]">{project.title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-5xl py-10">
                {/* Cover Image */}
                {project.cover_image_url && (
                    <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
                        <img
                            src={project.cover_image_url}
                            alt={project.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                    </div>
                )}

                {/* Title & Meta */}
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">{project.title}</h1>

                <div className="flex flex-wrap items-center gap-4 mb-8">
                    {(project.start_date || project.end_date) && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 dark:bg-slate-800/40 px-4 py-2 rounded-lg">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>
                                {project.start_date && project.start_date}
                                {project.start_date && project.end_date && ' — '}
                                {project.end_date && project.end_date}
                            </span>
                        </div>
                    )}

                    {project.external_link && (
                        <a
                            href={project.external_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-primary-600 bg-primary-50 px-4 py-2 rounded-lg hover:bg-primary-100 transition-colors font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Tashqi sahifa
                        </a>
                    )}

                    {project.collaboration_type_title && (
                        <button
                            onClick={() => navigate(`/collaboration-type/${project.collaboration_type_slug}`)}
                            className="inline-flex items-center gap-2 text-sm text-slate-500 bg-slate-50 dark:bg-slate-800/40 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            {project.collaboration_type_title}
                        </button>
                    )}
                </div>

                {/* Content */}
                {project.content && (
                    <RichTextRenderer
                        content={project.content}
                        className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-12"
                    />
                )}

                {/* Linked Partners */}
                {project.partners && project.partners.length > 0 && (
                    <div className="border-t border-slate-100 pt-8">
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-5 flex items-center gap-2">
                            <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {t('footer.links.departments')}
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.partners.map((partner) => (
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
                                            <span className="text-primary-600 font-bold">
                                                {partner.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-700 group-hover:text-primary-700 transition-colors line-clamp-2">
                                            {partner.name}
                                        </p>
                                        {partner.country && (
                                            <p className="text-xs text-slate-400 mt-0.5">{partner.country}</p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetail;
