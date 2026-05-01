import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const Stats = () => {
    const { t } = useLanguage();
    
    const defaultStatsData = [
        { number: '10+', label: t('home.stats.directions') },
        { number: '2000+', label: t('home.stats.students') },
        { number: '120+', label: t('home.stats.teachers') },
        { number: '95%', label: t('home.stats.efficiency') }
    ];

    const [statsData, setStatsData] = useState(defaultStatsData);
    const [counters, setCounters] = useState(defaultStatsData.map(() => 0));
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    // Parse number from string (handles '10+', '2000+', '95%', etc.)
    const parseNumber = (str) => {
        const num = parseInt(str.replace(/[^0-9]/g, ''));
        return isNaN(num) ? 0 : num;
    };

    // Get suffix from number string (+, %, etc.)
    const getSuffix = (str) => {
        const match = str.match(/[^0-9]/g);
        return match ? match.join('') : '';
    };

    // Fetch data from backend
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/hemis/statistics/`);
                if (response.ok) {
                    const data = await response.json();
                    setStatsData([
                        { number: `${data.directions_count}`, label: t('home.stats.directions') },
                        { number: `${data.students_count}`, label: t('home.stats.studentsShort') },
                        { number: `${data.teachers_count}`, label: t('home.stats.teachers') },
                        { number: `${data.efficiency}%`, label: t('home.stats.efficiencyShort') }
                    ]);
                }
            } catch (error) {
                console.error("Failed to fetch statistics:", error);
                // On error, it automatically falls back to defaultStatsData because of useState initialization
            }
        };

        fetchStats();
    }, [t]);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    // Animate numbers whenever they become visible or the data changes
    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000;
        const steps = 60;
        const startTime = Date.now();
        const targets = statsData.map(stat => parseNumber(stat.number));

        // Start from 0
        setCounters(targets.map(() => 0));

        const timer = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            setCounters(targets.map(target => Math.floor(target * progress)));

            if (progress >= 1) clearInterval(timer);
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isVisible, statsData]);

    return (
        <section ref={sectionRef} className="relative py-20 md:py-32 bg-primary-500 dark:bg-slate-900/50 overflow-hidden transition-colors duration-500">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-20">
                    {statsData.map((stat, index) => {
                        // Calculate displayed number
                        const suffix = getSuffix(stat.number);
                        const displayNum = isVisible ? counters[index] : 0;
                        const displayNumber = `${displayNum}${suffix}`;
                        
                        return (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className="mb-2 md:mb-4 text-white/30 group-hover:text-white transition-colors duration-500">
                                    <span className="text-2xl md:text-4xl">✦</span>
                                </div>
                                <div className="text-4xl md:text-8xl font-black text-white mb-2 md:mb-4 tracking-tighter drop-shadow-2xl font-sans">
                                    {displayNumber}
                                </div>
                                <div className="w-8 md:w-12 h-1 bg-white mb-4 md:mb-6 transform group-hover:w-24 transition-all duration-500"></div>
                                <div className="text-primary-100 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[8px] md:text-xs opacity-70 group-hover:opacity-100 transition-all">
                                    {stat.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Decorative Edge */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 dark:via-primary-500/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 dark:via-primary-500/20 to-transparent"></div>
        </section>
    );
};

export default Stats;
