import { useState } from 'react';

const SettingsPage = () => {
    const [siteName, setSiteName] = useState('Jizzax davlat pedagogika universiteti');
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [theme, setTheme] = useState('light');
    const [notifications, setNotifications] = useState(true);

    const handleSave = () => {
        alert('Sozlamalar saqlandi (Test rejimida)');
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tizim Sozlamalari</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* General Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                        Umumiy Sozlamalar
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sayt Nomi</label>
                            <input
                                type="text"
                                value={siteName}
                                onChange={(e) => setSiteName(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-gray-800">Texnik Xizmat Rejimi</h4>
                                <p className="text-sm text-gray-500">Saytni vaqtincha yopish</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={maintenanceMode}
                                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Appearance */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                        Ko'rinish
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mavzu</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                            >
                                <option value="light">Yorug' (Light)</option>
                                <option value="dark">Qorong'u (Dark)</option>
                                <option value="system">Tizim moslashuvi</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-gray-800">Bildirishnomalar</h4>
                                <p className="text-sm text-gray-500">Sayt yangiliklari haqida xabar olish</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={notifications}
                                    onChange={(e) => setNotifications(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                        Xavfsizlik
                    </h3>

                    <div className="max-w-md">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Joriy Parol</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Yangi Parol</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Parolni Tasdiqlash</label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <button className="bg-gray-800 text-white px-6 py-2.5 rounded-lg hover:bg-gray-900 transition-colors shadow-md">
                            Parolni O'zgartirish
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-8 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all transform active:scale-95 duration-200"
                >
                    Barcha o'zgarishlarni saqlash
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
