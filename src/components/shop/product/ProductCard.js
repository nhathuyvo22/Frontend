"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <div className="product-card w-full shadow-sm bg-blue-100 rounded-xl overflow-hidden">
            <Link href={'/products/' + product.product_id}>
                <img
                    className="w-full h-auto object-contain"
                    src={process.env.NEXT_PUBLIC_IMG_URL + product.image}
                    alt={product.name}
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.product_name}</h3>
                    <p className="text-base font-medium text-gray-800 mb-4">{product.price} đ</p>
                </div>
            </Link>
            <div className="flex gap-2">
                <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                    Thêm vào giỏ
                </button>
                <Link href={`/products/${product.product_id}`}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
}