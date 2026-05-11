"use client";
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "@/services/userService";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await getUsers({ trash: 0 });
            setUsers(res);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Xóa user này?")) return;
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (e) {
            console.log(e);
        }
    };

    if (loading) return <p>Đang tải...</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>
            <table className="w-full border text-sm">
                <thead className="bg-slate-700 text-white">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Username</th>
                        <th className="p-3">Họ tên</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Loại</th>
                        <th className="p-3">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="border-t text-white">
                            <td className="p-3">{user.user_id}</td>
                            <td className="p-3">{user.username}</td>
                            <td className="p-3">{user.fullname}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3">{user.user_type}</td>
                            <td className="p-3">
                                <button
                                    onClick={() => handleDelete(user.user_id)}
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