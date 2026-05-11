"use client";
import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthProvider";
import { logout } from "@/services/authService";

export default function Userinfo() {
    const { user, setUser, loading } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        setUser(null);
    };

    const handleSwitchToAdmin = () => {
        window.location.href = "/admin";
    };

    // Hiển thị loading state khi đang khôi phục authentication
    if (loading) {
        return (
            <div className="flex items-center space-x-4">
                <div className="px-3 py-1 rounded bg-gray-200 text-gray-400 animate-pulse">
                    Đang tải...
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center space-x-4">
            {!user ? (
                <Link
                    href="/login"
                    className="px-3 py-1 rounded hover:bg-blue-100 hover:text-blue-800 transition-colors">
                    Đăng nhập
                </Link>
            ) : (
                <>
                    <Link
                        href="/profile"
                        className="px-3 py-1 rounded hover:bg-blue-100 hover:text-blue-800 transition-colors">
                        Thông tin
                    </Link>
                    {((user.role === "admin") || user.isAdmin) && (
                        <button
                            onClick={handleSwitchToAdmin}
                            className="rounded bg-green-600 px-3 py-1 text-sm hover:bg-green-700"
                        >
                            Chuyển sang quản trị
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 transition-colors">
                        Logout
                    </button>
                </>
            )}
        </div>
    );
}