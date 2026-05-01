import React, { useState, useEffect } from 'react';
import Image from './common/Image';
import buildingImg from '../assets/jbnuu-building.png';
import { getCollaborationTypes } from '../api/collaborationApi';
import { useLanguage } from '../context/LanguageContext';

const InfoSection = () => {
    const { t } = useLanguage();
    const [typesCount, setTypesCount] = useState(5);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const data = await getCollaborationTypes();
                if (data && Array.isArray(data)) {
                    setTypesCount(data.length);
                }
            } catch (err) {
                console.error('Error fetching collaboration types count:', err);
            }
        };
        fetchCount();
    }, []);
    return (
        <section id="about-detailed" className="py-24 md:py-32 bg-surface-100 relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                    {/* Left Side: Images & Graphics */}
                    <div className="w-full lg:w-1/2 relative">
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
                            <Image
                                src={buildingImg}
                                alt="O'zMU Jizzax filiali binosi"
                                className="w-full h-[500px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent"></div>
                        </div>

                        {/* Floating Stats or Info Card */}
                        <div className="absolute -bottom-10 -right-4 md:-right-10 z-20 bg-primary-600 p-8 md:p-10 rounded-3xl shadow-2xl text-white max-w-xs animate-slide-up">
                            <div className="text-4xl md:text-5xl font-black mb-2 font-sans tracking-tighter">{typesCount}+</div>
                            <div className="text-primary-100 font-bold uppercase tracking-widest text-xs mb-4">{t('home.info.collabTag')}</div>
                            <p className="text-white/80 text-sm leading-relaxed">
                                {t('home.info.collabDesc')}
                            </p>
                        </div>

                        {/* Decorative background element */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-primary-50 dark:border-primary-900/10 rounded-[4rem] -z-10 rotate-6"></div>
                    </div>

                    {/* Right Side: Detailed Content */}
                    <div className="w-full lg:w-1/2">
                        <span className="text-primary-600 font-bold tracking-[0.4em] uppercase text-sm mb-6 block">{t('home.info.tag')}</span>
                        <h2 className="text-3xl md:text-6xl font-black text-text-primary mb-10 font-sans leading-[1.1] tracking-tight">
                            {t('home.info.title1')} <br />
                            <span className="text-primary-500">{t('home.info.title2')}</span>
                        </h2>

                        <div className="space-y-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                            <p>
                                {t('home.info.p1')}
                            </p>

                            <p>
                                {t('home.info.p2')}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                                <div className="p-6 bg-theme-card rounded-2xl border-l-4 border-primary-500 shadow-sm border border-theme-border">
                                    <h4 className="text-text-primary font-bold mb-3 font-sans">{t('home.info.mission')}</h4>
                                    <p className="text-sm">{t('home.info.missionText')}</p>
                                </div>
                                <div className="p-6 bg-theme-card rounded-2xl border-l-4 border-accent-500 shadow-sm border border-theme-border">
                                    <h4 className="text-text-primary font-bold mb-3 font-sans">{t('home.info.vision')}</h4>
                                    <p className="text-sm">{t('home.info.visionText')}</p>
                                </div>
                            </div>

                            <p className="pt-4">
                                {t('home.info.p3')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
