import Link from "next/link";

export default function PostCard({ post }) {
    return (
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            {post.image && (
                <div className="w-full h-40 bg-gray-200 overflow-hidden">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition"
                    />
                </div>
            )}

            <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 hover:text-blue-600">
                    <Link href={`/post/${post.id || post.post_id}`}>
                        {post.title}
                    </Link>
                </h3>

                <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {post.description || post.content}
                </p>

                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                    <Link
                        href={`/post/${post.id || post.post_id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Đọc tiếp →
                    </Link>
                </div>
            </div>
        </div>
    );
}
