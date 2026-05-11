"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminTable from "@/components/admin/table/AdminTable";
import Pagination from "@/components/common/Pagination";
import { getCategories, deleteCategory } from "@/services/categoryService";

const columns = [
    { key: "cat_id", label: "ID" },
    { key: "cat_name", label: "Category Name" },
    { key: "status", label: "Status" },
];

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [params, setParams] = useState({ page: 1, limit: 10 });

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getCategories({ ...params, trash: 0 });
                setCategories(data?.data || data || []);
            } catch (e) {
                setError(e.message || "Không tải được danh mục!");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [params]);

    const handleEdit = (category) => {
        const id = category.cat_id;
        if (id) {
            router.push(`/admin/categories/${id}`);
        }
    };

    const handleDelete = async (category) => {
        const confirmDelete = window.confirm(
            `Bạn có chắc muốn xóa "${category.cat_name}" không?`
        );

        if (!confirmDelete) return;

        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const id = category.cat_id;
            await deleteCategory(id);

            setSuccess("Xóa danh mục thành công!");

            setParams((prev) => ({ ...prev }));
        } catch (e) {
            setError(e.message || "Xóa thất bại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 text-slate-800">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
                Admin Categories
            </h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {success && <p className="text-green-500 mb-4">{success}</p>}

            {loading ? (
                <p>Đang tải danh sách danh mục...</p>
            ) : (
                <>
                    <AdminTable
                        columns={columns}
                        data={categories}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    <Pagination
                        params={params}
                        setParams={setParams}
                    />
                </>
            )}
        </div>
    );
}