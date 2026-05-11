import RegisterForm from '@/components/shop/auth/RegisterForm';

export const metadata = {
  title: 'Đăng Ký | HTSV Shop',
  description: 'Tạo tài khoản mới trên HTSV Shop',
};

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <RegisterForm />
    </div>
  );
}
