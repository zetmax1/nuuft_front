import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { submitAppeal } from '../api/appealsApi';
import { useLanguage } from '../context/LanguageContext';

const AppealPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        department: '',
        group_number: '',
        phone: '',
        message: '',
        terms_accepted: false,
    });

    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [showTermsModal, setShowTermsModal] = useState(false);

    useEffect(() => {
        if (showTermsModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showTermsModal]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(null);

        // Client-side validation
        if (!formData.terms_accepted) {
            setSubmitError(t('appeal.form.errorRequiredTerms'));
            setSubmitting(false);
            return;
        }

        try {
            await submitAppeal(formData);
            setSubmitSuccess(true);
        } catch (err) {
            if (err.response?.status === 429) {
                const detail = err.response.data?.detail;
                setSubmitError(
                    detail?.message || t('appeal.form.errorTooManyRequests')
                );
            } else if (err.response?.data) {
                const errors = err.response.data;
                const messages = Object.values(errors).flat().join(' ');
                setSubmitError(messages || t('appeal.form.errorSend'));
            } else {
                setSubmitError(t('appeal.form.errorSend'));
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-800/40 font-sans text-slate-800 dark:text-slate-200">
            {/* Hero Section */}
            <div className="bg-primary-900 text-white pt-17 pb-16 relative overflow-hidden">
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
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('appeal.pageTitle')}</h1>
                        <p className="text-xl text-primary-200">
                            {t('appeal.pageSubtitle')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl dark:border dark:border-slate-700/50 p-6 md:p-8 max-w-4xl mx-auto">

                    {/* Success State */}
                    {submitSuccess ? (
                        <div className="py-16 text-center animate-fade-in">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">{t('appeal.successTitle')}</h2>
                            <p className="text-slate-500 text-lg mb-8">
                                {t('appeal.successDesc')}
                            </p>
                            <button
                                onClick={() => {
                                    setSubmitSuccess(false);
                                    setFormData({
                                        full_name: '', email: '', department: '',
                                        group_number: '', phone: '', message: '', terms_accepted: false,
                                    });
                                }}
                                className="px-8 py-3 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition-all duration-200 shadow-lg shadow-primary-500/30"
                            >
                                {t('appeal.newAppealBtn')}
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Top accent line */}
                            <div className="h-1 bg-primary-500 rounded-full mb-8 -mt-1"></div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {submitError && (
                                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-start gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                        {submitError}
                                    </div>
                                )}

                                {/* Row 1: F.I.O + Email */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            {t('appeal.form.fullName')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="full_name"
                                            id="appeal-full-name"
                                            value={formData.full_name}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('appeal.form.fullNamePlaceholder')}
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-slate-400 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            {t('appeal.form.email')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="appeal-email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('appeal.form.emailPlaceholder')}
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-slate-400 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-200"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Department + Group Number */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            Fakultet / Bo'lim / Boshqa <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            name="department"
                                            id="appeal-department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 appearance-none"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                                backgroundPosition: 'right 0.75rem center',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: '1.5em 1.5em',
                                            }}
                                        >
                                            <option value="">{t('appeal.form.selectDepartment')}</option>
                                            {t('appeal.departments').map((dept) => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            {t('appeal.form.groupNumber')}
                                        </label>
                                        <input
                                            type="text"
                                            name="group_number"
                                            id="appeal-group-number"
                                            value={formData.group_number}
                                            onChange={handleChange}
                                            placeholder={t('appeal.form.groupNumberPlaceholder')}
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-slate-400 placeholder:text-sm bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-200"
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Phone (full width on mobile, half on desktop) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            {t('appeal.form.phone')} <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="appeal-phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('appeal.form.phonePlaceholder')}
                                            className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-slate-400 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-200"
                                        />
                                    </div>
                                </div>

                                {/* Message textarea */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        {t('appeal.form.message')} <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        id="appeal-message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        placeholder={t('appeal.form.messagePlaceholder')}
                                        className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-y placeholder:text-slate-400 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-200"
                                    />
                                    <p className="text-xs text-slate-400 mt-1">
                                        {t('appeal.form.messageHint')}
                                    </p>
                                </div>

                                {/* Terms checkbox */}
                                <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-700/50">
                                    <input
                                        type="checkbox"
                                        name="terms_accepted"
                                        id="appeal-terms"
                                        checked={formData.terms_accepted}
                                        onChange={handleChange}
                                        className="mt-1 w-4 h-4 text-primary-500 border-slate-300 rounded focus:ring-primary-500 shrink-0"
                                    />
                                    <label htmlFor="appeal-terms" className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {t('appeal.form.termsPrefix')}{' '}
                                        <button
                                            type="button"
                                            onClick={() => setShowTermsModal(true)}
                                            className="text-primary-500 hover:text-primary-600 underline font-semibold transition-colors"
                                        >
                                            {t('appeal.form.termsLink')}
                                        </button>
                                        {' '}{t('appeal.form.termsSuffix')}
                                    </label>
                                </div>

                                {/* Submit button */}
                                <div className="flex justify-center pt-2">
                                    <button
                                        type="submit"
                                        id="appeal-submit-btn"
                                        disabled={submitting || !formData.terms_accepted}
                                        className="px-12 py-3.5 bg-primary-900 text-white font-bold rounded-xl hover:bg-primary-800 transition-all duration-200 shadow-lg shadow-primary-900/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[200px]"
                                    >
                                        {submitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                {t('appeal.form.submitting')}
                                            </>
                                        ) : (
                                            t('appeal.form.submitBtn')
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>

            {/* Terms of Use Modal */}
            {showTermsModal && createPortal(
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 md:p-6"
                    onClick={() => setShowTermsModal(false)}
                >
                    <div
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[85vh] animate-fade-in overflow-hidden border dark:border-slate-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-700 px-6 py-4 shrink-0 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                {t('appeal.modal.title')}
                            </h2>
                            <button
                                onClick={() => setShowTermsModal(false)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Body */}
                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="prose prose-sm max-w-none text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                                {t('appeal.modal.termsText')}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 px-6 py-4 shrink-0 flex gap-4">
                            <button
                                onClick={() => setShowTermsModal(false)}
                                className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
                            >
                                {t('appeal.modal.cancel')}
                            </button>
                            <button
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, terms_accepted: true }));
                                    setShowTermsModal(false);
                                }}
                                className="flex-1 py-3 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 transition-all duration-200"
                            >
                                {t('appeal.modal.accept')}
                            </button>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default AppealPage;
