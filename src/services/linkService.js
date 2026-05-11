import axiosInstance from "../axiosInstance.js";

// 1. Lấy danh sách link
export const getLinks = async (params = {}) => {
    const res = await axiosInstance.get("/links", {
        params: params
    });
    return res.data;
};

// 2. Lấy link theo ID
export const getLinkById = async (id) => {
    const res = await axiosInstance.get(`/links/${id}`);
    return res.data;
};

// 3. Tạo link
export const createLink = async (data) => {
    const res = await axiosInstance.post("/links", data);
    return res.data;
};

// 4. Update link
export const updateLink = async (id, data) => {
    const res = await axiosInstance.put(`/links/${id}`, data);
    return res.data;
};

// 5. Xoá link
export const deleteLink = async (id) => {
    const res = await axiosInstance.delete(`/links/${id}`);
    return res.data;
};