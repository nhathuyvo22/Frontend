'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUsers } from '@/services/userService';
import { getProducts } from '@/services/productService';
import { getOrders } from '@/services/orderService';

export default function AdminDashboard() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        revenue: 0
    });

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            if (user.user_type === "admin") {
                setIsAuthorized(true);
            } else {
                alert("Bạn không có quyền truy cập vào trang quản trị!");
                router.push("/");
            }
        } else {
            router.push("/");
        }
    }, [router]);

    useEffect(() => {
        if (!isAuthorized) return;
        const fetchStats = async () => {
            try {
                const [users, products, orders] = await Promise.all([
                    getUsers({ trash: 0 }),
                    getProducts({ trash: 0, limit: 1 }),
                    getOrders({ trash: 0 })
                ]);

                const revenue = orders?.data?.reduce((sum, o) => sum + (o.total || 0), 0) || 0;

                setStats({
                    users: users?.length || 0,
                    products: products?.totalItems || 0,
                    orders: orders?.data?.length || 0,
                    revenue
                });
            } catch (e) {
                console.log(e);
            }
        };
        fetchStats();
    }, [isAuthorized]);

    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                    <p className="text-slate-300">Chào mừng Quản trị viên quay lại hệ thống</p>
                </div>
                <Link href="/"
                    className="flex items-center justify-center gap-2 bg-slate-800 border border-slate-600 px-4 py-2 rounded-lg text-white hover:bg-slate-700 transition shadow-sm">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span>Xem cửa hàng</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-slate-700 p-4 rounded border border-slate-600">
                    <p className="text-slate-300 text-sm">Người dùng</p>
                    <p className="text-2xl font-bold text-white">{stats.users}</p>
                </div>
                <div className="bg-slate-700 p-4 rounded border border-slate-600">
                    <p className="text-slate-300 text-sm">Sản phẩm</p>
                    <p className="text-2xl font-bold text-white">{stats.products}</p>
                </div>
                <div className="bg-slate-700 p-4 rounded border border-slate-600">
                    <p className="text-slate-300 text-sm">Đơn hàng</p>
                    <p className="text-2xl font-bold text-white">{stats.orders}</p>
                </div>
                <div className="bg-slate-700 p-4 rounded border border-slate-600">
                    <p className="text-slate-300 text-sm">Doanh thu</p>
                    <p className="text-2xl font-bold text-white">₫ {stats.revenue.toLocaleString("vi-VN")}</p>
                </div>
            </div>

            <div className="bg-slate-700 p-4 rounded border border-slate-600">
                <h2 className="text-xl font-bold text-white mb-4">Hành động nhanh</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <Link href="/admin/products/create" className="bg-blue-600 px-4 py-2 rounded text-center text-white hover:bg-blue-500 transition">Thêm sản phẩm</Link>
                    <Link href="/admin/categories" className="bg-green-600 px-4 py-2 rounded text-center text-white hover:bg-green-500 transition">Danh mục</Link>
                    <Link href="/admin/orders" className="bg-purple-600 px-4 py-2 rounded text-center text-white hover:bg-purple-500 transition">Đơn hàng</Link>
                    <Link href="/admin/users" className="bg-orange-600 px-4 py-2 rounded text-center text-white hover:bg-orange-500 transition">Người dùng</Link>
                </div>
            </div>
        </div>
    );
}