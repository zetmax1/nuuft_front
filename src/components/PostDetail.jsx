import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNewsDetail, getImageUrl } from '../api/newsApi';
import RichTextRenderer from './common/RichTextRenderer';
import LoadingSpinner from './common/LoadingSpinner';
import { formatDate } from '../utils/dateFormatter';
import { useLanguage } from '../context/LanguageContext';

const PostDetail = ({ type }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { language } = useLanguage();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    // Track which ID we already fetched to prevent React StrictMode double-fetch
    const fetchedIdRef = useRef(null);

    useEffect(() => {
        if (fetchedIdRef.current === id) return;
        fetchedIdRef.current = id;
        fetchPostDetail();
    }, [id]);

    const fetchPostDetail = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getNewsDetail(id);
            setPost(data);
        } catch (err) {
            console.error('Error fetching post detail:', err);
            setError('Ma\'lumotlarni yuklashda xatolik yuz berdi.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-surface-100">
                <LoadingSpinner text="Yuklanmoqda..." />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-100">
                <div className="text-center max-w-2xl mx-auto px-6">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
                        <svg className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h2 className="text-2xl font-bold text-red-900 dark:text-red-300 mb-2">Xatolik yuz berdi</h2>
                        <p className="text-red-700 dark:text-red-400 mb-4">{error || 'Xabar topilmadi'}</p>
                        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                            Orqaga qaytish
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const isAnnouncement = post.post_type === 'announcement';

    // Combine cover image + gallery images into one array
    // Deduplicate: if gallery already contains the cover image, don't add it twice
    const allImages = [];
    const coverUrl = post.cover_image_url ? getImageUrl(post.cover_image_url) : null;
    
    if (post.gallery_images && post.gallery_images.length > 0) {
        // Gallery exists — use gallery images (cover is typically the first gallery image)
        post.gallery_images.forEach((img) => {
            allImages.push({
                url: getImageUrl(img.image_url),
                caption: img.caption || '',
            });
        });
        // If cover image is NOT in gallery, prepend it
        if (coverUrl && !allImages.some(img => img.url === coverUrl)) {
            allImages.unshift({
                url: coverUrl,
                caption: post.title,
            });
        }
    } else if (coverUrl) {
        // No gallery, just cover image
        allImages.push({
            url: coverUrl,
            caption: post.title,
        });
    }

    const selectedImage = allImages[selectedImageIndex] || allImages[0];

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300">
            {/* Back Button Bar */}
            <div className="bg-primary-900 pt-32 pb-6">
                <div className="container mx-auto px-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Orqaga qaytish
                    </button>
                </div>
            </div>

            <article className="container mx-auto px-4 md:px-6 pb-24 font-sans" style={{ marginTop: '-1px' }}>
                <div className="max-w-5xl mx-auto">

                    {/* ========== SECTION 1: ALL IMAGES ========== */}
                    {allImages.length > 0 && (
                        <div className="bg-theme-card rounded-t-2xl shadow-lg overflow-hidden border-x border-t border-theme-border">
                            {/* Main Large Image */}
                            <div className="relative w-full bg-slate-50 dark:bg-black flex items-center justify-center" style={{ minHeight: '300px' }}>
                                <img
                                    src={selectedImage.url}
                                    alt={selectedImage.caption || post.title}
                                    className="w-full h-auto block"
                                    style={{ maxHeight: '75vh', objectFit: 'contain' }}
                                />
                                {/* Image counter */}
                                {allImages.length > 1 && (
                                    <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
                                        {selectedImageIndex + 1} / {allImages.length}
                                    </div>
                                )}
                                {/* Navigation arrows */}
                                {allImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                        </button>
                                        <button
                                            onClick={() => setSelectedImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all backdrop-blur-sm"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail Strip */}
                            {allImages.length > 1 && (
                                <div className="bg-slate-100 dark:bg-slate-900 px-4 py-3 flex gap-2 overflow-x-auto">
                                    {allImages.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImageIndex(index)}
                                            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                                index === selectedImageIndex
                                                    ? 'border-primary-400 opacity-100 scale-105'
                                                    : 'border-transparent opacity-60 hover:opacity-90'
                                            }`}
                                        >
                                            <img
                                                src={img.url}
                                                alt={img.caption || `Photo ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* ========== SECTION 2: DATE + TITLE + CONTENT ========== */}
                    <div className={`bg-theme-card shadow-lg border-x border-b border-theme-border ${allImages.length > 0 ? 'rounded-b-2xl' : 'rounded-2xl'}`}>
                        <div className="px-5 py-5 md:px-8 md:py-8 lg:px-10 lg:py-10">

                            {/* Category badges */}
                            <div className="flex items-center gap-3 mb-5">
                                <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-white ${
                                    isAnnouncement ? 'bg-primary-700' : 'bg-primary-500'
                                }`}>
                                    {isAnnouncement ? 'E\'lon' : 'Yangilik'}
                                </span>
                                {post.is_pinned && (
                                    <span className="bg-amber-500 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1">
                                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        Muhim
                                    </span>
                                )}
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-4 text-slate-400 text-sm mb-4">
                                <time className="flex items-center gap-2">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatDate(post.published_date, language)}
                                </time>
                                {post.views_count > 0 && (
                                    <>
                                        <span className="text-slate-300 dark:text-slate-600">|</span>
                                        <span className="flex items-center gap-2">
                                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {post.views_count}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-6 leading-tight">
                                {post.title}
                            </h1>

                            {/* Divider */}
                            <div className="w-12 h-1 bg-primary-500 rounded-full mb-6"></div>

                            {/* Excerpt */}
                            {post.excerpt && (
                                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-medium mb-6 leading-relaxed">
                                    {post.excerpt}
                                </p>
                            )}

                            {/* Content */}
                            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none leading-relaxed">
                                <RichTextRenderer
                                    content={post.content}
                                    className="wagtail-richtext space-y-5"
                                />
                            </div>

                            {/* Share + Back */}
                            <div className="mt-10 pt-6 border-t border-theme-border flex flex-wrap gap-4 items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <a href="https://t.me/uzmujizzaxfiliali/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#0088cc] hover:text-white transition-all">
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                                    </a>
                                    <a href="https://www.instagram.com/jbnuu.uz/?hl=ru" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:text-white transition-all">
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                    </a>
                                    <a href="https://www.facebook.com/jbnuu.uz/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                                    </a>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                                        className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
                                    >
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                                    </button>
                                </div>

                                <button
                                    onClick={() => navigate(-1)}
                                    className="px-5 py-2.5 bg-primary-900 text-white font-semibold rounded-lg hover:bg-primary-800 transition-colors text-sm tracking-wide active:scale-95"
                                >
                                    ← Ro'yxatga qaytish
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </article>
        </div>
    );
};

export default PostDetail;
