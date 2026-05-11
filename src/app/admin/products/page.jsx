"use client";
import { useEffect, useState } from 'react'
import { deleteProducts, getProducts, softDeleteProducts } from '@/services/productService.js';
import AdminTable from "@/components/admin/table/AdminTable.js";
import { useRouter } from 'next/navigation';
import Pagination from "@/components/common/Pagination.js";

const columns = [
  { key: "product_id", label: "ID" },
  { key: "product_name", label: "Product Name" },
  { key: "price", label: "Price" },
  { key: "status", label: "Status" }
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    trash: 0,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleDelete = async (product) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa "${product.product_name}" không?`
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setErrors({});
      setSuccess("");


      await softDeleteProducts(product.product_id);


      setProducts((prevProducts) =>
        prevProducts.filter((item) => item.product_id !== product.product_id)
      );

      setSuccess("Xóa sản phẩm thành công!");



    } catch (error) {
      setErrors({
        message: "Xóa thất bại!"
      });
    } finally {
      setLoading(false);
    }
  }

  const router = useRouter();

  const handleEdit = (product) => {
    router.push(`/admin/products/${product.product_id}`);
  };


  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getProducts(params);
      setProducts(data.data);
      setTotalPage(data.totalPage);
    }
    catch (e) {
      setErrors({ message: "Không thể tải danh sách sản phẩm." });
    }
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params])

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center font-bold mb-5">Admin Products</h1>

      {success && (
        <div className="bg-green-100 text-green-700 p-2 mb-4 rounded border border-green-200">
          {success}
        </div>
      )}

      {errors.message && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded border border-red-200">
          {errors.message}
        </div>
      )}

      {loading && <p className="text-center text-blue-500 mb-2">Đang xử lý...</p>}

      <AdminTable
        columns={columns}
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
        page={params.page}
        limit={params.limit}
      />

      <div className="mt-4">
        <Pagination
          totalPages={totalPage}
          params={params}
          onChangeParams={setParams}
        />
      </div>
    </div>
  )
}