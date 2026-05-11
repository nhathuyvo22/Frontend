"use client";
import { useState } from "react";
import { uploadSingleFile } from "@/services/uploadService";

export default function UploadSingleFile({ onUploadSuccess }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        if (!file) return alert("Vui lòng chọn file");
        try {
            setLoading(true);
            const res = await uploadSingleFile(file);

            const fileName = res.file.split("/").pop();
            onUploadSuccess(fileName);
            alert("Upload ảnh thành công!");
        } catch (err) {
            alert("Upload thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4 p-4 border border-slate-700 rounded-lg">
            <input type="file" onChange={handleChange} className="text-sm" />
            {preview && <img src={preview} alt="preview" className="w-32 h-32 object-cover" />}
            <button
                type="button"
                onClick={handleUpload}
                disabled={loading}
                className="bg-blue-500 px-4 py-1 rounded text-white"
            >
                {loading ? "Đang lên..." : "Xác nhận ảnh"}
            </button>
        </div>
    );
}