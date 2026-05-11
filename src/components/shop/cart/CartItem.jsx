export default function CartItem({ item, onRemove, onIncrement, onDecrement }) {
    return (
        <div className="flex items-center justify-between border rounded-lg p-4">
            <div>
                <h3 className="font-semibold">{item.product_name}</h3>
                <p className="text-gray-500 text-sm">{item.price.toLocaleString("vi-VN")} đ</p>
            </div>
            <div className="flex items-center gap-3">
                <button onClick={onDecrement} className="px-2 py-1 border rounded">−</button>
                <span>{item.quantity}</span>
                <button onClick={onIncrement} className="px-2 py-1 border rounded">+</button>
                <button onClick={onRemove} className="text-red-500 ml-2">Xóa</button>
            </div>
            <p className="font-semibold">{(item.price * item.quantity).toLocaleString("vi-VN")} đ</p>
        </div>
    );
}