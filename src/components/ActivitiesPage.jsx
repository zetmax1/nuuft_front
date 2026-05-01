import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getActivities } from '../api/activitiesApi';

const ActivitiesPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getActivities();
                setCategories(data || []);
            } catch (err) {
                setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[50vh] flex items-center justify-center flex-col gap-4">
                <p className="text-red-500">{error}</p>
                <button onClick={() => window.location.reload()} className="text-primary-600 underline font-medium">Qayta urinish</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 animate-fade-in lg:pt-[115px] pt-20">
            {/* Breadcrumb */}
            <div className="border-b border-slate-200 dark:border-slate-700">
                <div className="container mx-auto px-4 md:px-8 max-w-5xl py-3">
                    <nav className="flex items-center text-sm text-slate-500 gap-1">
                        <button onClick={() => navigate('/')} className="hover:text-primary-600 transition-colors">Bosh sahifa</button>
                        <span className="text-slate-300 mx-1">/</span>
                        <span className="text-slate-800 font-semibold">Faoliyatlar</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-5xl py-10">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">Faoliyatlar</h1>

                {categories.length === 0 ? (
                    <p className="text-slate-500 py-8">Hozircha faoliyat kategoriyalari qo'shilmagan.</p>
                ) : (
                    <div className="divide-y divide-slate-200 border-t border-b border-slate-200 dark:border-slate-700">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => navigate(`/activity-category/${category.slug}`)}
                                className="w-full flex items-center justify-between py-4 px-2 md:px-4 text-left hover:bg-slate-50 transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    {category.icon && (
                                        <span className="text-xl text-primary-500 w-8 text-center flex-shrink-0">{category.icon}</span>
                                    )}
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-800 group-hover:text-primary-600 transition-colors">
                                            {category.title}
                                        </h2>
                                        {category.page_count > 0 && (
                                            <span className="text-sm text-slate-400">{category.page_count} ta sahifa</span>
                                        )}
                                    </div>
                                </div>
                                <svg className="w-5 h-5 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivitiesPage;
