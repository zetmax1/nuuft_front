import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const EmblemPage = () => {
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
                            {t('symbols.emblem.title')}
                        </h1>

                        <div className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="w-full lg:w-1/2 flex justify-center">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Emblem_of_Uzbekistan.svg/600px-Emblem_of_Uzbekistan.svg.png"
                                    alt={t('symbols.emblem.alt')}
                                    className="w-2/3 max-w-md h-auto drop-shadow-xl"
                                />
                            </div>

                            <div className="w-full lg:w-1/2 prose prose-slate max-w-none">
                                <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300 mb-6 font-medium transition-colors">
                                    {t('symbols.emblem.date')}
                                </p>

                                <h3 className="text-xl font-bold text-primary-800 dark:text-primary-300 mb-4 transition-colors">{t('symbols.emblem.descriptionTitle')}</h3>

                                <ul className="space-y-4 text-slate-700 dark:text-slate-300 list-disc pl-5 transition-colors">
                                    {t('symbols.emblem.details').map((detail, idx) => (
                                        <li key={idx} dangerouslySetInnerHTML={{ __html: detail }}></li>
                                    ))}
                                </ul>

                                <p className="mt-8 text-slate-600 dark:text-slate-400 italic border-l-4 border-primary-500 pl-4 py-2 bg-primary-50 dark:bg-slate-800/50 dark:border-primary-400 rounded-r transition-colors">
                                    {t('symbols.emblem.quote')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmblemPage;
