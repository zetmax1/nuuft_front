import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getStructureSection, getLeaderImageUrl } from '../api/leadersApi';
import RichTextRenderer from './common/RichTextRenderer';

const StructureDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [section, setSection] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSection = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getStructureSection(slug);
                setSection(data);
            } catch (err) {
                console.error('Error fetching section detail:', err);
                setError(t('structure.error'));
            } finally {
                setLoading(false);
            }
        };
        fetchSection();
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-100 transition-colors duration-300 py-12 font-sans">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse space-y-8">
                        <div className="h-6 bg-slate-100 dark:bg-slate-700 rounded w-1/4"></div>
                        <div className="h-10 bg-slate-100 dark:bg-slate-700 rounded w-2/3"></div>
                        <div className="flex gap-8">
                            <div className="w-52 h-64 bg-slate-100 dark:bg-slate-700 rounded"></div>
                            <div className="flex-1 space-y-4">
                                <div className="h-5 bg-slate-100 dark:bg-slate-700 rounded w-1/3"></div>
                                <div className="h-7 bg-slate-100 dark:bg-slate-700 rounded w-2/3"></div>
                                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/2"></div>
                                <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-1/3"></div>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-full"></div>
                            <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-5/6"></div>
                            <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-4/5"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !section) {
        return (
            <div className="min-h-screen bg-surface-100 flex items-center justify-center">
                <div className="text-center bg-white p-10 rounded-2xl shadow-lg border border-red-100 max-w-md">
                    <p className="text-slate-600 mb-4">{error || t('structure.detail.notFound')}</p>
                    <button
                        onClick={() => navigate('/structure')}
                        className="px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-semibold"
                    >
                        {t('structure.detail.breadcrumb')}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 py-8 md:py-12 font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center gap-2 text-sm">
                        <li>
                            <button
                                onClick={() => navigate('/structure')}
                                className="text-primary-500 hover:text-primary-700 hover:underline transition-colors"
                            >
                                {t('structure.detail.breadcrumb')}
                            </button>
                        </li>
                        <li className="text-slate-300">→</li>
                        <li className="text-slate-500 dark:text-slate-400">{section.name}</li>
                    </ol>
                </nav>

                {/* Section Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 uppercase tracking-wide pb-4 border-b border-slate-200 mb-10">
                    {section.name}
                </h1>

                {/* ===== LEADER SECTION ===== */}
                {section.leader && (
                    <div className="mb-10">
                        <p className="text-slate-500 mb-3 text-[15px]">{t('structure.detail.leaderLabel')}</p>
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                            {/* Photo */}
                            {section.leader.image_url ? (
                                <img
                                    src={getLeaderImageUrl(section.leader.image_url)}
                                    alt={section.leader.full_name}
                                    className="w-48 h-auto object-cover rounded shrink-0 self-start"
                                />
                            ) : (
                                <div className="w-48 h-56 bg-slate-100 dark:bg-slate-700 rounded flex items-center justify-center text-slate-300 shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                            )}

                            {/* Contact Info */}
                            <div className="space-y-3 pt-1">
                                <h2 className="text-xl md:text-2xl font-semibold text-primary-500">
                                    {section.leader.full_name}
                                </h2>

                                {section.leader.position && (
                                    <p className="text-slate-600 dark:text-slate-400">{section.leader.position}</p>
                                )}

                                {section.leader.academic_degree && (
                                    <p className="text-slate-500 text-sm italic">{section.leader.academic_degree}</p>
                                )}

                                {section.leader.reception_days && (
                                    <p className="text-slate-600 text-[15px]">
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{t('structure.detail.receptionLabel')} </span>
                                        {section.leader.reception_days}
                                    </p>
                                )}

                                {section.leader.phone && (
                                    <p className="text-slate-600 text-[15px]">
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{t('structure.detail.phoneLabel')} </span>
                                        <a href={`tel:${section.leader.phone}`} className="text-primary-500 hover:underline">
                                            {section.leader.phone}
                                        </a>
                                    </p>
                                )}

                                {section.leader.email && (
                                    <p className="text-slate-600 text-[15px]">
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{t('structure.detail.emailLabel')} </span>
                                        <a href={`mailto:${section.leader.email}`} className="text-primary-500 hover:underline">
                                            {section.leader.email}
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ===== DESCRIPTION ===== */}
                {section.description && (
                    <div className="mb-10">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">{t('structure.detail.aboutLabel')}</h3>
                        <RichTextRenderer
                            content={section.description}
                            className="prose prose-slate max-w-none text-[15px] leading-relaxed text-slate-600"
                        />
                    </div>
                )}

                {/* ===== MEMBERS ===== */}
                {section.members && section.members.length > 0 && (
                    <div className="mb-10">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-5">{t('structure.detail.membersLabel')}</h3>
                        <div className="divide-y divide-slate-100">
                            {section.members.map((member) => (
                                <div key={member.id} className="flex items-center gap-4 py-4 first:pt-0">
                                    {/* Photo */}
                                    {member.image_url ? (
                                        <img
                                            src={getLeaderImageUrl(member.image_url)}
                                            alt={member.full_name}
                                            className="w-14 h-14 rounded object-cover shrink-0"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-slate-700 text-[15px]">{member.full_name}</p>
                                        <p className="text-sm text-slate-400">{member.position}</p>
                                    </div>

                                    {/* Contact */}
                                    <div className="hidden sm:flex flex-col items-end gap-0.5 shrink-0">
                                        {member.email && (
                                            <a href={`mailto:${member.email}`} className="text-xs text-primary-500 hover:underline">{member.email}</a>
                                        )}
                                        {member.phone && (
                                            <a href={`tel:${member.phone}`} className="text-xs text-slate-400 hover:text-slate-600">{member.phone}</a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ===== CHILD SECTIONS ===== */}
                {section.children && section.children.length > 0 && (
                    <div className="mb-10">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-5">{t('structure.detail.subsectionsLabel')}</h3>
                        <ul className="space-y-2">
                            {section.children.map(child => (
                                <li key={child.id}>
                                    <button
                                        onClick={() => navigate(`/structure/${child.slug}`)}
                                        className="w-full text-left px-4 py-3 rounded hover:bg-slate-50 transition-colors group flex items-center justify-between"
                                    >
                                        <div>
                                            <span className="text-[15px] text-primary-500 group-hover:underline font-medium">
                                                {child.name}
                                            </span>
                                            {child.leader && (
                                                <span className="text-sm text-slate-400 ml-3">— {child.leader.full_name}</span>
                                            )}
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300 group-hover:text-primary-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StructureDetail;
