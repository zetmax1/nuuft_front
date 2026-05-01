import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getStructureTree } from '../api/leadersApi';

const UniversityStructure = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStructure = async () => {
            try {
                setLoading(true);
                const data = await getStructureTree();
                setSections(data);
            } catch (err) {
                setError(t('structure.error'));
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStructure();
    }, []);

    const handleSectionClick = (slug) => {
        navigate(`/structure/${slug}`);
    };

    // ============ LOADING STATE ============
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-800/40 py-12 font-sans">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="animate-pulse space-y-4">
                            <div className="h-8 bg-slate-200 rounded w-1/3 mx-auto"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/4 mx-auto"></div>
                        </div>
                    </div>
                    {[1, 2, 3].map(i => (
                        <div key={i} className="mb-16 animate-pulse">
                            <div className="flex flex-col lg:flex-row gap-6">
                                <div className="w-full lg:w-[360px] h-[220px] bg-slate-200 rounded-2xl shrink-0"></div>
                                <div className="flex-1 space-y-4">
                                    <div className="h-6 bg-slate-200 rounded w-2/3"></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-28 bg-slate-200 rounded-xl"></div>
                                        <div className="h-28 bg-slate-200 rounded-xl"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // ============ ERROR STATE ============
    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-800/40 py-12 font-sans flex items-center justify-center">
                <div className="text-center bg-white dark:bg-slate-800/60 p-10 rounded-2xl shadow-lg border border-red-100 max-w-md">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <p className="text-slate-600 mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-6 py-2.5 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-semibold">
                        {t('structure.retry')}
                    </button>
                </div>
            </div>
        );
    }

    // ============ EMPTY STATE ============
    if (sections.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-800/40 py-12 font-sans">
                <div className="max-w-6xl mx-auto px-4 text-center py-32">
                    <div className="w-24 h-24 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-400 mb-2">{t('structure.noData')}</h2>
                    <p className="text-slate-400">{t('structure.noDataSub')}</p>
                </div>
            </div>
        );
    }

    // ============ MAIN TREE VIEW ============
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-800/40 py-12 md:py-16 font-sans">
            <div className="max-w-6xl mx-auto px-4">
                {/* Page Title */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                        {t('structure.title')}
                    </h1>
                    <p className="text-slate-500 text-lg">{t('structure.subtitle')}</p>
                </div>

                {/* Structure Blocks */}
                <div className="space-y-16">
                    {sections.map((section, idx) => (
                        <StructureBlock
                            key={section.id}
                            section={section}
                            index={idx}
                            onSectionClick={handleSectionClick}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};


/* =================================================================
   STRUCTURE BLOCK — One "big section" (dark card) + its children
   ================================================================= */
const StructureBlock = ({ section, index, onSectionClick }) => {
    const hasChildren = section.children && section.children.length > 0;

    return (
        <div className="relative">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* LEFT: Big Section Card (dark navy) */}
                <div
                    onClick={() => onSectionClick(section.slug)}
                    className="w-full lg:w-[360px] shrink-0 bg-[#1a2332] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-[#243044] transition-all duration-300 group relative overflow-hidden min-h-[200px]"
                >
                    {/* Background decorations */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-4 right-8 text-4xl">✦</div>
                        <div className="absolute bottom-6 left-6 text-2xl">✦</div>
                        <div className="absolute top-1/2 right-4 text-lg">✦</div>
                        <div className="absolute bottom-3 right-1/3 text-sm">✦</div>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-white/20 transition-colors">
                        {section.icon ? (
                            <span className="text-2xl">{section.icon}</span>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        )}
                    </div>

                    {/* Name */}
                    <h2 className="text-white font-bold text-lg leading-snug relative z-10">
                        {section.name}
                    </h2>

                    {/* Leader preview */}
                    {section.leader && (
                        <p className="text-white/50 text-xs mt-3 relative z-10">{section.leader.full_name}</p>
                    )}
                </div>

                {/* RIGHT: Title + Children Grid */}
                <div className="flex-1">
                    {/* Section heading (visible on desktop) */}
                    <div className="mb-5 hidden lg:block">
                        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">{section.name}</h3>
                        {hasChildren && (
                            <p className="text-slate-400 mt-1">{t('structure.andSubsections')}</p>
                        )}
                    </div>

                    {/* Children grid */}
                    {hasChildren ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                            {section.children.map(child => (
                                <ChildCard
                                    key={child.id}
                                    section={child}
                                    onClick={() => onSectionClick(child.slug)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="hidden lg:flex items-center justify-center h-32 text-slate-300 text-sm italic">
                            {t('structure.noSubsections')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


/* =================================================================
   CHILD CARD — Small section card (bordered, light)
   ================================================================= */
const ChildCard = ({ section, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white border border-slate-200 rounded-xl p-5 cursor-pointer hover:border-primary-300 hover:shadow-md transition-all duration-300 group flex flex-col"
        >
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-slate-50 dark:bg-slate-800/40 flex items-center justify-center mb-3 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-500 transition-colors">
                {section.icon ? (
                    <span className="text-lg">{section.icon}</span>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                )}
            </div>

            {/* Title */}
            <p className="text-sm font-semibold text-slate-700 leading-snug group-hover:text-primary-600 transition-colors">
                {section.name}
            </p>

            {/* Leader name if available */}
            {section.leader && (
                <p className="text-xs text-slate-400 mt-2 truncate">{section.leader.full_name}</p>
            )}

            {/* Members count */}
            {section.members && section.members.length > 0 && (
                <div className="flex items-center gap-1.5 mt-auto pt-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-[11px] text-slate-400">{section.members.length} {t('structure.memberCount')}</span>
                </div>
            )}
        </div>
    );
};

export default UniversityStructure;

