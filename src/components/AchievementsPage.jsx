import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Image from './common/Image';
import RichTextRenderer from './common/RichTextRenderer';
import { getAchievementSections, getEnlightenmentStats } from '../api/enlightenmentApi';

// Fallback content for when API is unavailable
const fallbackSections = [
    {
        title: "Karyera va Strategik Rivojlanish",
        content: `Bizning asosiy maqsadimiz - raqobatbardosh, zamonaviy fikrlaydigan va o'z kasbining ustasi bo'lgan mutaxassislarni tayyorlashdir. 
            Bitiruvchilarimiz nafaqat davlat tashkilotlarida, balki xususiy sektor va xalqaro kompaniyalarda ham muvaffaqiyatli faoliyat yuritishlari uchun zarur bo'lgan ko'nikmalarni egallaydilar. 
            Karyera markazimiz talabalarga amaliyot o'tash joylarini topish va ishga joylashishda ko'maklashadi.`
    },
    {
        title: "Bitiruvchilarimizning Muvaffaqiyati",
        content: `Bugungi kunga qadar filialimizni tamomlagan talabalarning 95 foizdan ortig'i o'z mutaxassisligi bo'yicha ishga joylashgan. 
            Ularning ko'pchiligi nufuzli tashkilotlarda rahbarlik va mas'ul lavozimlarda faoliyat yuritishmoqda. 
            Biz doimiy ravishda bitiruvchilarimiz bilan aloqada bo'lib, ularning muvaffaqiyatlarini kuzata boramiz.`
    }
];

const AchievementsPage = () => {
    const navigate = useNavigate();
    const [sections, setSections] = useState([]);
    const [stats, setStats] = useState({
        partners_count: 150,
        projects_count: 20,
        programs_count: 10
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchSections();
    }, []);

    const fetchSections = async () => {
        try {
            const [data, statsData] = await Promise.all([
                getAchievementSections(),
                getEnlightenmentStats().catch(() => null)
            ]);
            
            if (data && data.length > 0) {
                setSections(data);
            } else {
                setSections(fallbackSections);
            }

            if (statsData) {
                setStats(statsData);
            }
        } catch (error) {
            setSections(fallbackSections);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 font-sans selection:bg-blue-900 selection:text-white pb-24">
            {/* Minimalist Header */}
            <header className="relative pt-36 pb-16">
                <div className="container mx-auto px-6 max-w-6xl">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors mb-12 mt-4 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Bosh sahifaga qaytish
                    </button>
                    
                    <div className="text-center">
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 leading-tight tracking-tighter">
                            Yuksak marralar
                        </h1>
                        
                        <p className="text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium italic">
                            "Filial bitiruvchilarining o'z sohalarining yetuk mutaxassislari bo'lib yetishib chiqishlari uchun barcha sharoitlar yaratilgan."
                        </p>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    /* Content Grid */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        <div className="lg:col-span-8 flex flex-col gap-16">
                            {sections.map((section, idx) => (
                                <section key={section.id || idx} className="animate-fade-in-up">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-1.5 bg-primary-600 rounded-full"></div>
                                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                            {section.title}
                                        </h2>
                                    </div>
                                    
                                    {section.content && (
                                        <RichTextRenderer
                                            content={section.content}
                                            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-6 prose prose-lg dark:prose-invert max-w-none text-justify"
                                        />
                                    )}

                                    {section.cover_image_url && (
                                        <Image 
                                            src={section.cover_image_url}
                                            alt={section.title}
                                            className="w-full h-[300px] object-cover rounded-2xl mt-6"
                                        />
                                    )}
                                </section>
                            ))}
                        </div>

                        {/* Sidebar / Stats Card */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-32">
                                <div className="bg-primary-900 p-10 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                                    
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-300 mb-10 border-b border-white/10 pb-5">
                                        Filial Muvaffaqiyati
                                    </h3>
                                    
                                    <div className="space-y-10 relative z-10">
                                        <div>
                                            <div className="text-5xl font-black mb-2 tracking-tighter">80%</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-primary-200/60 leading-tight">Bitiruvchilarning ish bilan ta'minlanganligi</div>
                                        </div>
                                        <div>
                                            <div className="text-5xl font-black mb-2 tracking-tighter">{stats.partners_count}+</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-primary-200/60 leading-tight">Hamkor tashkilotlar va korxonalar</div>
                                        </div>
                                        <div>
                                            <div className="text-5xl font-black mb-2 tracking-tighter">{stats.projects_count}+</div>
                                            <div className="text-[10px] font-bold uppercase tracking-widest text-primary-200/60 leading-tight">Xalqaro ta'lim dasturlari va loyihalar</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AchievementsPage;
