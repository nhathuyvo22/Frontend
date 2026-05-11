"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { me } from '@/services/authService';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const userData = await me();
        setUser(userData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Không thể tải thông tin cá nhân');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">Đang tải...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <p className="text-red-700 mb-4">{error}</p>
            <Link href="/shop/auth/login" className="text-blue-600 hover:underline">
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 mb-4">Vui lòng đăng nhập để xem hồ sơ của bạn</p>
            <Link href="/shop/auth/login" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
          <p className="text-gray-600 mt-2">Quản lý thông tin tài khoản của bạn</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Avatar/Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-12 text-center">
            <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center text-4xl mb-4">
              👤
            </div>
            <h2 className="text-2xl font-bold text-white">
              {user.fullname || user.username || 'Người dùng'}
            </h2>
            <p className="text-blue-100 mt-1">@{user.username}</p>
          </div>

          {/* Information Section */}
          <div className="px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="border-b md:border-b-0 pb-6 md:pb-0">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên đăng nhập
                </label>
                <p className="text-gray-900 text-lg">{user.username}</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <p className="text-gray-900 text-lg">{user.email || 'Chưa cập nhật'}</p>
              </div>

              {/* Full Name */}
              <div className="border-b md:border-b-0 pb-6 md:pb-0">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ và tên
                </label>
                <p className="text-gray-900 text-lg">{user.fullname || 'Chưa cập nhật'}</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <p className="text-gray-900 text-lg">{user.phone || 'Chưa cập nhật'}</p>
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ
                </label>
                <p className="text-gray-900 text-lg">{user.address || 'Chưa cập nhật'}</p>
              </div>

              {/* Account Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Loại tài khoản
                </label>
                <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {user.user_type === 'admin' || user.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                </div>
              </div>

              {/* Join Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ngày tham gia
                </label>
                <p className="text-gray-900 text-lg">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString('vi-VN') : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition"
          >
            ← Quay lại cửa hàng
          </Link>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Đăng xuất
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Gợi ý</h3>
          <p className="text-blue-800 text-sm">
            Nếu bạn muốn cập nhật thông tin cá nhân, vui lòng liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
}
