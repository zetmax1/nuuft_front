import { useState, useEffect } from 'react';
import { getNews, getAnnouncements } from '../../utils/storage';

const StatCard = ({ title, count, icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800 tracking-tight">{count}</h3>
            </div>
            <div className={`p-4 rounded-xl ${color} bg-opacity-20`}>
                {icon}
            </div>
        </div>
    </div>
);

const AdminDashboard = ({ setActiveTab }) => {
    const [stats, setStats] = useState([]);
    const [latestNews, setLatestNews] = useState([]);
    const [latestAnnouncements, setLatestAnnouncements] = useState([]);

    useEffect(() => {
        const news = getNews();
        const announcements = getAnnouncements();

        setLatestNews(news.slice(0, 3));
        setLatestAnnouncements(announcements.slice(0, 3));

        setStats([
            {
                title: "Yangiliklar",
                count: news.length,
                color: "bg-blue-100 text-blue-600",
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                )
            },
            {
                title: "E'lonlar",
                count: announcements.length,
                color: "bg-green-100 text-green-600",
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                )
            },
            {
                title: "Bo'limlar",
                count: "64", // Dynamically calculating this is complex, static for now
                color: "bg-purple-100 text-purple-600",
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                )
            },
            {
                title: "Tashriflar",
                count: "45.2k",
                color: "bg-orange-100 text-orange-600",
                icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                )
            }
        ]);
    }, []);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Boshqaruv Paneli</h2>
                    <p className="text-gray-500 mt-1">Jizzax davlat pedagogika universiteti filiali boshqaruv tizimi</p>
                </div>
                <div className="hidden md:block text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
                    {new Date().toLocaleDateString('uz-UZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Latest News */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-800">So'nggi Yangiliklar</h3>
                            <button
                                onClick={() => setActiveTab('news')}
                                className="text-primary-600 text-sm font-medium hover:text-primary-700 hover:underline"
                            >
                                Barchasi
                            </button>
                        </div>
                        <div className="space-y-4">
                            {latestNews.length > 0 ? latestNews.map((news) => (
                                <div key={news.id} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0 group">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-primary-600 transition-colors">{news.title}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-primary-500 font-medium bg-primary-50 px-2 py-0.5 rounded-full">Yangilik</span>
                                            <span className="text-xs text-gray-400">{news.displayDate}</span>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-gray-400">
                                    Hozircha yangiliklar yo'q
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Latest Announcements */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-800">So'nggi E'lonlar</h3>
                            <button
                                onClick={() => setActiveTab('announcements')}
                                className="text-primary-600 text-sm font-medium hover:text-primary-700 hover:underline"
                            >
                                Barchasi
                            </button>
                        </div>
                        <div className="space-y-4">
                            {latestAnnouncements.length > 0 ? latestAnnouncements.map((item) => (
                                <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0 group">
                                    <div className="w-12 h-12 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                                        {item.icon || (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-green-700 transition-colors">{item.title}</h4>
                                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.excerpt}</p>
                                        <span className="text-xs text-gray-400 mt-1 block">{item.displayDate}</span>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-gray-400">
                                    Hozircha e'lonlar yo'q
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Tezkor Harakatlar</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <button
                            onClick={() => setActiveTab('news')}
                            className="p-4 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors text-left flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-white bg-opacity-60 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                            <span className="font-medium">Yangi yangilik qo'shish</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('announcements')}
                            className="p-4 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 transition-colors text-left flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-white bg-opacity-60 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                </svg>
                            </div>
                            <span className="font-medium">Yangi e'lon qo'shish</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('structure')}
                            className="p-4 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors text-left flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-white bg-opacity-60 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <span className="font-medium">Tuzilmani tahrirlash</span>
                        </button>

                        <button
                            onClick={() => setActiveTab('settings')}
                            className="p-4 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors text-left flex items-center gap-3 group"
                        >
                            <div className="w-10 h-10 rounded-lg bg-white bg-opacity-60 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="font-medium">Sozlamalar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
