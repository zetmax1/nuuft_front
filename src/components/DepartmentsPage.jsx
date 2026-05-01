import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getAllDepartments } from '../api/departmentsApi';

const DepartmentsPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const data = await getAllDepartments();

                setDepartments(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching departments:", err);
                setError(t('departments.error'));
                setLoading(false);
            }
        };
69
        fetchDepartments();
    }, []);

    if (loading) {
        return <div className="min-h-screen bg-surface-100 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-text-secondary">{t('departments.loading')}</p>
            </div>
        </div>;
    }

    if (error) {
        return <div className="min-h-screen bg-surface-100 flex items-center justify-center">
            <div className="text-center p-8">
                <h2 className="text-2xl font-bold text-text-primary mb-2">{t('departments.error')}</h2>
                <p className="text-text-secondary mb-6">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-primary-500 text-white rounded-full font-bold hover:bg-primary-600 transition-colors shadow-lg hover:shadow-primary-500/20"
                >
                    {t('departments.retry')}
                </button>
            </div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-surface-100">
            <div className="container mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold text-text-primary mb-8">{t('departments.title')}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {departments.map((dept) => (
                        <div
                            key={dept.id}
                            onClick={() => navigate(`/department/${dept.id}`)}
                            className="bg-theme-card p-6 rounded-lg shadow-sm hover:shadow-xl transition-all cursor-pointer border border-theme-border hover:border-primary-500/50"
                        >
                            <h2 className="text-xl font-bold text-text-primary mb-2">{dept.name}</h2>
                            {dept.short_description && (
                                <p className="text-sm text-text-secondary mb-4 line-clamp-2">{dept.short_description}</p>
                            )}
                            {dept.department_code && (
                                <span className="text-xs font-bold text-primary-500">{dept.department_code}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DepartmentsPage;