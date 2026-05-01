import { useNavigate } from 'react-router-dom';
import React from 'react';
import UniversitySystems from './UniversitySystems';

const SystemsPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-surface-100">
            <div className="container mx-auto max-w-7xl">
                <button
                    onClick={() => navigate('/')}
                    className="mb-8 flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Bosh sahifaga qaytish
                </button>
            </div>

            {/* Reusing the existing UniversitySystems component but slightly wrapped or just displaying it */}
            {/* Since the user wants a separate page, we can assume they might want the same content but on a dedicated route */}

            <UniversitySystems />

        </div>
    );
};

export default SystemsPage;
