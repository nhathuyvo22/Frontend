export default function PostSkeleton() {
    return (
        <div className="bg-gray-200 rounded-lg animate-pulse">
            <div className="w-full h-40 bg-gray-300"></div>
            <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                </div>
                <div className="h-3 bg-gray-300 rounded w-1/3"></div>
            </div>
        </div>
    );
}
