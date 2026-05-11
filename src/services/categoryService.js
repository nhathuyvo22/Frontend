import axiosInstance from "@/lib/axiosInstance";



// 4.1 Lấy danh sách category
export const getCategories = async (params = {}) => {
    const res = await axiosInstance.get("/categories", {
        params: params
    });
    return res.data;
};

// 4.2 Lấy category theo ID
export const getCategoryById = async (id) => {
    const res = await axiosInstance.get(`/categories/${id}`);
    return res.data;
};

// 4.3 Tạo category
export const createCategory = async (data) => {
    const res = await axiosInstance.post("/categories", data);
    return res.data;
};

// 4.4 Update category
export const updateCategory = async (id, data) => {
    const res = await axiosInstance.put(`/categories/${id}`, data);
    return res.data;
};

// 4.5 Delete category
export const deleteCategory = async (id) => {
    const res = await axiosInstance.delete(`/categories/${id}`);
    return res.data;
};