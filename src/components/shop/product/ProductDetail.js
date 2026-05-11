"use client";
import { useCart } from "@/context/CartContext";

export default function ProductDetail({ product }) {
    const { addToCart } = useCart();

    if (!product) {
        return <p>Không có sản phẩm</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 border rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                    <img
                        src={process.env.NEXT_PUBLIC_IMG_URL + product.image}
                        alt={product.product_name}
                        className="w-full h-auto rounded-lg"
                    />
                </div>

                <div>
                    <h1 className="text-2xl font-bold mb-2">
                        {product.product_name}
                    </h1>

                    <p className="text-red-500 text-xl mb-4">
                        {product.price} đ
                    </p>

                    <p className="text-gray-700 mb-4">
                        {product.description}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Thêm vào giỏ
                    </button>
                </div>

            </div>
        </div>
    );
}