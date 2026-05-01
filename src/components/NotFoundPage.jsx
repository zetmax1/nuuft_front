import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const NotFoundPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-surface-100 px-6 py-24 font-sans text-text-primary transition-colors duration-300">
            <div className="text-center max-w-xl w-full">
                
                {/* Minimalist Typography Label */}
                <div className="mb-8 mt-12">
                    <span className="text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mb-4 block">
                        {t('common.error404.tag')}
                    </span>
                    <h1 className="text-8xl md:text-9xl font-bold text-text-primary tracking-tighter leading-none animate-fade-in">
                        404
                    </h1>
                </div>

                {/* Subtle Divider */}
                <div className="w-16 h-1 bg-slate-200 dark:bg-slate-700 mx-auto mb-8"></div>

                {/* Text Content */}
                <div className="space-y-4 mb-12 animate-fade-in-up">
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                        {t('common.error404.title')}
                    </h2>
                    <p className="text-base md:text-lg text-text-secondary">
                        {t('common.error404.message')}
                    </p>
                </div>

                {/* Formal Action Button */}
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-3 px-8 py-3 bg-slate-900 dark:bg-primary-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-primary-700 dark:hover:bg-primary-500 transition-all group rounded-lg shadow-xl shadow-primary-900/10 active:scale-95"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
                    {t('common.error404.btn')}
                </button>
                
            </div>
        </div>
    );
};

export default NotFoundPage;