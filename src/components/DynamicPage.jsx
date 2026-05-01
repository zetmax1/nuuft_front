import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getDynamicPage } from '../api/navApi';
import RichTextRenderer from './common/RichTextRenderer';

const DynamicPage = () => {
    const navigate = useNavigate();
    const { slug } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getDynamicPage(slug);
                setPage(data);
            } catch (err) {
                setError('Sahifa topilmadi');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPage();
        }
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-32">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin"></div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    if (error || !page) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-32">
                <div className="text-center">
                    <div className="text-6xl mb-4">📄</div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">Sahifa topilmadi</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">So'ralgan sahifa mavjud emas yoki o'chirilgan.</p>
                    <button
                            onClick={() => navigate('/')}
                            className="px-6 py-3 bg-primary-500 text-white rounded-full font-bold hover:bg-primary-600 transition-all shadow-lg"
                        >
                            ← Ortga qaytish
                        </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface-100 transition-colors duration-300">
            {/* Page Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16 lg:py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Ortga qaytish
                        </button>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight">
                        {page.title}
                    </h1>
                </div>
            </div>

            {/* Page Body */}
            <div className="container mx-auto px-4 md:px-8 py-10 lg:py-16">
                <div className="max-w-4xl mx-auto">
                    <RichTextRenderer
                        content={page.body}
                        className="richtext-content prose prose-lg max-w-none
                            prose-headings:text-primary-900 dark:prose-headings:text-primary-300 prose-headings:font-bold
                            prose-p:text-slate-700 dark:prose-p:text-slate-300 prose-p:leading-relaxed
                            prose-a:text-primary-500 prose-a:hover:text-primary-700
                            prose-img:rounded-xl prose-img:shadow-lg
                            prose-ul:text-slate-700 dark:prose-ul:text-slate-300 prose-ol:text-slate-700 dark:prose-ol:text-slate-300
                            prose-blockquote:border-primary-400 prose-blockquote:text-slate-600 dark:prose-blockquote:text-slate-400
                            prose-strong:text-slate-900 dark:prose-strong:text-slate-100"
                    />
                </div>
            </div>
        </div>
    );
};

export default DynamicPage;
