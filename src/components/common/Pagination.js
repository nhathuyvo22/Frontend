import React from "react";

export default function Pagination({
    totalPages = 1,
    params = {},
    onChangeParams,
}) {
    const currentPage = params.page || 1;
    const startPage = Math.max(1, currentPage - 3);
    const endPage = Math.min(totalPages, currentPage + 3);

    const handleClick = (newPage) => {
        if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
        onChangeParams &&
            onChangeParams({
                ...params,
                page: newPage,
            });
    };

    return (
        <div id="pagination" className="flex flex-wrap gap-2 items-center justify-center py-4">
            <button
                onClick={() => handleClick(1)}
                disabled={currentPage === 1}
                className="rounded px-3 py-1 bg-slate-800 text-slate-100 disabled:opacity-50"
            >
                First
            </button>
            <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded px-3 py-1 bg-slate-800 text-slate-100 disabled:opacity-50"
            >
                Previous
            </button>
            {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                const p = startPage + i;
                return (
                    <button
                        key={p}
                        onClick={() => handleClick(p)}
                        disabled={p === currentPage}
                        className={`rounded px-3 py-1 bg-slate-800 text-slate-100 ${p === currentPage ? "font-bold bg-yellow-500 text-black" : "hover:bg-slate-700"}`}
                    >
                        {p}
                    </button>
                );
            })}
            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="rounded px-3 py-1 bg-slate-800 text-slate-100 disabled:opacity-50"
            >
                Next
            </button>
            <button
                onClick={() => handleClick(totalPages)}
                disabled={currentPage === totalPages}
                className="rounded px-3 py-1 bg-slate-800 text-slate-100 disabled:opacity-50"
            >
                Last
            </button>
        </div>
    );
}
