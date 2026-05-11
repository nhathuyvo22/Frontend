export default function CartItem({ item }) {
    return (
        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm mb-3">
            {/* Hình ảnh */}
            <img
                src={process.env.NEXT_PUBLIC_IMG_URL + item.image}
                alt={item.product_name}
                className="w-16 h-16 object-cover rounded-lg"
            />

            {/* Tên sản phẩm */}
            <div className="flex-1 ml-4">
                <h3 className="font-semibold text-gray-800">{item.product_name}</h3>
                <p className="text-gray-500 text-sm">
                    {item.price.toLocaleString("vi-VN")} đ
                </p>
            </div>

            {/* Số lượng */}
            <div className="mx-4">
                <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    readOnly
                    className="w-16 text-center border rounded-lg p-1"
                />
            </div>

            {/* Thành tiền */}
            <div className="text-right min-w-[100px]">
                <p className="font-semibold text-blue-600">
                    {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                </p>
            </div>
        </div>
    );
}