import { Card } from "@/components/ui/card";

const BlogSidebar = () => {
  return (
    <div className="w-full lg:w-1/3 space-y-6 p-4">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">About Me</h2>
        <div className="bg-gray-200 h-24 rounded-lg mb-4"></div>
        <p>Passionate about helping parents find the perfect names for their little ones.</p>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Popular Posts</h3>
        <div className="space-y-4">
          <div className="bg-gray-200 h-16 rounded-lg"></div>
          <div className="bg-gray-200 h-16 rounded-lg"></div>
          <div className="bg-gray-200 h-16 rounded-lg"></div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
        <p>Stay updated with the latest baby naming trends and tips!</p>
      </Card>
    </div>
  );
};

export default BlogSidebar;