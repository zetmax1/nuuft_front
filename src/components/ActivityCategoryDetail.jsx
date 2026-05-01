import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getActivityCategoryDetail } from '../api/activitiesApi';
import RichTextRenderer from './common/RichTextRenderer';

const ActivityCategoryDetail = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const data = await getActivityCategoryDetail(slug);
                setCategory(data);
            } catch (err) {
                setError("Kategoriya topilmadi yoki xatolik yuz berdi");
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

    if (error || !category) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
                <p className="text-red-500">{error || "Sahifa topilmadi"}</p>
                <button onClick={() => navigate('/activities')} className="text-primary-600 underline font-medium">Orqaga qaytish</button>
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
                        <button onClick={() => navigate('/activities')} className="hover:text-primary-600 transition-colors">Faoliyatlar</button>
                        <span className="text-slate-300 mx-1">/</span>
                        <span className="text-slate-800 font-semibold">{category.title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-5xl py-10">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">{category.title}</h1>

                {/* Description */}
                {category.description && (
                    <RichTextRenderer
                        content={category.description}
                        className="prose prose-slate max-w-none mt-6 mb-10 text-slate-600 leading-relaxed"
                    />
                )}

                {/* Pages list */}
                {category.pages && category.pages.length > 0 ? (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-slate-700 mb-4">Bo'limlar</h2>
                        <div className="divide-y divide-slate-200 border-t border-b border-slate-200 dark:border-slate-700">
                            {category.pages.map((page) => (
                                <button
                                    key={page.id}
                                    onClick={() => navigate(`/activity-page/${category.slug}/${page.slug}`)}
                                    className="w-full flex items-center justify-between py-4 px-2 md:px-4 text-left hover:bg-slate-50 transition-colors group"
                                >
                                    <div>
                                        <h3 className="text-base md:text-lg font-medium text-slate-800 group-hover:text-primary-600 transition-colors">
                                            {page.title}
                                        </h3>
                                        {page.has_children && (
                                            <span className="text-sm text-slate-400">Ichki bo'limlar mavjud</span>
                                        )}
                                    </div>
                                    <svg className="w-5 h-5 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p className="text-slate-500 py-8">Bu kategoriyada hozircha sahifalar mavjud emas.</p>
                )}
            </div>
        </div>
    );
};

export default ActivityCategoryDetail;
