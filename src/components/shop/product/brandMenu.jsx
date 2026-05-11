import Button from "@/components/common/Button.js";

export default function BrandMenu({ brands, params, setParams }) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 mt-4">
            <div className="bg-white px-5 py-3 border-b border-gray-200">
                <h2 className="text-black font-bold uppercase text-sm tracking-wider">
                    Thương hiệu
                </h2>
            </div>

            <div className="p-3 flex flex-col gap-2">
                {brands.map((brand) => (
                    <button
                        key={brand.brand_id}
                        className="px-4 py-2 rounded-md w-full text-left bg-gray-100 text-black hover:bg-blue-600 hover:text-white transition-colors duration-200 cursor-pointer mb-2"
                        onClick={() => setParams(prev => ({ ...prev, brand: brand.brand_name, page: 1 }))}
                    >
                        <span className="flex items-center justify-between w-full">
                            {brand.brand_name}
                            <span className="text-gray-500 text-xs">→</span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}