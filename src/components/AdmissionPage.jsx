import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getAdmissionYears, getAdmissionYearDetail } from '../api/admissionApi';



const AdmissionPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const ADMISSION_STEPS = useMemo(() => [
        { step: "01", title: t('admission.steps.0.title'), desc: t('admission.steps.0.desc') },
        { step: "02", title: t('admission.steps.1.title'), desc: t('admission.steps.1.desc') },
        { step: "03", title: t('admission.steps.2.title'), desc: t('admission.steps.2.desc') },
        { step: "04", title: t('admission.steps.3.title'), desc: t('admission.steps.3.desc') }
    ], [t]);
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [yearDetail, setYearDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all years on mount
    useEffect(() => {
        const fetchYears = async () => {
            try {
                setLoading(true);
                const data = await getAdmissionYears();
                // Sort years by title descending to get the latest one first
                const sortedData = [...data].sort((a, b) => b.title.localeCompare(a.title));
                setYears(sortedData);
                if (sortedData.length > 0) {
                    setSelectedYear(sortedData[0].id);
                } else {
                    setLoading(false);
                }
            } catch (err) {
                setError(t('admission.error'));
                setLoading(false);
            }
        };
        fetchYears();
    }, []);

    // Fetch detail when selectedYear changes
    useEffect(() => {
        if (!selectedYear) return;
        const fetchDetail = async () => {
            try {
                setLoading(true);
                const data = await getAdmissionYearDetail(selectedYear);
                setYearDetail(data);
            } catch (err) {
                setError(t('admission.error'));
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [selectedYear]);

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-100 transition-colors duration-300 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                    <p className="text-slate-500 text-lg">{t('admission.loading')}</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-surface-100 transition-colors duration-300 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <p className="text-slate-600 text-lg">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        {t('admission.retry')}
                    </button>
                </div>
            </div>
        );
    }

    if (!yearDetail || years.length === 0) {
        return (
            <div className="min-h-screen bg-surface-100 transition-colors duration-300 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">📋</div>
                    <p className="text-slate-600 text-lg">{t('admission.noData')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 font-sans text-slate-800 dark:text-slate-200">
            {/* Split Hero */}
            <div className="flex flex-col lg:flex-row min-h-[600px]">
                <div className="lg:w-1/2 bg-primary-900 text-white p-12 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    {/* Background decor */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0 w-96 h-96 text-primary-800 opacity-50 transform translate-x-1/2 -translate-y-1/2">
                            <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.3,-46.7C90.8,-34.3,96.9,-19.6,95.8,-5.3C94.7,9,86.3,22.9,76.5,35.2C66.7,47.5,55.5,58.2,42.9,65.8C30.3,73.4,16.3,77.9,1.5,75.3C-13.3,72.7,-27.9,63,-41.4,53.4C-54.9,43.8,-67.3,34.3,-75.4,21.8C-83.5,9.3,-87.3,-6.2,-83.1,-20.1C-78.9,-34,-66.7,-46.3,-53.6,-53.9C-40.5,-61.5,-26.5,-64.4,-13.2,-66.4C0.2,-68.4,13.5,-69.5,30.5,-83.6" transform="translate(100 100)" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <button
                            onClick={() => navigate('/')}
                            className="mb-8 text-white/50 hover:text-white flex items-center gap-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            {t('admission.backToHome')}
                        </button>

                        {yearDetail.badge_text && (
                            <span className="inline-block px-3 py-1 bg-accent-500 text-white text-xs font-bold rounded mb-4 animate-fade-in">
                                {yearDetail.badge_text}
                            </span>
                        )}

                        <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight animate-slide-up">
                            {yearDetail.hero_title || t('admission.apply')}
                        </h1>

                        <p className="text-xl text-primary-200 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                            {yearDetail.hero_description}
                        </p>

                        <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                            <a
                                href={yearDetail.apply_link || "https://my.uzbmb.uz/"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-white text-primary-900 font-bold rounded-lg hover:bg-primary-50 transition-colors shadow-lg inline-flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                {t('admission.apply')}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Right side — Static Steps */}
                <div className="lg:w-1/2 p-12 lg:p-24 bg-slate-50 dark:bg-slate-800/40 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-10">{t('admission.stepsTitle')}</h2>

                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                        {ADMISSION_STEPS.map((item, idx) => (
                            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group select-none">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-slate-200 group-hover:bg-primary-500 group-hover:text-white transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-slate-500 dark:text-slate-400">
                                    {item.step}
                                </div>
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-slate-800/60 p-6 rounded-xl shadow-sm border border-slate-100 group-hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-lg mb-1 text-slate-800 dark:text-slate-200">{item.title}</h3>
                                    <p className="text-slate-500 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Year Selector + Quotas */}
            <div className="container mx-auto px-4 py-20">
                {/* Year tabs */}
                {years.length > 1 && (
                    <div className="flex justify-center mb-8">
                        <div className="inline-flex bg-slate-100 dark:bg-slate-700 rounded-xl p-1 gap-1">
                            {years.map((year) => (
                                <button
                                    key={year.id}
                                    onClick={() => setSelectedYear(year.id)}
                                    className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                                        selectedYear === year.id
                                            ? 'bg-primary-600 text-white shadow-md'
                                            : 'text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    {year.title}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <h2 className="text-3xl font-bold text-center mb-12">{t('admission.quotas')}</h2>

                {yearDetail.quotas && yearDetail.quotas.length > 0 ? (
                    <div className="overflow-x-auto rounded-xl shadow-lg border border-slate-100 dark:border-slate-700/50">
                        <table className="w-full text-left bg-white dark:bg-slate-800/60">
                            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 font-bold uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">{t('admission.direction')}</th>
                                    <th className="px-6 py-4">{t('admission.language')}</th>
                                    <th className="px-6 py-4 text-center">{t('admission.grant')}</th>
                                    <th className="px-6 py-4 text-center">{t('admission.contract')}</th>
                                    <th className="px-6 py-4 text-center">{t('admission.total')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                {yearDetail.quotas.map((row, idx) => (
                                    <tr key={row.id || idx} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{row.direction_name}</td>
                                        <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{row.language}</td>
                                        <td className="px-6 py-4 text-center text-green-600 font-bold bg-green-50/50">{row.grant_count}</td>
                                        <td className="px-6 py-4 text-center text-blue-600 font-bold bg-blue-50/50">{row.contract_count}</td>
                                        <td className="px-6 py-4 text-center font-black text-slate-900 dark:text-slate-100">{row.total}</td>
                                    </tr>
                                ))}
                            </tbody>
                            {/* Summary row */}
                            <tfoot className="bg-slate-50 dark:bg-slate-700/50 border-t-2 border-slate-200 dark:border-slate-700">
                                <tr>
                                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200" colSpan={2}>{t('admission.total')}</td>
                                    <td className="px-6 py-4 text-center text-green-700 font-black">
                                        {yearDetail.quotas.reduce((sum, q) => sum + q.grant_count, 0)}
                                    </td>
                                    <td className="px-6 py-4 text-center text-blue-700 font-black">
                                        {yearDetail.quotas.reduce((sum, q) => sum + q.contract_count, 0)}
                                    </td>
                                    <td className="px-6 py-4 text-center font-black text-slate-900 text-lg">
                                        {yearDetail.quotas.reduce((sum, q) => sum + q.total, 0)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-lg">{t('admission.noQuotas')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdmissionPage;
