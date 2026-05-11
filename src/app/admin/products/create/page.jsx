"use client";
import { useState } from "react";
import { isEmpty, validateProduct } from "@/utils/validator.js";
import { addProducts } from "@/services/productService";
import CategorySelect from "@/components/shop/CategorySelect";
import BrandSelect from "@/components/shop/BrandSelect";
import UploadSingleFile from "@/components/uploadSingleFile";

const CreateForm = (props) => {
    const [success, setSuccess] = useState("");
    const [errors, setErrors] = useState({});

    const initialFormState = {
        product_name: "",
        alias: "",
        cat_id: 1,
        brand_id: 1,
        detail: "",
        price: "",
        sale_price: 200,
        image: "",
        launch_date: "",
        tag: "",
        summary: "",
        status: 1,
        trash: 0,
        view: 50
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let newValue = value;
        if (type === "checkbox") {
            newValue = checked ? 1 : 0;
        } else if (type === "number") {
            newValue = value === "" ? "" : Number(value);
        }
        setFormData(prev => ({ ...prev, [name]: newValue }));
    };

    const handleUploadSuccess = (fileName) => {
        setFormData((prev) => ({
            ...prev,
            image: fileName
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");

        const validateErrors = validateProduct(formData);
        setErrors(validateErrors);
        if (!isEmpty(validateErrors)) return;

        try {
            await addProducts(formData);
            setSuccess("Thêm sản phẩm thành công!");
        } catch (error) {
            setErrors({ message: "Lỗi hệ thống khi thêm sản phẩm." });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-slate-900 rounded-2xl shadow-lg space-y-5">

            <h2 className="text-2xl font-bold text-yellow-400">Thêm sản phẩm</h2>
            {success && <p style={{ color: "green" }}>{success}</p>}
            {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Product Name */}
                <div>
                    <label className="block mb-1 text-sm">Tên sản phẩm</label>
                    {errors.product_name && <p style={{ color: "red" }}>{errors.product_name}</p>}
                    <input
                        type="text"
                        name="product_name"
                        className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={formData.product_name}
                        onChange={handleChange}
                    />

                </div>

                {/* Alias */}
                <div>
                    <label className="block mb-1 text-sm">Alias</label>
                    {errors.alias && <p style={{ color: "red" }}>{errors.alias}</p>}
                    <input type="text" name="alias"
                        className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
                        value={formData.alias}
                        onChange={handleChange}
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block mb-1 text-sm">Danh mục</label>
                    {errors.cat_id && <p style={{ color: "red" }}>{errors.cat_id}</p>}
                    <CategorySelect
                        name="cat_id"
                        value={formData.cat_id}
                        onChange={handleChange}
                    />
                </div>

                {/* Brand */}
                <div>
                    <label className="block mb-1 text-sm">Thương hiệu</label>
                    {errors.brand_id && <p style={{ color: "red" }}>{errors.brand_id}</p>}
                    <BrandSelect
                        name="brand_id"
                        value={formData.brand_id}
                        onChange={handleChange}
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block mb-1 text-sm">Giá gốc</label>
                    {errors.price && <p style={{ color: "red" }}>{errors.price}</p>}
                    <input type="number" name="price"
                        className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>

                {/* Sale Price */}
                <div>
                    <label className="block mb-1 text-sm">Giá khuyến mãi</label>
                    {errors.sale_price && <p style={{ color: "red" }}>{errors.sale_price}</p>}
                    <input type="number" name="sale_price"
                        className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
                        value={formData.sale_price}
                        onChange={handleChange}
                    />
                </div>

                {/* Launch Date */}
                <div>
                    <label className="block mb-1 text-sm">Ngày ra mắt</label>
                    {errors.launch_date && <p style={{ color: "red" }}>{errors.launch_date}</p>}
                    <input type="datetime-local" name="launch_date"
                        className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
                        value={formData.launch_date}
                        onChange={handleChange}
                    />
                </div>

                {/* View */}
                <div>
                    <label className="block mb-1 text-sm">Lượt xem</label>
                    {errors.view && <p style={{ color: "red" }}>{errors.view}</p>}
                    <input type="number" name="view"
                        className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
                        value={formData.view}
                        onChange={handleChange}
                    />
                </div>

            </div>

            {/* Textarea full width */}
            <div>
                <label className="block mb-1 text-sm">Mô tả ngắn</label>
                {errors.summary && <p style={{ color: "red" }}>{errors.summary}</p>}
                <input name="summary"
                    className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
                    value={formData.summary}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block mb-1 text-sm">Chi tiết</label>
                {errors.detail && <p style={{ color: "red" }}>{errors.detail}</p>}
                <textarea name="detail"
                    className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
                    value={formData.detail}
                    onChange={handleChange}
                ></textarea>
            </div>

            {/* Phần Upload Ảnh */}
            <div>
                <label className="block mb-2 text-sm">Hình ảnh sản phẩm</label>
                <UploadSingleFile onUploadSuccess={handleUploadSuccess} />
                {formData.image && <p className="text-xs text-green-400 mt-1">✓ Ảnh đã tải lên: {formData.image}</p>}
                {errors.image && <p className="text-red-400 text-xs mt-1">{errors.image}</p>}
            </div>

            {/* Tags */}
            <div>
                <label className="block mb-1 text-sm">Tags</label>
                {errors.tag && <p style={{ color: "red" }}>{errors.tag}</p>}
                <input type="text" name="tag"
                    className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
                    value={formData.tag}
                    onChange={handleChange}
                />
            </div>

            {/* Status & Trash */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-1 text-sm">Trạng thái</label>
                    {errors.status && <p style={{ color: "red" }}>{errors.status}</p>}
                    <select name="status"
                        className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="1">Hiển thị</option>
                        <option value="0">Ẩn</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 text-sm">Trash</label>
                    {errors.trash && <p style={{ color: "red" }}>{errors.trash}</p>}
                    <select name="trash"
                        className="w-full p-2 rounded-lg bg-    slate-800 border border-slate-700"
                        value={formData.trash}
                        onChange={handleChange}
                    >
                        <option value="0">Chưa xoá</option>
                        <option value="1">Đã xoá</option>
                    </select>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
                <button type="submit"
                    className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition">
                    Thêm sản phẩm
                </button>
                <button type="reset"
                    className="px-6 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition">
                    Nhập lại
                </button>
            </div>
        </form>
    );
};

export default CreateForm;