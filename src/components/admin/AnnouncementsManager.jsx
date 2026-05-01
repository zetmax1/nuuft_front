import { useState, useEffect } from 'react';
import { getAnnouncements, saveAnnouncements } from '../../utils/storage';

const AnnouncementsManager = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAnnouncement, setCurrentAnnouncement] = useState(null);

    useEffect(() => {
        setAnnouncements(getAnnouncements());
    }, []);

    const updateAnnouncements = (newData) => {
        setAnnouncements(newData);
        saveAnnouncements(newData);
    };

    // Form states
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        excerpt: '',
        content: ''
    });

    const handleEdit = (item) => {
        setCurrentAnnouncement(item);
        setFormData({
            title: item.title,
            date: item.date || new Date().toISOString().split('T')[0],
            excerpt: item.excerpt,
            content: item.content
        });
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Rostdan ham ushbu e'lonni o'chirmoqchimisiz?")) {
            const updated = announcements.filter(item => item.id !== id);
            updateAnnouncements(updated);
        }
    };

    const handleAddNew = () => {
        setCurrentAnnouncement(null);
        setFormData({
            title: '',
            date: new Date().toISOString().split('T')[0],
            excerpt: '',
            content: ''
        });
        setIsEditing(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let updatedData;
        if (currentAnnouncement) {
            // Update existing
            updatedData = announcements.map(item =>
                item.id === currentAnnouncement.id
                    ? {
                        ...item,
                        ...formData,
                        displayDate: new Date(formData.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })
                    }
                    : item
            );
        } else {
            // Create new
            const newId = `a${Date.now()}`;
            const newItem = {
                id: newId,
                ...formData,
                type: 'announcement',
                displayDate: new Date(formData.date).toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' }),
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                )
            };
            updatedData = [newItem, ...announcements];
        }

        updateAnnouncements(updatedData);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        {currentAnnouncement ? "E'lonni tahrirlash" : "Yangi e'lon qo'shish"}
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
                    <h2 className="text-2xl font-bold text-gray-800">E'lonlar Boshqaruvi</h2>
                    <p className="text-gray-500 text-sm">Jami {announcements.length} ta e'lon</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleAddNew}
                        className="px-6 py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        E'lon Qo'shish
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
                            {announcements.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div>
                                            <h4 className="text-gray-900 font-medium text-sm line-clamp-1">{item.title}</h4>
                                            <p className="text-gray-500 text-xs line-clamp-1 mt-0.5">{item.excerpt}</p>
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

export default AnnouncementsManager;
