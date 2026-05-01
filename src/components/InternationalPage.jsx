import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCollaborationTypes, getPartners } from '../api/collaborationApi';

const InternationalPage = () => {
    const navigate = useNavigate();
    const [types, setTypes] = useState([]);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [typesData, partnersData] = await Promise.all([
                    getCollaborationTypes(),
                    getPartners(),
                ]);
                setTypes(typesData || []);
                // partnersData may be paginated { results: [...] } or a plain array
                const partnersList = partnersData?.results || partnersData || [];
                setPartners(partnersList);
            } catch (err) {
                setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Get unique countries count
    const uniqueCountries = [...new Set(partners.filter(p => p.country).map(p => p.country))];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <p className="text-red-500">{error}</p>
                <button onClick={() => window.location.reload()} className="text-primary-600 underline font-medium">Qayta urinish</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200 animate-fade-in">
            {/* World Map Hero */}
            <div className="relative bg-slate-900 overflow-hidden flex flex-col justify-center" style={{ minHeight: '480px' }}>
                <div className="absolute inset-0 opacity-15">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
                        className="w-full h-full object-cover filter invert"
                        alt="World Map"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                {/* Floating dots decoration */}
                <div className="absolute top-20 left-10 w-3 h-3 bg-primary-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute top-40 right-20 w-2 h-2 bg-emerald-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-28 right-1/3 w-2 h-2 bg-sky-400 rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}></div>

                <div className="container mx-auto px-4 relative z-10 lg:pt-[140px] pt-32">
                    <button
                        onClick={() => navigate('/')}
                        className="mb-8 text-white/60 hover:text-white flex items-center gap-2 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Bosh sahifaga qaytish
                    </button>
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Xalqaro hamkorlik
                        </h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
                            Dunyoning yetakchi universitetlari va ilmiy markazlari bilan hamkorlik aloqalari.
                        </p>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-8 md:gap-16 mt-10 pb-8">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white">{partners.length}+</div>
                            <div className="text-slate-400 text-sm mt-1">Hamkor tashkilotlar</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white">{uniqueCountries.length}+</div>
                            <div className="text-slate-400 text-sm mt-1">Davlatlar</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-white">{types.length}</div>
                            <div className="text-slate-400 text-sm mt-1">Hamkorlik yo'nalishlari</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Collaboration Types */}
            {types.length > 0 && (
                <div className="container mx-auto px-4 py-16 md:py-20">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">Hamkorlik yo'nalishlari</h2>
                        <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">
                            Universitetimiz xalqaro hamkorligining asosiy yo'nalishlari
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {types.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => navigate(`/collaboration-type/${type.slug}`)}
                                className="group text-left bg-white dark:bg-slate-800/60 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700/50 hover:border-primary-200 dark:hover:border-primary-500/50 transform hover:-translate-y-1"
                            >
                                <div className="flex items-start gap-4">
                                    {type.icon && (
                                        <span className="text-2xl flex-shrink-0 mt-1">{type.icon}</span>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">
                                            {type.title}
                                        </h3>
                                        <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                                            {type.partner_count > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    {type.partner_count} hamkor
                                                </span>
                                            )}
                                            {type.project_count > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                    {type.project_count} loyiha
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <svg className="w-5 h-5 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Partners Logo Grid */}
            {partners.length > 0 && (
                <div className="bg-white dark:bg-slate-900/50 py-16 md:py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">Hamkor tashkilotlar</h2>
                            <p className="text-slate-500 dark:text-slate-400 mt-3">
                                {partners.length} dan ortiq xalqaro hamkor tashkilotlar bilan aloqa o'rnatilgan
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-6xl mx-auto">
                            {partners.slice(0, 18).map((partner) => (
                                <button
                                    key={partner.id}
                                    onClick={() => navigate(`/partner-detail/${partner.slug}`)}
                                    className="group aspect-square bg-slate-50 dark:bg-slate-800/40 rounded-2xl flex flex-col items-center justify-center p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 dark:border-slate-700/50 hover:border-primary-200 dark:hover:border-primary-500/50"
                                    title={partner.name}
                                >
                                    {partner.logo_url ? (
                                        <img
                                            src={partner.logo_url}
                                            alt={partner.name}
                                            className="w-16 h-16 object-contain rounded-lg group-hover:scale-110 transition-transform"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <span className="text-primary-600 font-bold text-lg">
                                                {partner.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center line-clamp-2 leading-tight group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {partner.name}
                                    </p>
                                    {partner.country && (
                                        <span className="text-[10px] text-slate-400 mt-1">
                                            {partner.country}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>

                        {partners.length > 18 && (
                            <div className="text-center mt-10">
                                <button
                                    onClick={() => navigate(`/collaboration-type/${types[0]?.slug}`)}
                                    className="px-8 py-3 bg-primary-50 dark:bg-slate-800 text-primary-700 dark:text-primary-400 font-semibold rounded-xl hover:bg-primary-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    Barchasini ko'rish ({partners.length} ta)
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* CTA — Student Exchange */}
            <div className="bg-primary-900 dark:bg-slate-900 text-white py-16 md:py-20 px-4">
                <div className="container mx-auto bg-gradient-to-br from-primary-800 to-primary-900 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden max-w-5xl border border-transparent dark:border-slate-700/50">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full blur-[100px] opacity-30"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500 rounded-full blur-[80px] opacity-20"></div>

                    <div className="flex-1 relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-5 leading-tight">Talabalar almashinuvi</h2>
                        <p className="text-primary-100 text-lg leading-relaxed mb-8">
                            Erasmus+, ITEC va boshqa xalqaro dasturlar orqali Yevropa va Osiyo davlatlarida tahsil olish imkoniyati.
                        </p>
                        {types.length > 0 && (
                            <button
                                onClick={() => navigate(`/collaboration-type/${types[0]?.slug}`)}
                                className="px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-lg active:scale-95"
                            >
                                Dasturlar haqida
                            </button>
                        )}
                    </div>
                    <div className="flex-1 relative z-10 flex justify-center">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="w-32 md:w-40 h-44 md:h-56 bg-white/10 rounded-2xl backdrop-blur-sm transform translate-y-8 flex items-center justify-center">
                                <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="w-32 md:w-40 h-44 md:h-56 bg-white/20 rounded-2xl backdrop-blur-md flex items-center justify-center">
                                <svg className="w-12 h-12 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InternationalPage;
