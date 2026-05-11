"use client";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/services/orderService";
export default function CheckoutPage() {
    const { cart, total, } = useCart();

    const [formData, setFormData] = useState({
        user_id: "",
        customer_name: "",
        address: "",
        phone: "",
        email: "",
        total: 0,
        note: "",
        status: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
            order: { ...formData, total },
            details: cart
        }
        try {
            const res = await createOrder(data);
            console.log(res);
            alert("Đặt hàng thành công!");
        } catch (e) {
            console.log(e);
        }
    };


    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Thanh toán</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="customer_name" placeholder="Họ tên" onChange={handleChange}
                    className="w-full border px-4 py-2 rounded" />
                <input type="text" name="phone" placeholder="Số điện thoại" onChange={handleChange}
                    className="w-full border px-4 py-2 rounded" />
                <input type="email" name="email" placeholder="Email" onChange={handleChange}
                    className="w-full border px-4 py-2 rounded" />
                <input type="text" name="address" placeholder="Địa chỉ" onChange={handleChange}
                    className="w-full border px-4 py-2 rounded" />
                <textarea name="note" placeholder="Ghi chú" onChange={handleChange}
                    className="w-full border px-4 py-2 rounded" />

                <div className="text-lg font-semibold">
                    Tổng: {total.toLocaleString("vi-VN")} đ
                </div>

                <button type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                    Đặt hàng
                </button>
            </form>
        </div>
    );
};