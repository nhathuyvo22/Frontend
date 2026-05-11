"use client";
import { useEffect, useState } from "react";

export default function AdminHeader() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user") || "{}");
    setUser(data);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleSwitchToShop = () => {
    window.location.href = "/shop";
  };

  return (
    <header className="bg-slate-800 border-b border-slate-700 text-slate-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div>
          <span className="text-sm text-slate-300">Xin chào,</span>
          <strong className="ml-2 text-lg text-white">{user.fullname || user.username || 'Admin'}</strong>
        </div>

        <div className="flex items-center gap-2">
          {user.role === "admin" || user.isAdmin ? (
            <button
              className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500"
              onClick={handleSwitchToShop}
            >
              Sang Shop
            </button>
          ) : null}

          <button
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            onClick={handleLogout}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}
