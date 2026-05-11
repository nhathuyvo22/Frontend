"use client";
import { useEffect, useState } from "react";
import Select from "@/components/common/Select";
import { getCategories } from "@/services/categoryService";

export default function CategorySelect({ name, value, onChange }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getCategories({ trash: 0 });
                setCategories(data);
            } catch (e) {
                setError(e.data?.error || { message: e.message || "Lỗi tải danh mục" });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {error ? (
                <p className="text-red-400">{error.message || "Lỗi tải danh mục"}</p>
            ) : loading ? (
                <p className="text-slate-200">Đang tải danh mục...</p>
            ) : (
                <Select
                    options={categories}
                    labelKey="cat_name"
                    valueKey="cat_id"
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    );
}
