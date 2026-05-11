import axiosInstance from "../lib/axiosInstance.js";

// 1. Lấy danh sách contact
export const getContacts = async (params = {}) => {
    const res = await axiosInstance.get("/contacts", {
        params: params
    });
    return res.data;
};

// 2. Lấy contact theo ID
export const getContactById = async (id) => {
    const res = await axiosInstance.get(`/contacts/${id}`);
    return res.data;
};

// 3. Tạo contact
export const createContact = async (data) => {
    const res = await axiosInstance.post("/contacts", data);
    return res.data;
};

// 4. Update contact
export const updateContact = async (id, data) => {
    const res = await axiosInstance.put(`/contacts/${id}`, data);
    return res.data;
};

// 5. Xoá contact
export const deleteContact = async (id) => {
    const res = await axiosInstance.delete(`/contacts/${id}`);
    return res.data;
};