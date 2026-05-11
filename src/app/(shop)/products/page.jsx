"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/services/categoryService.js";
import { getProducts } from "@/services/productService.js";
import ProductList from "@/components/shop/product/ProductList.js";
import Pagination from "@/components/common/Pagination.js";
import CategoryMenu from "@/components/shop/product/categoryMenu";
import Search from "@/components/shop/product/Search";
import ResetFilter from "@/components/shop/product/ResetFilter";
import { getBrands } from "@/services/brandService.js";
import BrandMenu from "@/components/shop/product/BrandMenu";
export default function ProductsPage() {
  const defaultParams = {
    page: 1,
    limit: 10,
    trash: 0,
    status: 1,
    name: ""
  };
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [params, setParams] = useState(defaultParams);
  const [searchKey, setSearchKey] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await getProducts(params);
        setProducts(data.data);
        setTotalPage(data.totalPage);

        const data1 = await getCategories({
          trash: 0,
          status: 1
        });

        setCategories(data1);

      } catch (e) {
        setErrors({ message: e?.data || "Có lỗi xảy ra" });
      } finally {
        setLoading(false);
      }
      const data2 = await getBrands({ trash: 0, status: 1 });
      setBrands(data2);

    };

    fetchData();
  }, [params]);

  return (
    <div className="container mx-auto px-4">

      <h1 className="text-2xl text-center font-bold my-5 uppercase">
        Trang Sản Phẩm
      </h1>

      {errors.message && (
        <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
          {errors.message}
        </div>
      )}

      <div className="mb-6">
        <Search
          setParams={setParams}
          params={params}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">

        <div className="w-full md:w-1/4">

          <CategoryMenu
            categories={categories}
            params={params}
            setParams={setParams}
          />
          <BrandMenu
            brands={brands}
            params={params}
            setParams={setParams}
          />
          <ResetFilter
            setParams={setParams}
            defaultParams={defaultParams}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
          />

        </div>

        <div className="w-full md:w-3/4">

          <ProductList
            products={products}
            loading={loading}
          />

          {!loading &&
            products.length > 0 &&
            totalPage > 1 && (
              <div className="mt-8">
                <Pagination
                  totalPages={totalPage}
                  params={params}
                  onChangeParams={setParams}
                />
              </div>
            )}

        </div>

      </div>
    </div>
  );
}