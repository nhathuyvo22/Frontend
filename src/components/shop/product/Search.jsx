"use client";

export default function Search({ setParams, searchKey, setSearchKey }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        setParams((prev) => ({
            ...prev,
            name: searchKey,
            page: 1
        }));
    };

    return (
        <form className="flex flex-col gap-2 w-full" onSubmit={handleSubmit}>
            <input
                type="search"
                value={searchKey}
                placeholder="Tìm kiếm..."
                className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) => setSearchKey(e.target.value)}
            />
            <div className="flex gap-2">
                <input
                    type="number"
                    placeholder="Giá min"
                    className="w-1/2 px-3 py-2 border rounded-lg"
                    onChange={(e) => setParams(prev => ({ ...prev, price_min: e.target.value, page: 1 }))}
                />
                <input
                    type="number"
                    placeholder="Giá max"
                    className="w-1/2 px-3 py-2 border rounded-lg"
                    onChange={(e) => setParams(prev => ({ ...prev, price_max: e.target.value, page: 1 }))}
                />
                <input
                    type="text"
                    placeholder="Tìm theo tag..."
                    className="w-full px-4 py-2 border rounded-lg"
                    onChange={(e) => setParams(prev => ({ ...prev, tag: e.target.value, page: 1 }))}
                />
            </div>
            <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg"
            >
                Tìm
            </button>
        </form>
    );
}