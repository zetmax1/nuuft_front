import { useState, useEffect } from 'react';
import { getStructure, saveStructure } from '../../utils/storage';

const StructureManager = () => {
    const [structure, setStructure] = useState(null);
    const [activeTab, setActiveTab] = useState('topManagement');
    const [editingNode, setEditingNode] = useState(null);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setStructure(getStructure());
    }, []);

    if (!structure) return <div>Yuklanmoqda...</div>;

    const tabs = [
        { id: 'topManagement', label: 'Yuqori Boshqaruv' },
        { id: 'branches', label: 'Direktor O\'rinbosarlari' },
        { id: 'departments', label: 'Bo\'limlar' },
        { id: 'centralUnits', label: 'Markaziy Bo\'limlar' },
        { id: 'directSubordinates', label: 'To\'g\'ridan-to\'g\'ri Bo\'ysunuvchi' },
        { id: 'bottomSection', label: 'Registrator' },
        { id: 'facultiesSection', label: 'Fakultetlar' }
    ];

    const handleEdit = (node) => {
        setEditingNode(node);
        setFormData({
            title: node.title,
            headName: node.head?.name || '',
            headTitle: node.head?.title || '',
            headEmail: node.head?.email || '',
            headPhone: node.head?.phone || ''
        });
    };

    const handleSave = (e) => {
        e.preventDefault();

        // Deep copy structure to avoid direct mutation
        const newStructure = JSON.parse(JSON.stringify(structure));

        // Find and update the node in the active section
        const sectionIndex = newStructure[activeTab].findIndex(n => n.id === editingNode.id);
        if (sectionIndex !== -1) {
            newStructure[activeTab][sectionIndex] = {
                ...newStructure[activeTab][sectionIndex],
                title: formData.title,
                head: {
                    ...newStructure[activeTab][sectionIndex].head,
                    name: formData.headName,
                    title: formData.headTitle,
                    email: formData.headEmail,
                    phone: formData.headPhone
                }
            };

            setStructure(newStructure);
            saveStructure(newStructure);
            setEditingNode(null);
        }
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Tuzilma Boshqaruvi</h2>
                    <p className="text-gray-500 text-sm">Universitet tashkiliy tuzilmasini o'zgartirish</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto pb-2 border-b border-gray-200 mb-6 gap-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors ${activeTab === tab.id
                                ? 'bg-primary-50 text-primary-700'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Bo'lim Nomi</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Rahbar</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Lavozim</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Kontakt</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-sm text-right">Amallar</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {structure[activeTab]?.map((node) => (
                                <tr key={node.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="font-medium text-gray-900">{node.title}</span>
                                        {node.staff && (
                                            <div className="text-xs text-gray-400 mt-1">
                                                {node.staff.length} xodim
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {node.head?.name || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {node.head?.title || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {node.head?.email || '-'}
                                        {node.head?.phone && <div className="text-xs text-gray-400">{node.head.phone}</div>}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-end">
                                            <button
                                                onClick={() => handleEdit(node)}
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Tahrirlash"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

            {/* Edit Modal */}
            {editingNode && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">Tahrirlash</h3>
                            <button onClick={() => setEditingNode(null)} className="text-gray-500 hover:text-gray-700">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bo'lim Nomi</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rahbar F.I.Sh</label>
                                <input
                                    type="text"
                                    value={formData.headName}
                                    onChange={(e) => setFormData({ ...formData, headName: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lavozim</label>
                                <input
                                    type="text"
                                    value={formData.headTitle}
                                    onChange={(e) => setFormData({ ...formData, headTitle: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={formData.headEmail}
                                        onChange={(e) => setFormData({ ...formData, headEmail: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                                    <input
                                        type="text"
                                        value={formData.headPhone}
                                        onChange={(e) => setFormData({ ...formData, headPhone: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditingNode(null)}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                                >
                                    Bekor qilish
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 shadow-sm"
                                >
                                    Saqlash
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StructureManager;
