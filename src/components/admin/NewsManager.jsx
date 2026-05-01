import { useState, useEffect } from 'react';
import { getNews, saveNews } from '../../utils/storage';

const NewsManager = () => {
    const [news, setNews] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentNews, setCurrentNews] = useState(null);

    useEffect(() => {
        setNews(getNews());
    }, []);

    const updateNews = (newNewsData) => {
        setNews(newNewsData);
        saveNews(newNewsData);
    };

    // Form states
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        excerpt: '',
        content: ''
    });

    const handleEdit = (item) => {
        setCurrentNews(item);
        setFormData({
            title: item.title,
            date: item.date,
            image: item.image || '',
            excerpt: item.excerpt,
            content: item.content
        });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Rostdan ham ushbu yangilikni o'chirmoqchimisiz?")) {
            const updated = news.filter(item => item.id !== id);
            updateNews(updated);
        }
    };

    const handleAddNew = () => {
        setCurrentNews(null);
        setFormData({
            title: '',
            date: new Date().toISOString().split('T')[0],
            image: '',
            excerpt: '',
            content: ''
        });
        setIsEditing(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let updatedNews;
        if (currentNews) {
            // Update existing
            updatedNews = news.map(item =>
                item.id === currentNews.id
                    ? { ...item, ...formData, displayDate: new Date(formData.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }) }
                    : item
            );
        } else {
            // Create new
            const newId = `n${Date.now()}`;
            const newItem = {
                id: newId,
                ...formData,
                type: 'news',
                displayDate: new Date(formData.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }),
                image: formData.image || 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Placeholder image
            };
            updatedNews = [newItem, ...news];
        }

        updateNews(updatedNews);
        setIsEditing(false);
    };

    const exportData = () => {
        const jsonString = JSON.stringify(news, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "news_data.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (isEditing) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        {currentNews ? "Yangilikni tahrirlash" : "Yangi yangilik qo'shish"}
                    </h2>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Bekor qilish
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sarlavha</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Sana</label>
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rasm URL</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Qisqacha mazmuni</label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            rows="3"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">To'liq matn</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows="10"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                        >
                            Bekor qilish
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 shadow-md hover:shadow-lg transition-all"
                        >
                            Saqlash
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Yangiliklar</h2>
                    <p className="text-gray-500 text-sm">Jami {news.length} ta yangilik</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={exportData}
                        className="px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-white hover:border-gray-400 transition-all flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Export JSON
                    </button>
                    <button
                        onClick={handleAddNew}
                        className="px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Qo'shish
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Sarlavha</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Sana</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm text-right">Amallar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {news.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                                            <div>
                                                <h4 className="text-gray-900 font-medium text-sm line-clamp-1">{item.title}</h4>
                                                <p className="text-gray-500 text-xs line-clamp-1 mt-0.5">{item.excerpt}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                                        {item.displayDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Tahrirlash"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="O'chirish"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NewsManager;
