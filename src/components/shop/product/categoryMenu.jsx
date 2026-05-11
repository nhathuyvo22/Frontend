import Button from "@/components/common/Button.js";
export default function CategoryMenu({ categories, params, setParams }) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-white px-5 py-3 border-b border-gray-200">
                <h2 className="text-black font-bold uppercase text-sm tracking-wider">
                    Danh mục sản phẩm
                </h2>
            </div>

            <div className="p-3 flex flex-col gap-2">
                {categories.map((cat) => (
                    <Button key={cat.cat_id} params={params} setParams={setParams} category_name={cat.cat_name}>
                        <span className="flex items-center justify-between w-full">
                            {cat.cat_name}
                            <span className="text-gray-500 text-xs">→</span>
                        </span>
                    </Button>
                ))}
            </div>
        </div>
    );
}