import axiosInstance from "../lib/axiosInstance.js";

// 5.1
export const getOrders = async (params = {}) => {
    const res = await axiosInstance.get("/orders", { params });
    return res.data;
};

// 5.2
export const getOrderById = async (id) => {
    const res = await axiosInstance.get(`/orders/${id}`);
    return res.data;
};

// 5.3
export const createOrder = async (data) => {
    const res = await axiosInstance.post("/orders", data);
    return res.data;
};

// 5.4 update status
export const updateOrderStatus = async (id, status) => {
    const res = await axiosInstance.put(`/orders/${id}`, { status });
    return res.data;
};

// 5.5 delete
export const deleteOrder = async (id) => {
    const res = await axiosInstance.delete(`/orders/${id}`);
    return res.data;
};
export const uploadSingleFile = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axiosInstance.post("/upload/single", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
};
export const restoreOrder = async (id) => {
    const res = await axiosInstance.put(`/orders/${id}`, { trash: 0 });
    return res.data;
};