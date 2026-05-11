import axiosInstance from "@/lib/axiosInstance";



export const getProducts = async (params = {}) => {
    const res = await axiosInstance.get("/products", {
        params: params
    });
    return res.data;
}

export const getProductsID = async (id) => {
    const res = await axiosInstance.get(`/products/${id}`)
    return res.data;
}

export const addProducts = async (data) => {
    const res = await axiosInstance.post("/products", data)
    return res.data;
}

export const updateProducts = async (id, data) => {
    const res = await axiosInstance.put(`/products/${id}`, data)
    return res.data;
}

export const deleteProducts = async (id) => {
    const res = await axiosInstance.delete(`/products/${id}`)
    return res.data;
}

export const softDeleteProducts = async (id) => {
    const res = await axiosInstance.put(`/products/${id}`, { trash: 1 });
    return res.data;
}

export const getNewProducts = async (params = {}) => {
    const res = await axiosInstance.get("/products", {
        params: {
            limit: 10,
            sort: "created_at",
            order: "desc",
            ...params
        }
    });
    return res.data;
}


export const getBestSeller = async (params = {}) => {
    const res = await axiosInstance.get("/products", {
        params: {
            limit: 5,
            sort: "sold",
            order: "desc",
            ...params
        }
    });
    return res.data;
}

export const getRelatedProducts = async (id, params = {}) => {
    const res = await axiosInstance.get(`/products/${id}/related`, {
        params: params
    });
    return res.data;
}