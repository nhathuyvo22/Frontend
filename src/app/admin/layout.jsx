"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar"; // Giả sử đây là đường dẫn Sidebar của bạn

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      const user = JSON.parse(userData);
      if (user.user_type === "admin") {
        setIsAuthorized(true);
      } else {
        alert("Cảnh báo: Bạn không có quyền truy cập khu vực quản trị!");
        router.replace("/");
      }
    } else {
      router.replace("/");
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900">
      <aside className="w-64 fixed inset-y-0 left-0 z-50 bg-slate-800 border-r border-slate-700">
        <Sidebar />
      </aside>


      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}