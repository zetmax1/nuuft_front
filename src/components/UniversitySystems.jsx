import React, { useState, useEffect } from 'react';
import { getInformationSystems } from '../api/informationSystemsApi';
import defaultIcon from '../assets/default-system.png';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const UniversitySystems = () => {
    const [systemsData, setSystemsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSystems = async () => {
            try {
                const data = await getInformationSystems();
                let sys = data.results || data;
                if (sys.length > 0) {
                    setSystemsData(sys);
                }
            } catch (error) {
                console.error("Failed to fetch information systems:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSystems();
    }, []);

    return (
        <section id="systems" className="py-24 bg-surface-100 relative overflow-hidden transition-colors duration-300">
            {/* Immersive Background Narrative */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                {/* <span className="text-[15rem] font-black text-slate-100 dark:text-slate-800 opacity-40 absolute -top-10 -left-20">DIGITAL</span> */}
                <span className="text-[12rem] font-black text-slate-200 dark:text-slate-800 opacity-3 absolute -bottom-10 -right-5 ">JBNUU</span>
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row items-baseline justify-between mb-16 gap-8">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-px bg-primary-500"></div>
                                <span className="text-primary-500 font-bold tracking-[0.4em] uppercase text-[10px]">Raqamli ekotizim</span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-text-primary font-sans tracking-tighter leading-tight">
                                Axborot <span className="text-primary-500">tizimlari</span>
                            </h2>
                        </div>
                        <div className="lg:max-w-sm text-text-secondary text-base leading-relaxed border-l-2 border-primary-200 dark:border-primary-800 pl-6 py-2">
                            Universitetimizning barcha raqamli xizmatlari bitta interaktiv platformada mujassamlashgan.
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {systemsData.map((system, index) => (
                            <a
                                key={system.id}
                                href={system.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative h-[280px] bg-theme-card border border-theme-border rounded-3xl overflow-hidden transition-all duration-500 hover:border-primary-500 shadow-lg"
                            >
                                {/* Animated Reveal Layer */}
                                <div className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out opacity-95"></div>

                                <div className="relative z-10 p-8 h-full flex flex-col">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 shrink-0 rounded-2xl bg-primary-600 dark:bg-slate-800 shadow-sm flex items-center justify-center text-white transition-all duration-500 group-hover:bg-white group-hover:text-primary-600 overflow-hidden p-3">
                                            {system.icon_url ? (
                                                <img src={`${API_BASE_URL}${system.icon_url}`} alt={system.name} className="w-full h-full object-contain filter invert group-hover:filter-none transition-all duration-500" />
                                            ) : (
                                                <img src={defaultIcon} alt="Default" className="w-full h-full object-contain filter invert group-hover:filter-none transition-all duration-500" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-text-primary group-hover:text-white transition-colors tracking-tight uppercase leading-tight">
                                                {system.name}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <p className="text-text-secondary text-xs md:text-sm leading-relaxed group-hover:text-white/90 transition-colors line-clamp-2">
                                            {system.short_description}
                                        </p>

                                        <div className="mt-4 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <span className="text-[10px] font-black uppercase tracking-widest">O'tish</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-4 right-6 text-2xl font-black text-slate-200 dark:text-slate-800 group-hover:text-white/10 group-hover:opacity-0 transition-opacity">
                                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UniversitySystems;
