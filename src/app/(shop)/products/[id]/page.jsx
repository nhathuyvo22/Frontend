"use client";
import ProductDetail from "@/components/shop/product/ProductDetail";
import { products } from "@/data/products";
import { getProductsID } from "@/services/productService";
import { use, useEffect, useState } from "react";
import Loading from "@/components/shop/product/Loading";
export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const [products, setProducts] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  //goi api 
  useEffect(() => {

    //ham fetch data
    const fetchData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = await getProductsID(id);
        setProducts(data);
        console.log(data);
      }
      catch (e) {
        setErrors({ message: e?.data });

      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h2>Trang chi tiết sản phẩm {id}</h2>
      {errors?.message && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-400">
          {errors.message}
        </div>
      )}
      {loading ? <Loading /> : <ProductDetail product={products} />}
    </div>
  );
}
