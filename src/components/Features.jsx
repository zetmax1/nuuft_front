import { useNavigate } from 'react-router-dom';
import { getFeaturesData } from '../data/features.jsx';
import { useLanguage } from '../context/LanguageContext';

const Features = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const featuresData = getFeaturesData(t);
    return (
        <section id="about" className="py-20 md:py-32 bg-surface-100 relative">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 md:mb-24">
                    <span className="text-primary-500 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs mb-4 md:mb-6">{t('features.sectionTag')}</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 md:mb-8 font-sans leading-tight">{t('features.sectionTitle')}</h2>
                    <div className="w-16 md:w-24 h-1 md:h-1.5 bg-primary-500 mb-6 md:mb-8 shadow-xl"></div>
                    <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                        {t('features.sectionDesc')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuresData.map((feature, index) => {
                        return (
                            <div
                                key={feature.id}
                                onClick={() => navigate(feature.link || `/feature-detail/${feature.id}`)}
                                className="group relative p-10 bg-white dark:bg-slate-800/50 rounded-[3rem] transition-all duration-500 overflow-hidden cursor-pointer border border-slate-100 dark:border-slate-700/50 hover:border-primary-500/50 flex flex-col h-full shadow-lg hover:shadow-2xl"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Subtle Background Icon - More refined */}
                                <div className="absolute -bottom-10 -right-10 text-[12rem] opacity-[0.02] group-hover:opacity-[0.05] transition-all duration-700 pointer-events-none transform group-hover:-rotate-12 group-hover:scale-110">
                                    {feature.icon}
                                </div>

                                <div className="relative z-10">
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-slate-800 shadow-xl border border-slate-50 dark:border-slate-700 flex items-center justify-center mb-10 group-hover:bg-primary-900 group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                                        <div className="scale-125">{feature.icon}</div>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 font-sans group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors tracking-tight leading-tight">
                                        {feature.title}
                                    </h3>

                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 text-base font-medium h-24 line-clamp-3">
                                        {feature.text}
                                    </p>

                                    <div className="mt-auto flex items-center gap-3 text-primary-600 dark:text-primary-400 font-black uppercase text-[11px] tracking-[0.2em] group-hover:gap-5 transition-all">
                                        {t('common.more')}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;

