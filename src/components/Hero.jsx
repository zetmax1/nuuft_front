import { useNavigate } from 'react-router-dom';
import heroBg from '../assets/hero-bg.png';
import Image from './common/Image';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    
    return (
        <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-20 lg:pt-[115px] overflow-hidden bg-surface-100 dark:bg-slate-900 transition-colors duration-500">
            
            {/* Background with Immersive Zoom */}
            {/* FIX: Changed top-20 to inset-0 so the image reaches the top of the screen behind the navbar */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={heroBg}
                    alt="O'zMU Jizzax filiali"
                    className="w-full h-full object-cover object-top scale-110 animate-slow-zoom opacity-80 dark:opacity-40"
                />
                
                {/* GRADIENT 1: Left-to-right tint */}
                {/* FIX: Moved this BEFORE the vertical gradient so it doesn't interfere with the bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-900/30 via-transparent to-transparent dark:from-primary-900/80"></div>
                
                {/* GRADIENT 2: Top-to-bottom overlay */}
                {/* FIX: from-slate-900/80 at the top ensures the white navbar text is readable. 
                         to-surface-100 perfectly blends the bottom edge evenly left-to-right. */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/10 to-surface-100 dark:from-slate-900/90 dark:via-slate-900/40 dark:to-slate-900"></div>
            </div>

            {/* Decorative Grid Pattern */}
            <div className="absolute inset-0 z-10 opacity-10 dark:opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>

            <div className="container mx-auto px-6 relative z-20 text-center lg:text-left">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-4 px-6 py-2 bg-primary-800 dark:bg-primary-500/10 border border-primary-500/50 text-white dark:text-primary-400 text-[10px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.4em] uppercase mb-10 rounded-full animate-fade-in shadow-lg">
                            <span className="w-8 h-0.5 bg-primary-500"></span>
                            {t('home.hero.yearBadge')}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 font-sans leading-[1] tracking-tighter animate-slide-up">
                            {t('home.hero.title1')} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 dark:from-white dark:via-primary-200 dark:to-primary-500">
                                {t('home.hero.title2')}
                            </span>
                        </h1>

                        <div className="w-20 h-1.5 bg-primary-500 mb-8 rounded-full shadow-[0_0_20px_rgba(21,127,196,0.3)] animate-slide-up"></div>

                        <p className="text-base md:text-lg lg:text-xl text-slate-800 dark:text-slate-300 mb-12 font-normal leading-relaxed max-w-xl animate-fade-in-up">
                             {t('home.hero.desc')}
                         </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up">
                            <button
                                onClick={() => navigate('/structure')}
                                className="w-full sm:w-auto px-10 py-4 bg-primary-600 text-white dark:bg-white dark:text-black hover:bg-primary-500 dark:hover:bg-primary-500 hover:text-white rounded-xl font-bold text-xs uppercase tracking-[0.1em] transition-all shadow-xl active:scale-95"
                            >
                                {t('home.hero.structureBtn')}
                            </button>
                            <button
                                onClick={() => navigate('/about')}
                                className="w-full sm:w-auto px-10 py-4 bg-slate-100 dark:bg-white/5 backdrop-blur-xl text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl font-bold text-xs uppercase tracking-[0.1em] transition-all group active:scale-95"
                            >
                                {t('home.hero.aboutBtn')}
                                <span className="ml-3 transform group-hover:translate-x-2 transition-transform inline-block text-primary-500 dark:text-primary-400">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Side Branding */}
            <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-12 text-slate-900/30 dark:text-white/20 select-none">
                <span className="text-xs font-black tracking-[1em] uppercase rotate-90 whitespace-nowrap">JBNUU • O'ZBEKISTON</span>
                <div className="w-px h-32 bg-slate-400 dark:bg-white/10"></div>
                <div className="flex flex-col gap-4">
                    <span className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(21,127,196,1)]"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-white/10"></span>
                    <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-white/10"></span>
                </div>
            </div>
        </section>
    );
};

export default Hero;