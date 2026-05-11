"use client";
import { useEffect, useState } from "react";
import { getPages } from "@/services/pageService";
import PostCard from "@/components/shop/PostCard";
import PostSkeleton from "@/components/shop/PostSkeleton";

export default function PostPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await getPages({ status: 1, limit: 12 });
                console.log(data)
                setPosts(data || []);
            } catch (error) {
                console.error("Error fetching posts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-2">Bài Viết</h1>
                <p className="text-gray-600 mb-8">Cập nhật thông tin mới nhất về sản phẩm và công nghệ</p>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <PostSkeleton key={i} />
                        ))}
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <PostCard key={post.page_id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-400 text-lg">Chưa có bài viết nào</p>
                    </div>
                )}
            </div>
        </div>
    );
}
