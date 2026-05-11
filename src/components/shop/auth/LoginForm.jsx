"use client";
import { login } from '@/services/authService';
import { isEmpty, validateLogin } from '@/utils/validator';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';
export const LoginForm = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setErrors({});

        if (typeof validateLogin === 'function') {
            const validateErrors = validateLogin({ username, pass });
            setErrors(validateErrors);

            if (!isEmpty(validateErrors)) {
                setLoading(false);
                return;
            }

            let data = { username, pass };

            try {
                let res = await login(data);
                console.log("RES:", res);

                if (!res || !res.user) {
                    throw new Error('Dữ liệu đăng nhập không hợp lệ.');
                }

                setSuccess(true);
                setUser(res.user);

                const redirectPath =
                    res.user.role === 'admin' || res.user.user_type === 'admin'
                        ? '/admin'
                        : '/';

                setTimeout(() => {
                    setSuccess(false);
                    router.push(redirectPath);
                }, 2000);

            } catch (error) {
                console.error('Login error:', error);
                setErrors({ submit: 'Đăng nhập thất bại. Vui lòng thử lại.' });
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Đăng Nhập</h1>
                    <p className="text-gray-600 text-sm">Đăng nhập để tiếp tục</p>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-700 text-center">✓ Đăng nhập thành công!</p>
                    </div>
                )}

                {errors.submit && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-700 text-center">{errors.submit}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm mb-2">Tên đăng nhập</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.username ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    </div>

                    <div>
                        <label className="block text-sm mb-2">Mật khẩu</label>
                        <input
                            type="password"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.pass ? 'border-red-500' : 'border-gray-300'
                                }`}
                        />
                        {errors.pass && <p className="text-red-500 text-sm">{errors.pass}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2.5 rounded-lg"
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    Chưa có tài khoản?{" "}
                    <Link href="/register" className="underline">
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;