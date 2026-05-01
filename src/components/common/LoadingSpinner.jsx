const LoadingSpinner = ({ size = 'medium', text = 'Yuklanmoqda...' }) => {
    const sizeClasses = {
        small: 'w-8 h-8 border-2',
        medium: 'w-12 h-12 border-3',
        large: 'w-16 h-16 border-4',
    };

    return (
        <div className="flex flex-col items-center justify-center py-20">
            <div
                className={`${sizeClasses[size]} border-primary-200 border-t-primary-600 rounded-full animate-spin`}
            ></div>
            {text && (
                <p className="mt-4 text-slate-600 font-medium">{text}</p>
            )}
        </div>
    );
};

export default LoadingSpinner;
