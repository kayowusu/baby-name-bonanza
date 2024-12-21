import { useParams } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((post) => post.id === id);

  if (!post) {
    return <div className="container mx-auto py-8 px-4">Post not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <article className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg animate-fadeIn">
        <h1 className="text-3xl font-semibold mb-6">{post.title}</h1>
        <div className="prose prose-purple max-w-none">
          {post.content}
        </div>
      </article>
    </div>
  );
};

export default BlogPost;