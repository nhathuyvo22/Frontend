"use client";
import AdminHeader from "@/components/admin/AdminHeader";
import Sidebar from "@/components/admin/Sidebar";
import Footer from "@/components/shop/Footer";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  useEffect(() => {
    // Kiểm tra authentication khi component mount
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token || (user.role !== 'admin' && !user.isAdmin)) {
      // Nếu không có token hoặc không phải admin, chuyển hướng về login
      window.location.href = "/login";
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <AdminHeader />
      <div className="flex">
        <aside className="w-64 bg-slate-800 border-r border-slate-700">
          <Sidebar />
        </aside>
        <main className="flex-1 p-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
