import { useNavigate } from 'react-router-dom';
import Image from './common/Image';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    
    return (
        <footer id="contact" className="bg-[#1C1C1C] dark:bg-slate-950 pt-16 md:pt-24 pb-12 relative overflow-hidden border-t border-white/5 transition-colors duration-500">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-24">
                    {/* About Section */}
                    <div className="space-y-8 md:space-y-10 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 text-white">
                            <div className="w-14 h-14 md:w-20 md:h-20 flex items-center justify-center">
                                <Image src="/logo.png" alt="O'zMU JF Logo" className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-sm md:text-base font-bold font-sans leading-tight text-white max-w-[200px]">
                                    {t('footer.title')}
                                </span>
                            </div>
                        </div>
                        <p className="text-slate-400 dark:text-slate-500 leading-relaxed text-base md:text-lg font-normal">
                            {t('footer.description')}
                        </p>
                        <div className="flex justify-center md:justify-start gap-4 md:gap-6 flex-wrap">
                            {[
                                { name: 'Telegram', url: 'https://t.me/uzmujizzaxfiliali' },
                                { name: 'Instagram', url: 'https://www.instagram.com/jbnuu.uz/?hl=ru' },
                                { name: 'Facebook', url: 'https://www.facebook.com/jbnuu.uz/' },
                                { name: 'YouTube', url: 'https://www.youtube.com/@ozbekistonmilliyuniversite5208' }
                            ].map((social, i) => (
                                <a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-primary-500 transition-all text-[10px] md:text-xs uppercase font-bold tracking-widest border-b border-white/10 hover:border-primary-500 pb-1">
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center md:text-left">
                        <h3 className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-8 md:mb-12 relative inline-block">
                            {t('footer.quickLinks')}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 w-12 h-1 bg-primary-500"></div>
                        </h3>
                        <ul className="space-y-4 md:space-y-6">
                            <li>
                                <button onClick={() => navigate('/about')} className="text-gray-400 hover:text-primary-400 transition-all text-base md:text-lg font-normal inline-block group text-left w-full md:w-auto">
                                    <span className="group-hover:translate-x-2 transition-transform inline-block">{t('footer.links.about')}</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => navigate('/admission')} className="text-gray-400 hover:text-primary-400 transition-all text-base md:text-lg font-normal inline-block group text-left w-full md:w-auto">
                                    <span className="group-hover:translate-x-2 transition-transform inline-block">{t('footer.links.admission')}</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => navigate('/departments')} className="text-gray-400 hover:text-primary-400 transition-all text-base md:text-lg font-normal inline-block group text-left w-full md:w-auto">
                                    <span className="group-hover:translate-x-2 transition-transform inline-block">{t('footer.links.departments')}</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => navigate('/science')} className="text-gray-400 hover:text-primary-400 transition-all text-base md:text-lg font-normal inline-block group text-left w-full md:w-auto">
                                    <span className="group-hover:translate-x-2 transition-transform inline-block">{t('footer.links.science')}</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => navigate('/international')} className="text-slate-400 dark:text-slate-500 hover:text-primary-400 dark:hover:text-primary-400 transition-all text-base md:text-lg font-normal inline-block group text-left w-full md:w-auto">
                                    <span className="group-hover:translate-x-2 transition-transform inline-block">{t('footer.links.international')}</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Portals */}
                    <div className="text-center md:text-left">
                        <h3 className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-8 md:mb-12 relative inline-block">
                            {t('footer.electronicServices')}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 w-12 h-1 bg-primary-500"></div>
                        </h3>
                        <ul className="space-y-4 md:space-y-6">
                            <li>
                                <a href="https://student.jbnuu.uz/dashboard/login" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-all text-base md:text-lg font-normal inline-block group">
                                    <span className="group-hover:translate-x-2 transition-transform inline-block">{t('footer.links.hemisStudent')}</span>
                                </a>
                            </li>
                            <li>
                                <a href="https://hemis.jbnuu.uz/dashboard/login" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition-all text-base md:text-lg font-normal inline-block group">
                                    <span className="group-hover:translate-x-2 transition-transform inline-block">{t('footer.links.hemisTeacher')}</span>
                                </a>
                            </li>
                            <li>
                                <button onClick={() => navigate('/library')} className="text-gray-400 hover:text-primary-400 transition-all text-base md:text-lg font-normal inline-block group text-left w-full md:w-auto">
                                    <span className="group-hover:translate-x-2 transition-transform inline-block">{t('footer.links.library')}</span>
                                </button>
                            </li>
                            <li>
                                <button onClick={() => navigate('/systems')} className="text-gray-400 hover:text-primary-400 transition-all text-base md:text-lg font-normal inline-block group text-left w-full md:w-auto">
                                    <span className="group-hover:translate-x-2 transition-transform inline-block">{t('footer.links.interactive')}</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center md:text-left">
                        <h3 className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em] mb-8 md:mb-12 relative inline-block">
                            {t('footer.contact')}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 w-12 h-1 bg-primary-500"></div>
                        </h3>
                        <div className="space-y-6 md:space-y-8 text-slate-400 dark:text-slate-500 flex flex-col items-center md:items-start">
                            <div className="flex items-start gap-4 text-left">
                                <span className="text-xl md:text-2xl text-primary-500">📍</span>
                                <span className="leading-relaxed text-base md:text-lg font-normal">{t('footer.address')}</span>
                            </div>
                            <div className="flex items-center gap-4 text-left">
                                <span className="text-xl md:text-2xl text-primary-500">📞</span>
                                <span className="text-base md:text-lg font-bold text-white">+998 (72) 226-69-09</span>
                            </div>
                            <div className="flex items-center gap-4 text-left">
                                <span className="text-xl md:text-2xl text-primary-500">✉️</span>
                                <span className="text-base md:text-lg font-normal">info@jbnuu.uz</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
                    <p className="text-gray-500 text-[10px] md:text-xs uppercase font-bold tracking-widest text-center md:text-left">
                        {t('footer.copyright').replace('{year}', new Date().getFullYear())}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-12 text-[10px] md:text-xs uppercase font-bold tracking-widest text-gray-500">
                        <a href="#" className="hover:text-primary-500 transition-colors">{t('footer.links.privacy')}</a>
                        <a href="#" className="hover:text-primary-500 transition-colors">{t('footer.links.terms')}</a>
                        <button onClick={() => navigate('/admin')} className="hover:text-primary-500 transition-colors">{t('footer.links.admin')}</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
