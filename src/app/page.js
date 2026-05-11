"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProducts } from '@/services/productService';
import Header from '@/components/shop/Header';
import Footer from '@/components/shop/Footer';
import ProductCard from '@/components/shop/product/ProductCard';

export default function Page() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        // Xử lý dữ liệu trả về từ API để luôn lấy được mảng
        const productArray = Array.isArray(response.data)
          ? response.data
          : (Array.isArray(response) ? response : []);

        // Chỉ lấy 3 sản phẩm nổi bật để hiển thị ở trang chủ
        setFeaturedProducts(productArray.slice(0, 3));
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Không thể tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="flex-grow">
        {/* 1. Hero Section: Phần giới thiệu đầu trang */}
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-white">
                Chào mừng đến với
                <span className="block text-yellow-400 mt-2">VNH Shop</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-50">
                Nơi bạn tìm thấy những sản phẩm công nghệ và phụ kiện chất lượng cao.
                Sáng tạo - Uy tín - Tận tâm.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/products"
                  className="rounded-full bg-white px-8 py-3.5 text-base font-bold text-blue-600 shadow-lg hover:bg-gray-100 transition-all active:scale-95"
                >
                  Mua sắm ngay
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-semibold leading-6 text-white hover:text-yellow-300 transition duration-300"
                >
                  Tìm hiểu thêm <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Đồ họa trang trí nhỏ bên dưới Hero */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
        </section>

        {/* 2. Featured Products Section: Danh sách sản phẩm nổi bật */}
        <section className="py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-slate-900">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Sản phẩm nổi bật</h2>
              <div className="h-1.5 w-20 bg-blue-600 mt-2 rounded-full"></div>
            </div>
            <Link
              href="/products"
              className="group flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              Xem tất cả sản phẩm
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-slate-500 font-medium">Đang tải sản phẩm...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          ) : (
            /* Lưới sản phẩm được chia cột chuẩn xác */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* 3. Features Section: Tại sao chọn chúng tôi */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Tại sao chọn VNH Shop?</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Chúng tôi cam kết mang đến những giá trị vượt trội và sự an tâm tuyệt đối khi mua sắm.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group text-center">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:rotate-6 group-hover:bg-blue-100">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Giao hàng siêu tốc</h3>
                <p className="text-slate-600 leading-relaxed">Nhận hàng chỉ trong 24h làm việc. Đóng gói cẩn thận, an toàn.</p>
              </div>

              <div className="group text-center">
                <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:rotate-6 group-hover:bg-green-100">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Chính hãng 100%</h3>
                <p className="text-slate-600 leading-relaxed">Sản phẩm được tuyển chọn kỹ lưỡng, đầy đủ hóa đơn chứng từ.</p>
              </div>

              <div className="group text-center">
                <div className="w-20 h-20 bg-purple-50 rounded-3xl flex items-center justify-center mx-auto mb-6 transition-transform group-hover:rotate-6 group-hover:bg-purple-100">
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Hỗ trợ tận tâm</h3>
                <p className="text-slate-600 leading-relaxed">Đội ngũ kỹ thuật viên luôn sẵn sàng giải đáp thắc mắc 24/7.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CTA Section: Kêu gọi hành động */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Bạn đã sẵn sàng nâng cấp trải nghiệm?</h2>
            <p className="text-lg text-slate-400 mb-10">
              Đăng ký tài khoản ngay hôm nay để nhận thông báo về các ưu đãi độc quyền sớm nhất.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register"
                className="bg-blue-600 text-white px-10 py-4 rounded-full hover:bg-blue-500 transition-all font-bold shadow-lg shadow-blue-900/20"
              >
                Đăng ký thành viên
              </Link>
              <Link
                href="/contact"
                className="border border-slate-700 text-white px-10 py-4 rounded-full hover:bg-slate-800 transition-all font-bold"
              >
                Gửi tin nhắn cho chúng tôi
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}