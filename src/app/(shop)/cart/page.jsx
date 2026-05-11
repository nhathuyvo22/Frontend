"use client";

import Link from "next/link";
import CartItem from "@/components/shop/cart/CartItem";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { cart, total, totalItems, removeFromCart, updateQuantity } = useCart();

    if (cart.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 mb-4">Giỏ hàng trống!</p>
                <Link href="/products" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Giỏ hàng ({totalItems} món)</h1>

            <div className="space-y-4 mb-6">
                {cart.map(item => (
                    <CartItem
                        key={item.product_id}
                        item={item}
                        onIncrement={() => updateQuantity(item.product_id, item.quantity + 1)}
                        onDecrement={() => updateQuantity(item.product_id, item.quantity - 1)}
                        onRemove={() => removeFromCart(item.product_id)}
                    />
                ))}
            </div>

            <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold mb-4">
                    <span>Tổng thanh toán</span>
                    <span>{total.toLocaleString("vi-VN")} đ</span>
                </div>
                <Link
                    href="/checkout"
                    className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                >
                    Thanh toán
                </Link>
            </div>
        </div>
    );
}   