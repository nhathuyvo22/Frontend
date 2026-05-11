"use client";
import { useEffect, useState } from "react";
import { deleteOrder, getOrders, updateOrderStatus } from "@/services/orderService";
import { softDeleteProducts } from "@/services/productService";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await getOrders();
            setOrders(res.data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await updateOrderStatus(id, status);
            fetchOrders();
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Xóa đơn hàng này?")) return;
        try {
            await deleteOrder(id);
            fetchOrders();
        } catch (e) {
            console.log(e);
        }
    };

    if (loading) return <p>Đang tải...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Quản lý đơn hàng</h1>
            <table className="w-full border text-sm">
                <thead className="bg-slate-700 text-white">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Khách hàng</th>
                        <th className="p-3">SĐT</th>
                        <th className="p-3">Tổng tiền</th>
                        <th className="p-3">Trạng thái</th>
                        <th className="p-3">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {orders

                        .filter((order) => order.trash === 0 || order.trash === "0" || order.trash === null)
                        .map((order, index) => (
                            <tr key={index} className="border-t text-white">
                                <td className="p-3">{order.order_id}</td>
                                <td className="p-3">{order.customer_name}</td>
                                <td className="p-3">{order.phone}</td>
                                <td className="p-3">{order.total?.toLocaleString("vi-VN")} đ</td>
                                <td className="p-3">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                                        className="bg-slate-800 text-white rounded px-2 py-1"
                                    >
                                        <option value="1">Chờ xử lý</option>
                                        <option value="2">Đã giao</option>
                                    </select>
                                </td>
                                <td className="p-3">
                                    <button
                                        onClick={() => handleDelete(order.order_id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}