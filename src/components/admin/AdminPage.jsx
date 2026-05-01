import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';

const AdminPage = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!isAuthenticated) {
        return (
            <AdminLogin onLogin={() => setIsAuthenticated(true)} />
        );
    }

    return (
        <AdminLayout onLogout={() => setIsAuthenticated(false)} />
    );
};

export default AdminPage;
