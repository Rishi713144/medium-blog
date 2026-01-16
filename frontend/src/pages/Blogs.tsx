import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    return (
        <div className="min-h-screen bg-white">
            <Appbar />
            <div className="flex justify-center px-4">
                <main className="max-w-screen-md w-full py-12">
                    {/* Professional Feed Header */}
                    <div className="border-b border-slate-100 mb-8 flex gap-8">
                        <button className="pb-4 border-b border-black text-sm font-medium">For you</button>
                        <button className="pb-4 text-slate-500 text-sm hover:text-black transition-colors">Following</button>
                    </div>

                    {loading ? (
                        <div className="space-y-10">
                            {[...Array(5)].map((_, i) => <BlogSkeleton key={i} />)}
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <BlogCard
                                        key={blog.id}
                                        id={blog.id}
                                        authorName={blog.author.name}
                                        title={blog.title}
                                        content={blog.content}
                                        
                                        publishedDate={blog.createdAt} 
                                    />
                                ))
                            ) : (
                                <EmptyState />
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

const EmptyState = () => (
    <div className="text-center py-20">
        <h3 className="text-xl font-semibold text-slate-800">No stories yet</h3>
        <p className="text-slate-500 mt-2">Check back later or follow more authors.</p>
    </div>
);