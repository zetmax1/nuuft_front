import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { getFacultyById, getImageUrl } from '../api/facultiesApi';
import { sanitizeHtml } from '../utils/sanitize';
import { useLanguage } from '../context/LanguageContext';

const FacultyDetail = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const { id } = useParams();
    const [faculty, setFaculty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const processRichText = (htmlContent) => {
        if (!htmlContent) return '';
        return sanitizeHtml(htmlContent);
    };

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedImage]);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const data = await getFacultyById(id);
                setFaculty(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching faculty details:", err);
                setError(t('faculties.errorDetail'));
                setLoading(false);
            }
        };

        fetchFaculty();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-100">
                <div className="h-[400px] bg-primary-900 dark:bg-slate-900 animate-pulse"></div>
                <div className="container mx-auto px-6 py-12">
                    <div className="max-w-4xl space-y-8">
                        <div className="h-8 bg-slate-200 dark:bg-slate-800 w-1/3 mb-6"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-slate-200 dark:bg-slate-800 w-full"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-800 w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !faculty) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-100">
                <div className="text-center p-8 max-w-md">
                    <h2 className="text-2xl font-bold text-text-primary mb-4 tracking-tight">{t('faculties.notFoundDetail')}</h2>
                    <p className="text-text-secondary mb-8">{error || t('faculties.notFoundDesc')}</p>
                    <button
                        onClick={() => navigate('/faculties')}
                        className="px-6 py-2 border border-theme-border text-text-primary hover:bg-theme-card transition-colors"
                    >
                        {t('faculties.goBack')}
                    </button>
                </div>
            </div>
        );
    }

    const deanImageUrl = getImageUrl(faculty.dean_image_url);
    const coverImageUrl = getImageUrl(faculty.cover_image_url);

    return (
        <div className="min-h-screen bg-surface-100 font-sans text-text-primary">
            {/* Formal Hero Section */}
            <div className="relative pt-32 pb-24 bg-primary-900 dark:bg-slate-950 text-white border-b-4 border-primary-500">
                {coverImageUrl && (
                    <div className="absolute inset-0">
                        <img 
                            src={coverImageUrl} 
                            alt={faculty.name}
                            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                )}
                
                <div className="container mx-auto px-6 relative z-10">
                    <button
                        onClick={() => navigate('/faculties')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors text-sm uppercase tracking-wider"
                    >
                        <span>←</span> {t('faculties.goBack')}
                    </button>
                    
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 block">
                        {t('faculties.facultySingle')}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 max-w-4xl leading-tight tracking-tight">
                        {faculty.name}
                    </h1>
                    
                    <div className="flex flex-wrap gap-8 text-primary-100/70 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-primary-400">📍</span>
                            {faculty.office_location || t('faculties.defaultAddress')}
                        </div>
                        {faculty.email && (
                            <div className="flex items-center gap-2">
                                <span className="text-primary-400">✉️</span>
                                {faculty.email}
                            </div>
                        )}
                        {faculty.phone && (
                            <div className="flex items-center gap-2">
                                <span className="text-primary-400">📞</span>
                                {faculty.phone}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content - Flowing Document Style */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left Column - Main Info (8 columns) */}
                    <div className="lg:col-span-8">
                        
                        {/* About Section */}
                        <section className="mb-16 pb-12 border-b border-theme-border">
                            <h2 className="text-3xl font-bold text-text-primary mb-6 tracking-tight">{t('faculties.about')}</h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-text-secondary leading-relaxed text-lg">
                                {faculty.description ? (
                                    <div className="wagtail-richtext">
                                        {parse(processRichText(faculty.description))}
                                    </div>
                                ) : faculty.short_description ? (
                                    <p>{faculty.short_description}</p>
                                ) : (
                                    <p>
                                        {faculty.name} {t('faculties.defaultAbout')}
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Dean Bio Section */}
                        {faculty.dean_bio && (
                            <section className="mb-16 pb-12 border-b border-theme-border">
                                <h2 className="text-2xl font-bold text-text-primary mb-6 tracking-tight">{t('faculties.deanAbout')}</h2>
                                <div className="prose prose-slate dark:prose-invert max-w-none text-text-secondary leading-relaxed">
                                    <div className="wagtail-richtext">
                                        {parse(processRichText(faculty.dean_bio))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Departments Section */}
                        {faculty.departments && faculty.departments.length > 0 && (
                            <section className="mb-16 pb-12 border-b border-theme-border">
                                <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-tight">{t('faculties.departments')}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                    {faculty.departments.map((dept, idx) => (
                                        <div
                                            key={dept.id || idx}
                                            onClick={() => navigate(`/department/${dept.id}`)}
                                            className="group py-4 border-b border-theme-border cursor-pointer flex items-center justify-between hover:bg-theme-card transition-colors -mx-4 px-4"
                                        >
                                            <div>
                                                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                                                    {t('faculties.departmentSingle')}
                                                </span>
                                                <h3 className="text-base font-semibold text-text-primary group-hover:text-primary-500 transition-colors">
                                                    {dept.name}
                                                </h3>
                                                {dept.head_name && (
                                                    <p className="text-xs text-text-secondary mt-1">{t('faculties.headTitle')}: {dept.head_name}</p>
                                                )}
                                            </div>
                                            <span className="text-theme-border group-hover:text-primary-500 transition-colors">→</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Achievements Section */}
                        {faculty.achievements && faculty.achievements.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-tight">{t('faculties.achievements')}</h2>
                                <div className="space-y-8">
                                    {faculty.achievements.map((achievement, idx) => {
                                        const achievementImage = getImageUrl(achievement.image_url);
                                        return (
                                            <div key={achievement.id || idx} className="flex flex-col md:flex-row gap-6 pb-8 border-b border-theme-border last:border-0">
                                                {achievementImage && (
                                                    <div 
                                                        className="w-full md:w-48 h-32 bg-theme-card shrink-0 cursor-zoom-in group/img overflow-hidden border border-theme-border"
                                                        onClick={() => setSelectedImage(achievementImage)}
                                                    >
                                                        <img 
                                                            src={achievementImage} 
                                                            alt={achievement.title} 
                                                            className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2 text-xs">
                                                        {achievement.year && (
                                                            <span className="font-bold text-text-secondary">{achievement.year}</span>
                                                        )}
                                                        {achievement.year && achievement.link && <span className="text-theme-border">•</span>}
                                                        {achievement.link && (
                                                            <a 
                                                                href={achievement.link} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-primary-500 hover:underline"
                                                            >
                                                                {t('common.viewMore')}
                                                            </a>
                                                        )}
                                                    </div>
                                                    <h3 className="font-bold text-text-primary text-lg mb-2">{achievement.title}</h3>
                                                    {achievement.description && (
                                                        <p className="text-sm text-text-secondary leading-relaxed">{achievement.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column - Sidebar (4 columns) */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Formal Dean Box */}
                        {faculty.dean_name && (
                            <div className="bg-theme-card border border-theme-border p-8">
                                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-6 border-b border-theme-border pb-4">
                                    {t('faculties.deanTitleBox')}
                                </h3>

                                <div className="text-center">
                                    <div className="w-32 h-32 mx-auto bg-surface-100 mb-6 overflow-hidden border border-theme-border">
                                        {deanImageUrl ? (
                                            <img 
                                                src={deanImageUrl} 
                                                alt={faculty.dean_name} 
                                                className="w-full h-full object-cover opacity-90 dark:opacity-80"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-text-secondary">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <h4 className="text-lg font-bold text-text-primary mb-1">{faculty.dean_name}</h4>
                                    <p className="text-text-secondary text-sm mb-6">{faculty.dean_title || t('faculties.deanTitleBox')}</p>

                                    <div className="space-y-2 pt-6 border-t border-theme-border text-sm text-left">
                                        {faculty.email && (
                                            <div className="flex flex-col">
                                                <span className="text-text-secondary text-xs uppercase tracking-wider">{t('common.email')}</span>
                                                <span className="text-text-primary">{faculty.email}</span>
                                            </div>
                                        )}
                                        {faculty.phone && (
                                            <div className="flex flex-col mt-3">
                                                <span className="text-text-secondary text-xs uppercase tracking-wider">{t('common.phone')}</span>
                                                <span className="text-text-primary">{faculty.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Minimalist Quick Info Card */}
                        {faculty.faculty_code && (
                            <div className="border border-theme-border p-8 bg-theme-card">
                                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-6 border-b border-theme-border pb-4">
                                    {t('faculties.infoBox')}
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-4 border-b border-theme-border">
                                        <span className="text-sm text-text-secondary">{t('faculties.code')}</span>
                                        <span className="text-sm font-bold text-text-primary">{faculty.faculty_code}</span>
                                    </div>
                                    {faculty.departments && (
                                        <div className="flex justify-between items-center pb-4 border-b border-theme-border">
                                            <span className="text-sm text-text-secondary">{t('faculties.departments')}:</span>
                                            <span className="text-sm font-bold text-text-primary">{faculty.departments.length}</span>
                                        </div>
                                    )}
                                    {faculty.achievements && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-text-secondary">{t('faculties.achievements')}:</span>
                                            <span className="text-sm font-bold text-text-primary">{faculty.achievements.length}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {selectedImage && (
                <div 
                    className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md animate-fade-in"
                    onClick={() => setSelectedImage(null)}
                >
                    <button 
                        className="absolute top-6 right-6 z-[10002] p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 shadow-xl border border-white/20 group"
                        onClick={() => setSelectedImage(null)}
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
                        <img 
                            src={selectedImage} 
                            alt="Yutuq" 
                            className="max-w-full max-h-[90vh] object-contain border border-slate-700"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FacultyDetail;