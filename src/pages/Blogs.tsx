import BlogList from "@/components/blog/BlogList";
import BlogSidebar from "@/components/blog/BlogSidebar";

const Blogs = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fadeIn">Baby Name Blogs</h1>
      <div className="flex flex-col lg:flex-row gap-8 animate-fadeIn" style={{ animationDelay: "200ms" }}>
        <BlogList />
        <BlogSidebar />
      </div>
    </div>
  );
};

export default Blogs;