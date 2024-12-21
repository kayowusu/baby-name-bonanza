import { Link } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const BlogList = () => {
  return (
    <div className="w-full lg:w-2/3 space-y-8">
      {blogPosts.map((post) => (
        <article key={post.id} className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{post.title}</h2>
          <p className="text-gray-600 mb-4">{post.summary}</p>
          <Link 
            to={`/blogs/${post.id}`}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Read more →
          </Link>
        </article>
      ))}
    </div>
  );
};

export default BlogList;