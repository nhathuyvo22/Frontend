import LoginForm from '@/components/shop/auth/LoginForm';

export const metadata = {
  title: 'Đăng Nhập ',
  description: 'Đăng nhập vào tài khoản HTSV Shop của bạn',
};

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}