import BlogPost from "./BlogPost";
import { vintageNamesContent } from "./blog-contents/VintageNames";
import { trendingNamesContent } from "./blog-contents/TrendingNames";
import { atmosphericNamesContent } from "./blog-contents/AtmosphericNames";

const BlogList = () => {
  return (
    <div className="w-full lg:w-2/3 space-y-8">
      <BlogPost
        id="atmospheric-names"
        title="Atmospheric and Nature-Inspired Baby Names"
        summary="This post explores the trending themes in baby names for 2024, focusing on atmospheric and nature-inspired names."
        content={atmosphericNamesContent}
      />
      
      <BlogPost
        id="vintage-names-2024"
        title="Exploring the Rise of Vintage Baby Names in 2024"
        summary="In 2024, a notable trend among new parents is the resurgence of vintage baby names from the 1920s. These classic names are making a modern comeback, offering a blend of nostalgia and timeless charm."
        content={vintageNamesContent}
      />
      
      <BlogPost
        id="trending-names"
        title="Trending Baby Names: A Look Back at 1880 and Modern Trends"
        summary="When it comes to choosing a baby name, parents often find themselves torn between classic, timeless options and trendy, modern names. In this blog, we'll take a journey through the most popular baby names of 1880, as well as touch on some current trends to help you make an informed decision."
        content={trendingNamesContent}
      />
    </div>
  );
};

export default BlogList;