import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const EducationPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    
    const faculties = [
        {
            name: t('education.facultyList.psychology'),
            students: "850+",
            directions: "3 ta",
            color: "from-purple-500 to-indigo-600",
            icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        },
        {
            name: t('education.facultyList.mathAndCs'),
            students: "1200+",
            directions: "5 ta",
            color: "from-blue-500 to-cyan-600",
            icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        },
        {
            name: t('education.facultyList.medicine'),
            students: "600+",
            directions: "2 ta",
            color: "from-green-500 to-emerald-600",
            icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-800/40 font-sans text-slate-800 dark:text-slate-200">
            {/* Hero Section */}
            <div className="relative h-[50vh] min-h-[400px] bg-primary-900 overflow-hidden flex items-center">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                </div>
                {/* Abstract shapes */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500 rounded-full blur-[100px] opacity-30 transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500 rounded-full blur-[80px] opacity-20 transform -translate-x-1/3 translate-y-1/3"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-8 left-4 text-white/50 hover:text-white flex items-center gap-2 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t('education.back')}
                    </button>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
                        {t('education.pageTitle')}
                    </h1>
                    <p className="text-lg md:text-xl text-primary-200 max-w-2xl mx-auto">
                        {t('education.pageSubtitle')}
                    </p>
                </div>
            </div>

            {/* Faculties Grid */}
            <div className="container mx-auto px-4 py-20">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t('education.facultiesTitle')}</h2>
                        <p className="text-slate-500 dark:text-slate-400">{t('education.facultiesSubtitle')}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {faculties.map((faculty, idx) => (
                        <div key={idx} className="group relative bg-white dark:bg-slate-800/60 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-slate-100 hover:ring-primary-100">
                            <div className={`h-24 bg-gradient-to-r ${faculty.color} p-6 relative overflow-hidden`}>
                                <div className="absolute right-0 top-0 opacity-20 transform translate-x-2 -translate-y-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={faculty.icon} />
                                    </svg>
                                </div>
                                <div className="w-16 h-16 bg-white dark:bg-slate-800/60 rounded-2xl shadow-lg flex items-center justify-center transform translate-y-8 group-hover:scale-110 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-800 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={faculty.icon} />
                                    </svg>
                                </div>
                            </div>
                            <div className="pt-12 p-8">
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-primary-600 transition-colors">
                                    {faculty.name}
                                </h3>
                                <div className="flex items-center justify-between text-slate-500 border-t border-slate-100 pt-4 mt-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('education.students')}</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{faculty.students}</span>
                                    </div>
                                    <div className="w-px h-8 bg-slate-100"></div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{t('education.directions')}</span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">{faculty.directions}</span>
                                    </div>
                                </div>
                                <button className="w-full mt-6 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-slate-700 font-bold hover:bg-primary-500 hover:text-white transition-all duration-300">
                                    {t('education.details')}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-slate-900 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { label: t('education.stats.bachelor'), value: "18" },
                            { label: t('education.stats.master'), value: "6" },
                            { label: t('education.stats.joint'), value: "4" },
                            { label: t('education.stats.auditoriums'), value: "120+" }
                        ].map((stat, idx) => (
                            <div key={idx} className="p-4">
                                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2 font-display">
                                    {stat.value}
                                </div>
                                <div className="text-sm md:text-base text-slate-400 font-medium uppercase tracking-widest">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationPage;
