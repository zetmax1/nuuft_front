import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const FlagPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    return (
        <div className="min-h-screen bg-surface-100 dark:bg-slate-900 transition-colors duration-300 pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-8">
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center gap-2 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-bold transition-colors"
                >
                    ← {t('symbols.back')}
                </button>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transition-colors duration-300">
                    <div className="p-8 md:p-12">
                        <h1 className="text-3xl md:text-4xl font-black text-primary-900 dark:text-white mb-8 font-serif transition-colors">
                            {t('symbols.flag.title')}
                        </h1>

                        <div className="flex flex-col lg:flex-row gap-12 items-start">
                            <div className="w-full lg:w-1/2">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg"
                                    alt={t('symbols.flag.alt')}
                                    className="w-full h-auto rounded-xl shadow-lg border border-slate-200"
                                />
                                <div className="mt-6 text-sm text-slate-500 dark:text-slate-400 text-center italic transition-colors">
                                    {t('symbols.flag.date')}
                                </div>
                            </div>

                            <div className="w-full lg:w-1/2 prose prose-slate max-w-none">
                                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6 transition-colors">
                                    {t('symbols.flag.title')} — O‘zbekiston Respublikasi davlat suverenitetining ramzidir.
                                </p>

                                <h3 className="text-xl font-bold text-primary-800 dark:text-primary-300 mb-4 transition-colors">{t('symbols.flag.meaningTitle')}</h3>

                                <ul className="space-y-4 list-disc pl-5 text-slate-700 dark:text-slate-300 transition-colors">
                                    {t('symbols.flag.details').map((detail, idx) => (
                                        <li key={idx} dangerouslySetInnerHTML={{ __html: detail }}></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlagPage;
