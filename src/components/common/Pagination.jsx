const Pagination = ({ currentPage, totalPages, onPageChange, hasNext, hasPrevious }) => {
    return (
        <div className="flex items-center justify-center gap-4 mt-12">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!hasPrevious}
                className="px-6 py-3 bg-white border-2 border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200 transition-all"
            >
                ← Oldingi
            </button>
            
            <span className="px-6 py-3 bg-primary-500 text-white rounded-lg font-bold">
                {currentPage}-sahifa {totalPages ? `/ ${totalPages}` : ''}
            </span>
            
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!hasNext}
                className="px-6 py-3 bg-white border-2 border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-primary-500 hover:text-white hover:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200 transition-all"
            >
                Keyingi →
            </button>
        </div>
    );
};

export default Pagination;
