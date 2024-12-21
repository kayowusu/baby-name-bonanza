import BlogList from "@/components/blog/BlogList";

const Blogs = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fadeIn">Baby Name Blogs</h1>
      <div className="space-y-8 animate-fadeIn" style={{ animationDelay: "200ms" }}>
        <BlogList />
      </div>
    </div>
  );
};

export default Blogs;