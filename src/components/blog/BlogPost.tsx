import { Button } from "@/components/ui/button";
import { useState } from "react";

interface BlogPostProps {
  id: string;
  title: string;
  summary: string;
  content: React.ReactNode;
}

const BlogPost = ({ id, title, summary, content }: BlogPostProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      
      {!isExpanded ? (
        <>
          <p className="text-gray-600 mb-4">{summary}</p>
          <Button 
            variant="ghost" 
            onClick={() => setIsExpanded(true)}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Read more →
          </Button>
        </>
      ) : (
        <div className="space-y-6">
          <div className="prose prose-purple max-w-none">
            {content}
          </div>
          
          <Button 
            variant="ghost" 
            onClick={() => setIsExpanded(false)}
            className="text-purple-600 hover:text-purple-700 font-medium mt-4"
          >
            Show less ↑
          </Button>
        </div>
      )}
    </article>
  );
};

export default BlogPost;