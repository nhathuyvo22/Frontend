"use client";
import { register } from '@/services/authService';
import { isEmpty, validateRegister } from '@/utils/validator';
import { useState } from 'react';
import Link from 'next/link';

export const RegisterForm = (props) => {
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (typeof validateRegister === 'function') {
            const validateErrors = validateRegister({
                username,
                fullname,
                email,
                pass,
                confirm_password
            });
            setErrors(validateErrors);
            if (!isEmpty(validateErrors)) {
                setLoading(false);
                return;
            }
            let data = {
                username,
                fullname,
                email,
                pass
            }
            try {
                let res = await register(data);
                setSuccess(true);
                setUsername("");
                setFullname("");
                setEmail("");
                setPass("");
                setConfirm_password("");
                setErrors({});
            } catch (error) {
                console.error('Registration error:', error);
                setErrors({ submit: 'Đăng ký thất bại. Vui lòng thử lại.' });
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Đăng Ký Tài Khoản</h1>
                    <p className="text-gray-600 text-sm">Tạo tài khoản mới để bắt đầu mua sắm</p>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                        <p className="text-green-700 font-medium text-center">✓ Đăng ký thành công!</p>
                    </div>
                )}

                {errors.submit && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-red-700 font-medium text-center">{errors.submit}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Username */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tên đăng nhập"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ${errors.username ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                                }`}
                        />
                        {errors.username && <p className='text-red-500 text-sm mt-1'>{errors.username}</p>}
                    </div>

                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium text-slate-700 mb-2">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            id="fullname"
                            name="fullname"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            placeholder="Nhập họ và tên"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ${errors.fullname ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                                }`}
                        />
                        {errors.fullname && <p className='text-red-500 text-sm mt-1'>{errors.fullname}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập địa chỉ email"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                                }`}
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="pass" className="block text-sm font-medium text-slate-700 mb-2">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            id="pass"
                            name="pass"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ${errors.pass ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                                }`}
                        />
                        {errors.pass && <p className='text-red-500 text-sm mt-1'>{errors.pass}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-slate-700 mb-2">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            name="confirm_password"
                            value={confirm_password}
                            onChange={(e) => setConfirm_password(e.target.value)}
                            placeholder="Nhập lại mật khẩu"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition ${errors.confirm_password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'
                                }`}
                        />
                        {errors.confirm_password && <p className='text-red-500 text-sm mt-1'>{errors.confirm_password}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng Ký'}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Đã có tài khoản? {' '}
                    <Link href="/shop/login" className="font-medium text-black hover:underline">
                        Đăng nhập ngay
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;