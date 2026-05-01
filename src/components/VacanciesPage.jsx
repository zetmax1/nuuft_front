import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getVacancies, getVacancyDetail, applyForVacancy } from '../api/vacanciesApi';
import RichTextRenderer from './common/RichTextRenderer';
import { useLanguage } from '../context/LanguageContext';

const VacanciesPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [filter, setFilter] = useState('all');
    const [vacancies, setVacancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Application modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [vacancyDetail, setVacancyDetail] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        email: '',
        cover_letter: '',
    });
    const [resumeFile, setResumeFile] = useState(null);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showModal]);

    // Fetch vacancies
    useEffect(() => {
        const fetchVacancies = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getVacancies(filter);
                // Handle paginated or plain array responses
                setVacancies(data.results || data);
            } catch (err) {
                setError(t('vacancies.errorLoading'));
            } finally {
                setLoading(false);
            }
        };
        fetchVacancies();
    }, [filter]);

    const handleApplyClick = async (vacancy) => {
        setSelectedVacancy(vacancy);
        setShowModal(true);
        setShowForm(false);
        setSubmitSuccess(false);
        setSubmitError(null);
        setFormData({ full_name: '', phone: '', email: '', cover_letter: '' });
        setResumeFile(null);
        setVacancyDetail(null);
        setLoadingDetail(true);

        try {
            const detail = await getVacancyDetail(vacancy.id);
            setVacancyDetail(detail);
        } catch (err) {
            console.error('Error fetching vacancy detail:', err);
        } finally {
            setLoadingDetail(false);
        }
    };

    const handleFormChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx'];

    const ALLOWED_MIME_TYPES = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    const validateFile = (file) => {
        if (!file) return t('vacancies.form.errors.fileRequired');
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            return t('vacancies.form.errors.fileFormat');
        }
        if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
            return t('vacancies.form.errors.fileType');
        }
        if (file.size > MAX_FILE_SIZE) {
            return t('vacancies.form.errors.fileSize');
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(null);

        // Client-side file validation
        const fileError = validateFile(resumeFile);
        if (fileError) {
            setSubmitError(fileError);
            setSubmitting(false);
            return;
        }

        try {
            const data = new FormData();
            data.append('vacancy', selectedVacancy.id);
            data.append('full_name', formData.full_name);
            data.append('phone', formData.phone);
            if (formData.email) data.append('email', formData.email);
            if (formData.cover_letter) data.append('cover_letter', formData.cover_letter);
            data.append('resume', resumeFile);

            await applyForVacancy(data);
            setSubmitSuccess(true);
            setTimeout(() => {
                setShowModal(false);
                setSubmitSuccess(false);
            }, 2500);
        } catch (err) {
            // Handle rate-limiting (429) and validation errors
            if (err.response?.status === 429) {
                const detail = err.response.data?.detail;
                setSubmitError(
                    detail?.message || t('vacancies.form.errors.tooManyRequests')
                );
            } else if (err.response?.data) {
                // DRF validation errors
                const errors = err.response.data;
                const messages = Object.values(errors).flat().join(' ');
                setSubmitError(messages || t('vacancies.form.errors.genericError'));
            } else {
                setSubmitError(t('vacancies.form.errors.genericError'));
            }
        } finally {
            setSubmitting(false);
        }
    };

    const getTypeBadgeClasses = (type) => {
        if (type === 'full_time') {
            return 'bg-green-100 text-green-700';
        }
        return 'bg-amber-100 text-amber-700';
    };

    return (
        <div className="min-h-screen bg-surface-100 font-sans text-text-primary transition-colors duration-300">
            {/* Hero Section */}
            <div className="bg-primary-900 text-white pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform translate-x-20"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-full bg-white/5 -skew-x-12 transform -translate-x-20"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-8 text-white/70 hover:text-white flex items-center gap-2 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t('common.backToHome')}
                    </button>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('vacancies.pageTitle')}</h1>
                        <p className="text-xl text-primary-200">
                            {t('vacancies.pageSubtitle')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
                <div className="bg-white dark:bg-slate-800/60 rounded-2xl shadow-xl p-6 md:p-8 min-h-[600px] border border-transparent dark:border-slate-700/50">
                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mb-8 border-b border-slate-100 dark:border-slate-700 pb-6">
                        {[
                            { id: 'all', label: t('vacancies.filters.all') },
                            { id: 'academic', label: t('vacancies.filters.academic') },
                            { id: 'technical', label: t('vacancies.filters.technical') },
                            { id: 'admin', label: t('vacancies.filters.admin') }
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setFilter(item.id)}
                                className={`px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${filter === item.id
                                        ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-slate-500 dark:text-slate-400">{t('vacancies.loading')}</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{error}</h3>
                            <button
                                onClick={() => setFilter(filter)}
                                className="mt-4 px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                            >
                                {t('vacancies.retry')}
                            </button>
                        </div>
                    )}

                    {/* Job List */}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 gap-4">
                            {vacancies.length > 0 ? (
                                vacancies.map((job) => (
                                    <div key={job.id} className="group border border-slate-100 dark:border-slate-700 rounded-2xl p-6 hover:border-primary-100 dark:hover:border-primary-500/30 hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 transition-colors">
                                                    {job.title}
                                                </h3>
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${getTypeBadgeClasses(job.employment_type)}`}>
                                                    {job.employment_type_display}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                                <span className="flex items-center gap-1.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                    </svg>
                                                    {job.department}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {job.salary_range}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {job.time_ago}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleApplyClick(job)}
                                            className="px-6 py-3 bg-white dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-bold rounded-xl hover:bg-primary-500 hover:border-primary-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg active:scale-95 whitespace-nowrap"
                                        >
                                            {t('vacancies.applyBtn')}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">{t('vacancies.notFound')}</h3>
                                    <p className="text-slate-500 dark:text-slate-400">{t('vacancies.tryOtherCategory')}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Application Modal */}
            {showModal && createPortal(
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 pt-28 pb-8">
                    <div
                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[calc(100vh-9rem)] overflow-y-auto animate-fade-in border border-transparent dark:border-slate-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 px-6 py-4 rounded-t-2xl flex items-center justify-between z-10">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                                    {showForm ? t('vacancies.modal.applyTitle') : selectedVacancy?.title}
                                </h2>
                                {selectedVacancy && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        {selectedVacancy.department}
                                        {selectedVacancy.salary_range && ` · ${selectedVacancy.salary_range}`}
                                    </p>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                {showForm && (
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500 text-sm font-medium"
                                    >
                                        ← {t('vacancies.modal.back')}
                                    </button>
                                )}
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Success State */}
                        {submitSuccess ? (
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('vacancies.modal.successTitle')}</h3>
                                <p className="text-slate-500">{t('vacancies.modal.successDesc')}</p>
                            </div>

                        ) : loadingDetail ? (
                            /* Loading detail */
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="w-10 h-10 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mb-3"></div>
                                <p className="text-slate-500 text-sm">{t('vacancies.loading')}</p>
                            </div>

                        ) : !showForm ? (
                            /* Vacancy Detail View */
                            <div className="p-6">
                                {/* Meta badges */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide ${selectedVacancy?.employment_type === 'full_time' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                        {selectedVacancy?.employment_type_display}
                                    </span>
                                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 uppercase tracking-wide">
                                        {selectedVacancy?.category_display}
                                    </span>
                                    <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
                                        {selectedVacancy?.time_ago}
                                    </span>
                                </div>

                                {/* Description */}
                                {vacancyDetail?.description && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            {t('vacancies.modal.description')}
                                        </h3>
                                        <RichTextRenderer
                                            content={vacancyDetail.description}
                                            className="prose prose-sm max-w-none text-slate-600 leading-relaxed"
                                        />
                                    </div>
                                )}

                                {/* Requirements */}
                                {vacancyDetail?.requirements && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                            {t('vacancies.modal.requirements')}
                                        </h3>
                                        <RichTextRenderer
                                            content={vacancyDetail.requirements}
                                            className="prose prose-sm max-w-none text-slate-600 leading-relaxed"
                                        />
                                    </div>
                                )}

                                {/* Apply buttons */}
                                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="flex-1 py-3.5 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition-all duration-200 shadow-lg shadow-primary-500/30"
                                    >
                                        {t('vacancies.modal.submitBtn')} →
                                    </button>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all duration-200"
                                    >
                                        {t('vacancies.modal.close')}
                                    </button>
                                </div>
                            </div>

                        ) : (
                            /* Application Form */
                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {submitError && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                        {submitError}
                                    </div>
                                )}

                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        {t('vacancies.form.fullName')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleFormChange}
                                        required
                                        placeholder={t('vacancies.form.fullNamePlaceholder')}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        {t('vacancies.form.phone')} <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        required
                                        placeholder={t('vacancies.form.phonePlaceholder')}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        {t('vacancies.form.email')} <span className="text-slate-400">{t('vacancies.form.optional')}</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        placeholder={t('vacancies.form.emailPlaceholder')}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Resume Upload */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        {t('vacancies.form.resume')} <span className="text-red-500">*</span>
                                    </label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full px-4 py-4 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-all text-center"
                                    >
                                        {resumeFile ? (
                                            <div className="flex items-center justify-center gap-2 text-primary-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                <span className="font-medium">{resumeFile.name}</span>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}
                                                    className="ml-2 text-red-400 hover:text-red-600"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-slate-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                <span className="text-sm">{t('vacancies.form.resumePlaceholder')}</span>
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setResumeFile(e.target.files[0])}
                                        className="hidden"
                                    />
                                </div>

                                {/* Cover Letter */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                                        {t('vacancies.form.coverLetter')} <span className="text-slate-400">{t('vacancies.form.optional')}</span>
                                    </label>
                                    <textarea
                                        name="cover_letter"
                                        value={formData.cover_letter}
                                        onChange={handleFormChange}
                                        rows={3}
                                        placeholder={t('vacancies.form.coverLetterPlaceholder')}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                {/* Submit and Cancel Buttons */}
                                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="flex-1 py-3.5 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition-all duration-200 shadow-lg shadow-primary-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {submitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                {t('vacancies.form.submitting')}
                                            </>
                                        ) : (
                                            t('vacancies.form.submit')
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-all duration-200 flex items-center justify-center"
                                    >
                                        {t('vacancies.form.cancel')}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default VacanciesPage;
