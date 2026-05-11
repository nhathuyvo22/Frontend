"use client";
import ContactForm from "@/components/shop/ContactForm";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Liên Hệ Với Chúng Tôi</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-bold mb-2">📧 Email</h3>
                            <p>contact@vnhshop.com</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">📱 Điện Thoại</h3>
                            <p>+84 (0) 123 456 789</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">📍 Địa Chỉ</h3>
                            <p>123 Đường Nguyễn Văn Hôn, Quận 1, TP. Hồ Chí Minh</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">⏰ Giờ Mở Cửa</h3>
                            <p>Thứ Hai - Chủ Nhật: 08:00 - 20:00</p>
                        </div>
                    </div>

                    {/* Form */}
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
