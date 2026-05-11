import axiosInstance from "@/lib/axiosInstance";

export const getUsers = async (params = {}) => {
    const res = await axiosInstance.get("/users", { params });
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
};