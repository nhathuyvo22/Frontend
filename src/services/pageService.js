import axiosInstance from "../lib/axiosInstance.js";

// 1. Lấy danh sách page
export const getPages = async (params = {}) => {
    const res = await axiosInstance.get("/pages", {
        params: params
    });
    return res.data;
};

// 2. Lấy page theo ID
export const getPageById = async (id) => {
    const res = await axiosInstance.get(`/pages/${id}`);
    return res.data;
};

// 3. Tạo page
export const createPage = async (data) => {
    const res = await axiosInstance.post("/pages", data);
    return res.data;
};

// 4. Update page
export const updatePage = async (id, data) => {
    const res = await axiosInstance.put(`/pages/${id}`, data);
    return res.data;
};

// 5. Xoá page
export const deletePage = async (id) => {
    const res = await axiosInstance.delete(`/pages/${id}`);
    return res.data;
};