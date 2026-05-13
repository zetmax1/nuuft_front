import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getDepartmentById, getImageUrl } from '../api/departmentsApi';
import RichTextRenderer from './common/RichTextRenderer';
import { universityStructure } from '../data/structure';
import { useLanguage } from '../context/LanguageContext';

// Helper: find a node by id from the static structure data
const findStructureNode = (id) => {
    const allNodes = Object.values(universityStructure).flat();
    return allNodes.find(node => node.id === id) || null;
};

const DepartmentDetail = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { id } = useParams();
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const isNumericId = /^\d+$/.test(id);

        if (!id) return;

        if (isNumericId) {
            const fetchDepartment = async () => {
                try {
                    setLoading(true);
                    const data = await getDepartmentById(id);
                    setDepartment(data);
                    setLoading(false);
                } catch (err) {
                    console.error("Error fetching department details:", err);
                    setError(t('departments.errorLoading'));
                    setLoading(false);
                }
            };
            fetchDepartment();
        } else {
            const node = findStructureNode(id);
            if (node) {
                const allNodes = Object.values(universityStructure).flat();
                const children = allNodes.filter(n => n.parentId === id);

                setDepartment({
                    ...node,
                    name: node.title,
                    head_name: node.head?.name || null,
                    head_title: node.head?.title || null,
                    email: node.head?.email || null,
                    phone: node.head?.phone || null,
                    staff: node.staff || [],
                    children: children,
                });
            } else {
                setError(t('departments.notFound'));
            }
            setLoading(false);
        }
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

    if (error || !department) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-100">
                <div className="text-center p-8 max-w-md">
                    <h2 className="text-2xl font-bold text-text-primary mb-4 tracking-tight">{t('departments.notFound')}</h2>
                    <p className="text-text-secondary mb-8">{error || t('departments.notFoundDesc')}</p>
                    <button 
                        onClick={() => navigate('/departments')} 
                        className="px-6 py-2 border border-theme-border text-text-primary hover:bg-theme-card transition-colors"
                    >
                        {t('departments.back')}
                    </button>
                </div>
            </div>
        );
    }

    const headImageUrl = getImageUrl(department.head_image_url);
    const coverImageUrl = getImageUrl(department.cover_image_url);

    return (
        <div className="min-h-screen bg-surface-100 font-sans text-text-primary">
            {/* Formal Hero Section */}
            <div className="relative pt-32 pb-24 bg-primary-900 dark:bg-slate-950 text-white border-b-4 border-primary-500">
                {coverImageUrl && (
                    <div className="absolute inset-0">
                        <img 
                            src={coverImageUrl} 
                            alt={department.name}
                            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </div>
                )}
                
                <div className="container mx-auto px-6 relative z-10">
                    <button
                        onClick={() => navigate('/departments')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white mb-12 transition-colors text-sm uppercase tracking-wider"
                    >
                        <span>←</span> {t('departments.goBack')}
                    </button>
                    
                    <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-4 block">
                        {t('departments.departmentSingle')}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 max-w-4xl leading-tight tracking-tight">
                        {department.name}
                    </h1>
                    
                    <div className="flex flex-wrap gap-8 text-primary-100/70 text-sm">
                        {department.office_location && (
                            <div className="flex items-center gap-2">
                                <span className="text-primary-400">📍</span>
                                {department.office_location}
                            </div>
                        )}
                        {department.reception_time && (
                            <div className="flex items-center gap-2">
                                <span className="text-primary-400">🕒</span>
                                {department.reception_time}
                            </div>
                        )}
                        {department.email && (
                            <div className="flex items-center gap-2">
                                <span className="text-primary-400">✉️</span>
                                {department.email}
                            </div>
                        )}
                        {department.phone && (
                            <div className="flex items-center gap-2">
                                <span className="text-primary-400">📞</span>
                                {department.phone}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content - Flowing Document Style */}
            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-16">
                    
                    {/* Left Column - Main Info (Takes up 8 columns) */}
                    <div className="lg:col-span-8">
                        
                        {/* About Section */}
                        <section className="mb-16 pb-12 border-b border-theme-border">
                            <h2 className="text-3xl font-bold text-text-primary mb-6 tracking-tight">{t('departments.about')}</h2>
                            <div className="prose prose-slate dark:prose-invert max-w-none text-text-secondary leading-relaxed text-lg">
                                {department.description ? (
                                    <RichTextRenderer content={department.description} />
                                ) : department.short_description ? (
                                    <p>{department.short_description}</p>
                                ) : (
                                    <p>
                                        {department.name} kafedrasi O'zbekiston Milliy universiteti Jizzax filialining yetakchi ta'lim markazlaridan biri hisoblanadi.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Sub-Entities Section */}
                        {department.children && department.children.length > 0 && (
                            <section className="mb-16 pb-12 border-b border-theme-border">
                                <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-tight">{t('departments.subEntities')}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                                    {department.children.map((sub) => (
                                        <div
                                            key={sub.id}
                                            onClick={() => navigate(`/department/${sub.id}`)}
                                            className="group py-4 border-b border-theme-border cursor-pointer flex items-center justify-between hover:bg-theme-card transition-colors -mx-4 px-4"
                                        >
                                            <div>
                                                <span className="text-[10px] text-text-secondary uppercase tracking-widest block mb-1">
                                                    {(sub.type || t('departments.subEntitySingle')).replace('-', ' ')}
                                                </span>
                                                <h3 className="text-base font-semibold text-text-primary group-hover:text-primary-500 transition-colors">
                                                    {sub.name || sub.title}
                                                </h3>
                                            </div>
                                            <span className="text-theme-border group-hover:text-primary-500 transition-colors">→</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Programs Section */}
                        {department.programs && department.programs.length > 0 && (
                            <section className="mb-16 pb-12 border-b border-theme-border">
                                {['bachelor', 'master'].map(degreeType => {
                                    const progs = department.programs.filter(p => p.degree === degreeType);
                                    if (progs.length === 0) return null;
                                    
                                    const titleStr = degreeType === 'bachelor' 
                                        ? t('departments.bachelorPrograms')
                                        : t('departments.masterPrograms');
                                    
                                    return (
                                        <div key={degreeType} className="mb-10 last:mb-0">
                                            <div className="flex items-center gap-4 mb-6">
                                                <h2 className="text-base font-normal tracking-widest ">
                                                    <b>{titleStr}</b>
                                                </h2>
                                                <div className="h-px bg-theme-border flex-1 opacity-50"></div>
                                            </div>
                                            <div className="space-y-4">
                                                {progs.map((program) => (
                                                    <div key={program.id} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                                                        {program.code && (
                                                            <span className="text-primary-500 dark:text-primary-400 font-medium sm:w-28 shrink-0">
                                                                {program.code}
                                                            </span>
                                                        )}
                                                        <span className="text-text-secondary font-normal">
                                                            {program.name}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </section>
                        )}

                        {/* Subjects Section */}
                        {department.subjects && department.subjects.length > 0 && (
                            <section className="mb-16 pb-12 border-b border-theme-border">
                                <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-tight">{t('departments.subjects')}</h2>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 list-disc pl-5 marker:text-theme-border">
                                    {department.subjects.map((subject) => (
                                        <li key={subject.id} className="text-text-secondary pl-2">
                                            <span className="font-medium text-text-primary">{subject.name}</span>
                                            {(subject.credits || subject.level) && (
                                                <span className="text-xs text-text-secondary ml-2 block sm:inline">
                                                    ({subject.credits ? `${subject.credits} ${t('departments.credits')}` : ''} 
                                                    {subject.credits && subject.level ? ' / ' : ''}
                                                    {subject.level || ''})
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Staff Section */}
                        {department.staff && department.staff.length > 0 && (
                            <section className="mb-16 pb-12 border-b border-theme-border">
                                <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-tight">{t('departments.staff')}</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {department.staff.map((member) => {
                                        const memberImageUrl = getImageUrl(member.image_url);
                                        return (
                                            <div key={member.id} className="bg-theme-card border border-theme-border rounded-xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
                                                <div className="h-56 bg-surface-200 w-full relative group/staff">
                                                    {memberImageUrl ? (
                                                        <img 
                                                            src={memberImageUrl} 
                                                            alt={member.name} 
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-text-secondary">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-6 flex flex-col flex-grow text-center items-center">
                                                    <h4 className="font-bold text-text-primary text-base mb-1">{member.name}</h4>
                                                    {member.degree && (
                                                        <p className="text-sm text-text-secondary font-medium mb-1">{member.degree}</p>
                                                    )}
                                                    
                                                    <div className="mt-auto">
                                                        {member.email && (
                                                            <a href={`mailto:${member.email}`} className="text-[13px] font-medium text-primary-500 hover:text-primary-600 hover:underline transition-colors">
                                                                 {member.email}
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {/* Publications Section */}
                        {department.publications && department.publications.length > 0 && (
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-text-primary mb-8 tracking-tight">{t('departments.publications')}</h2>
                                <div className="space-y-6">
                                    {department.publications.map((publication) => (
                                        <div key={publication.id} className="pl-4 border-l-2 border-theme-border">
                                            <h3 className="font-semibold text-text-primary">{publication.title}</h3>
                                            <p className="text-sm text-text-secondary mt-1">{publication.authors}</p>
                                            <div className="flex items-center gap-3 text-sm text-text-secondary mt-2">
                                                {publication.year && <span>{publication.year}</span>}
                                                {publication.year && publication.journal_or_conference && <span>•</span>}
                                                {publication.journal_or_conference && <span>{publication.journal_or_conference}</span>}
                                                
                                                {publication.link && (
                                                    <>
                                                        <span>•</span>
                                                        <a href={publication.link} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">
                                                            {t('departments.view')}
                                                        </a>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column - Sidebar (Takes up 4 columns) */}
                    <div className="lg:col-span-4 space-y-8">
                        
                        {/* Formal Head of Department Box */}
                        {department.head_name && (
                            <div className="bg-theme-card border border-theme-border p-8">
                                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-6 border-b border-theme-border pb-4">
                                    {t('departments.headTitle')}
                                </h3>

                                <div className="text-center">
                                    <div className="w-56 h-56 mx-auto bg-surface-100 mb-6 overflow-hidden border border-theme-border">
                                        {headImageUrl ? (
                                            <img 
                                                src={headImageUrl} 
                                                alt={department.head_name} 
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
                                    <h4 className="text-lg font-bold text-text-primary mb-1">{department.head_name}</h4>
                                    <p className="text-text-secondary text-sm mb-4">{department.head_title || "Kafedra mudiri"}</p>

                                    <div className="space-y-3 text-sm text-left">
                                        {department.email && (
                                            <div className="flex flex-col">
                                                <span className="text-text-secondary text-xs uppercase tracking-wider">{t('departments.email')}</span>
                                                <span className="text-text-primary">{department.email}</span>
                                            </div>
                                        )}
                                        {department.phone && (
                                            <div className="flex flex-col">
                                                <span className="text-text-secondary text-xs uppercase tracking-wider">{t('departments.phone')}</span>
                                                <span className="text-text-primary">{department.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Minimalist Faculty Link */}
                        {department.faculty && (
                            <div 
                                onClick={() => navigate(`/faculty-detail/${department.faculty}`)}
                                className="group p-6 border border-theme-border bg-theme-card hover:border-primary-500 cursor-pointer transition-colors"
                            >
                                <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2">{t('departments.facultyLink')}</h3>
                                <div className="flex items-center justify-between">
                                    <span className="text-text-primary font-medium group-hover:text-primary-500 transition-colors">
                                        {department.faculty_name || t('departments.facultyGoTo')}
                                    </span>
                                    <span className="text-text-secondary group-hover:text-primary-500">→</span>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DepartmentDetail;