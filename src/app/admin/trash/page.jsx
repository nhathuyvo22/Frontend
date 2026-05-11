"use client";
import { useEffect, useState } from "react";
import { getProducts, updateProducts } from "@/services/productService";
import { getOrders, restoreOrder } from "@/services/orderService";
import Link from "next/link";

export default function TrashPage() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState("products");

    const fetchData = async () => {
        try {
            setLoading(true);
            const [p, o] = await Promise.all([
                getProducts({ trash: 1 }),
                getOrders({ trash: 1 })
            ]);
            setProducts(p.data);
            setOrders(o.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRestoreProduct = async (id) => {
        await updateProducts(id, { trash: 0 });
        alert("Đã khôi phục sản phẩm!");
        fetchData();
    };

    const handleRestoreOrder = async (id) => {
        await restoreOrder(id);
        alert("Đã khôi phục đơn hàng!");
        fetchData();
    };

    if (loading) return <p className="p-6">Đang tải...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-red-400 mb-6">Thùng rác</h1>

            {/* Tab */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setTab("products")}
                    className={`px-4 py-2 rounded ${tab === "products" ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300"}`}>
                    Sản phẩm ({products.length})
                </button>
                <button
                    onClick={() => setTab("orders")}
                    className={`px-4 py-2 rounded ${tab === "orders" ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-300"}`}>
                    Đơn hàng ({orders.length})
                </button>
            </div>

            {/* Products */}
            {tab === "products" && (
                products.length === 0 ? <p className="text-gray-400">Không có sản phẩm nào.</p> : (
                    <table className="w-full border text-sm text-white">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Tên sản phẩm</th>
                                <th className="p-3 text-left">Giá</th>
                                <th className="p-3 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.product_id} className="border-t border-slate-600">
                                    <td className="p-3">{p.product_id}</td>
                                    <td className="p-3">{p.product_name}</td>
                                    <td className="p-3">{p.price?.toLocaleString("vi-VN")} đ</td>
                                    <td className="p-3 text-center">
                                        <button onClick={() => handleRestoreProduct(p.product_id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                                            Khôi phục
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}

            {/* Orders */}
            {tab === "orders" && (
                orders.length === 0 ? <p className="text-gray-400">Không có đơn hàng nào.</p> : (
                    <table className="w-full border text-sm text-white">
                        <thead className="bg-slate-700">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Khách hàng</th>
                                <th className="p-3 text-left">Tổng tiền</th>
                                <th className="p-3 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((o) => (
                                <tr key={o.order_id} className="border-t border-slate-600">
                                    <td className="p-3">{o.order_id}</td>
                                    <td className="p-3">{o.customer_name}</td>
                                    <td className="p-3">{o.total?.toLocaleString("vi-VN")} đ</td>
                                    <td className="p-3 text-center">
                                        <button onClick={() => handleRestoreOrder(o.order_id)}
                                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                                            Khôi phục
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            )}
        </div>
    );
}