const Blogs = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fadeIn">Baby Name Blogs</h1>
      <div className="grid gap-8 animate-fadeIn" style={{ animationDelay: "200ms" }}>
        <article className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Choosing the Perfect Baby Name</h2>
          <p className="text-gray-600 mb-4">
            Discover tips and tricks for selecting the ideal name for your little one...
          </p>
          <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Read more →</a>
        </article>
        
        <article className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Popular Baby Names in 2024</h2>
          <p className="text-gray-600 mb-4">
            Explore the trending baby names this year and their meanings...
          </p>
          <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">Read more →</a>
        </article>
      </div>
    </div>
  );
};

export default Blogs;