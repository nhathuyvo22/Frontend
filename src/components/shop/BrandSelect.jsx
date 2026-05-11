"use client";
import { useEffect, useState } from "react";
import Select from "@/components/common/Select";
import { getBrands } from "@/services/brandService";

export default function BrandSelect({ name, value, onChange }) {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getBrands({ trash: 0 });
                setBrands(data);
            } catch (e) {
                setError(e.data?.error || { message: e.message || "Lỗi tải thương hiệu" });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {error ? (
                <p className="text-red-400">{error.message || "Lỗi tải thương hiệu"}</p>
            ) : loading ? (
                <p className="text-slate-200">Đang tải thương hiệu...</p>
            ) : (
                <Select
                    options={brands}
                    labelKey="brand_name"
                    valueKey="brand_id"
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            )}
        </div>
    );
}
