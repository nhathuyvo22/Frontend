"use client";

export default function ResetFilter({
    setParams,
    defaultParams,
    setSearchKey
}) {

    const handleReset = () => {
        setParams(defaultParams);
        setSearchKey("");
    };

    return (
        <button
            type="button"
            onClick={handleReset}
            className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-black-600"
        >
            Reset bộ lọc
        </button>
    );
}