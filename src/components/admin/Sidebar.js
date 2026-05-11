'use client';

import { adminMenu } from "@/data/adminMenu";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const [displayName, setDisplayName] = useState("Admin");

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            const name = user.fullname || user.username || "Admin";
            setDisplayName(name);
        }
    }, []);

    const handleLogout = () => {
        if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
            localStorage.removeItem("user");
            window.location.href = "/";
        }
    };

    return (
        <aside className="h-full bg-slate-800 p-4 text-slate-100 flex flex-col">
            <div className="mb-8 border-b border-slate-700 pb-4">
                <h3 className="text-sm text-slate-400 uppercase tracking-wider">Hệ thống quản trị</h3>
                <p className="mt-2 text-lg font-bold text-white leading-tight">
                    Xin chào, <br />
                    <span className="text-sky-400">{displayName}</span>
                </p>
            </div>

            <nav className="space-y-2 flex-1">
                {adminMenu.map(item => (
                    <div key={item.href}>
                        <a
                            href={item.href}
                            className="block rounded px-3 py-2 text-slate-100 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                            {item.label}
                        </a>
                    </div>
                ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-slate-700">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded px-3 py-2 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all font-medium"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Đăng xuất
                </button>
            </div>
        </aside>
    );
}