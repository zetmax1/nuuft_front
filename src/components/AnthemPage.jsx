import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import nationalAnthemAudio from '../assets/national_anthem.mp3';

const AnthemPage = () => {
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
                        <h1 className="text-3xl md:text-4xl font-black text-primary-900 dark:text-white mb-8 font-serif text-center transition-colors">
                            {t('symbols.anthem.title')}
                        </h1>

                        <div className="max-w-3xl mx-auto text-center">

                            <div className="bg-primary-50 dark:bg-slate-800/50 p-6 rounded-xl mb-10 border border-primary-100 dark:border-slate-700 transition-colors">
                                <p className="text-slate-600 dark:text-slate-300 font-medium mb-4">{t('symbols.anthem.credits')}</p>
                                <audio controls className="w-full">
                                    <source src={nationalAnthemAudio} type="audio/mpeg" />
                                    {t('symbols.anthem.audioError')}
                                </audio>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 text-left prose prose-lg mx-auto">
                                <div className="space-y-6">
                                    <p className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 transition-colors">
                                        Serquyosh hur oʻlkam, elga baxt, najot,<br />
                                        Sen oʻzing doʻstlarga yoʻldosh, mehribon!<br />
                                        Yashnagay to abad ilmu fan, ijod,<br />
                                        Shuhrating porlasin toki bor jahon!
                                    </p>

                                    <p className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 font-bold pl-4 border-l-2 border-primary-400 transition-colors">
                                        Oltin bu vodiylar — jon Oʻzbekiston,<br />
                                        Ajdodlar mardona ruhi senga yor!<br />
                                        Ulugʻ xalq qudrati joʻsh urgan zamon,<br />
                                        Olamni mahliyo aylagan diyor!
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <p className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 transition-colors">
                                        Bagʻri keng oʻzbekning oʻchmas iymoni,<br />
                                        Erkin, yosh avlodlar senga zoʻr qanot!<br />
                                        Istiqlol mashʼali, tinchlik posboni,<br />
                                        Xaqsevar, ona yurt, mangu boʻl obod!
                                    </p>

                                    <p className="font-serif leading-relaxed text-slate-800 dark:text-slate-200 font-bold pl-4 border-l-2 border-primary-400 transition-colors">
                                        Oltin bu vodiylar — jon Oʻzbekiston,<br />
                                        Ajdodlar mardona ruhi senga yor!<br />
                                        Ulugʻ xalq qudrati joʻsh urgan zamon,<br />
                                        Olamni mahliyo aylagan diyor!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnthemPage;
