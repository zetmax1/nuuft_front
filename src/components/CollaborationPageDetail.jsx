import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCollaborationPageDetail } from '../api/collaborationApi';
import RichTextRenderer from './common/RichTextRenderer';

const CollaborationPageDetail = () => {
    const navigate = useNavigate();
    const { typeSlug, pageSlug } = useParams();

    const [pageDetail, setPageDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!typeSlug || !pageSlug) {
                setError("Noto'g'ri manzil");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const data = await getCollaborationPageDetail(typeSlug, pageSlug);
                setPageDetail(data);
            } catch (err) {
                setError("Sahifa topilmadi yoki xatolik yuz berdi");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
        window.scrollTo(0, 0);
    }, [typeSlug, pageSlug]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (error || !pageDetail) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
                <p className="text-red-500">{error || "Sahifa topilmadi"}</p>
                <button onClick={() => navigate('/international')} className="text-primary-600 underline font-medium">Orqaga qaytish</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300 animate-fade-in lg:pt-[115px] pt-20">
            {/* Breadcrumb */}
            <div className="border-b border-slate-200 dark:border-slate-700">
                <div className="container mx-auto px-4 md:px-8 max-w-5xl py-3">
                    <nav className="flex items-center text-sm text-slate-500 gap-1 overflow-x-auto whitespace-nowrap">
                        <button onClick={() => navigate('/')} className="hover:text-primary-600 transition-colors">Bosh sahifa</button>
                        <span className="text-slate-300 mx-1">/</span>
                        <button onClick={() => navigate('/international')} className="hover:text-primary-600 transition-colors">Xalqaro Hamkorlik</button>

                        {/* Dynamic breadcrumbs */}
                        {pageDetail.breadcrumbs.map((crumb, index) => {
                            const isLast = index === pageDetail.breadcrumbs.length - 1;
                            const isType = index === 0;
                            return (
                                <span key={`${crumb.slug}-${index}`} className="flex items-center gap-1">
                                    <span className="text-slate-300 mx-1">/</span>
                                    {isLast ? (
                                        <span className="text-slate-800 font-semibold">{crumb.title}</span>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                if (isType) {
                                                    navigate(`/collaboration-type/${crumb.slug}`);
                                                } else {
                                                    navigate(`/collaboration-page/${typeSlug}/${crumb.slug}`);
                                                }
                                            }}
                                            className="hover:text-primary-600 transition-colors"
                                        >
                                            {crumb.title}
                                        </button>
                                    )}
                                </span>
                            );
                        })}
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-8 max-w-5xl py-10">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">{pageDetail.title}</h1>

                {/* Cover image */}
                {pageDetail.cover_image_url && (
                    <div className="rounded-2xl overflow-hidden mb-8 shadow-sm">
                        <img
                            src={pageDetail.cover_image_url}
                            alt={pageDetail.title}
                            className="w-full h-48 md:h-72 object-cover"
                        />
                    </div>
                )}

                {/* Rich text content */}
                {pageDetail.content && (
                    <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-primary-600 hover:prose-a:text-primary-700 prose-img:rounded-lg leading-relaxed">
                        <RichTextRenderer content={pageDetail.content} />
                    </div>
                )}

                {/* Child pages */}
                {pageDetail.children && pageDetail.children.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                        <h2 className="text-lg font-semibold text-slate-700 mb-4">Ichki bo'limlar</h2>
                        <div className="divide-y divide-slate-200 border-t border-b border-slate-200 dark:border-slate-700">
                            {pageDetail.children.map((child) => (
                                <button
                                    key={child.id}
                                    onClick={() => navigate(`/collaboration-page/${typeSlug}/${child.slug}`)}
                                    className="w-full flex items-center justify-between py-4 px-2 md:px-4 text-left hover:bg-slate-50 transition-colors group"
                                >
                                    <div>
                                        <h3 className="text-base md:text-lg font-medium text-slate-800 group-hover:text-primary-600 transition-colors">
                                            {child.title}
                                        </h3>
                                        {child.has_children && (
                                            <span className="text-sm text-slate-400">Ichki sahifalar mavjud</span>
                                        )}
                                    </div>
                                    <svg className="w-5 h-5 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollaborationPageDetail;
