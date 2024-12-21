import { Button } from "@/components/ui/button";
import { useState } from "react";

const Blogs = () => {
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const togglePost = (postId: string) => {
    setExpandedPost(expandedPost === postId ? null : postId);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fadeIn">Baby Name Blogs</h1>
      <div className="space-y-8 animate-fadeIn" style={{ animationDelay: "200ms" }}>
        {/* New Blog Post */}
        <article className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Exploring the Rise of Vintage Baby Names in 2024</h2>
          
          {expandedPost !== 'vintage-names-2024' ? (
            <>
              <p className="text-gray-600 mb-4">
                In 2024, a notable trend among new parents is the resurgence of vintage baby names from the 1920s. These classic names are making a modern comeback, offering a blend of nostalgia and timeless charm.
              </p>
              <Button 
                variant="ghost" 
                onClick={() => togglePost('vintage-names-2024')}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Read more →
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="prose prose-purple max-w-none">
                <h3 className="text-xl font-semibold mt-6 mb-4">Why Vintage Names?</h3>
                <p>Parents are increasingly seeking names that stand out yet have a sense of familiarity. Vintage names provide a unique identity while connecting to historical roots, making them appealing choices for today's newborns.</p>

                <h3 className="text-xl font-semibold mt-6 mb-4">Popular Vintage Names for Girls</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Dorothy</strong>: Meaning "gift of God," Dorothy was a top name in the 1920s and is regaining popularity.</li>
                  <li><strong>Helen</strong>: Signifying "light" or "bright," Helen offers a classic elegance.</li>
                  <li><strong>Margaret</strong>: With the meaning "pearl," Margaret provides a timeless option with various nickname possibilities like Maggie or Greta.</li>
                  <li><strong>Ruth</strong>: Meaning "friend" or "companion," Ruth is a short, strong name with historical significance.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-4">Popular Vintage Names for Boys</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Charles</strong>: Meaning "free man," Charles is a classic name with royal connotations.</li>
                  <li><strong>George</strong>: Signifying "farmer," George has been a steady favorite over the decades.</li>
                  <li><strong>Edward</strong>: Meaning "wealthy guardian," Edward offers a regal touch.</li>
                  <li><strong>Henry</strong>: Signifying "ruler of the household," Henry combines strength with tradition.</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-4">Incorporating Vintage Names Today</h3>
                <p>These vintage names can be used as first names or paired as middle names to balance modernity and tradition. They also offer flexibility with nicknames, allowing for personalization.</p>

                <div className="my-6 text-center">
                  <img 
                    src="https://tse3.mm.bing.net/th?id=OIP.5CCfMKRU0ZsnIU2Z2SmEiAHaHa&pid=Api" 
                    alt="Baby names trends 2024"
                    className="rounded-lg mx-auto max-w-full"
                  />
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-4">Conclusion</h3>
                <p>The revival of 1920s baby names in 2024 reflects a desire to connect with the past while providing children with distinctive and meaningful names. This trend showcases the enduring appeal of classic names and their ability to adapt to contemporary times.</p>

                <p className="mt-4">
                  For more insights into vintage baby names making a comeback, visit{" "}
                  <a 
                    href="https://www.parents.com/vintage-baby-names-from-the-1920s-ready-to-make-a-modern-comeback-8764111" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 underline"
                  >
                    Parents.com
                  </a>
                  .
                </p>
              </div>
              
              <Button 
                variant="ghost" 
                onClick={() => togglePost('vintage-names-2024')}
                className="text-purple-600 hover:text-purple-700 font-medium mt-4"
              >
                Show less ↑
              </Button>
            </div>
          )}
        </article>

        {/* Previous Blog Post */}
        <article className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Trending Baby Names: A Look Back at 1880 and Modern Trends</h2>
          
          {expandedPost !== 'trending-names' ? (
            <>
              <p className="text-gray-600 mb-4">
                When it comes to choosing a baby name, parents often find themselves torn between classic, timeless options and trendy, modern names. In this blog, we'll take a journey through the most popular baby names of 1880, as well as touch on some current trends to help you make an informed decision.
              </p>
              <Button 
                variant="ghost" 
                onClick={() => togglePost('trending-names')}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Read more →
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="prose prose-purple max-w-none">
                <h3 className="text-xl font-semibold mt-6 mb-4">Popular Baby Names of 1880</h3>
                <p>To understand the naming trends of the past, let's dive into the data from 1880, courtesy of the Social Security Administration.</p>

                <div className="grid md:grid-cols-2 gap-8 my-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Top 10 Female Names in 1880</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Mary</strong> - 7,065 occurrences</li>
                      <li><strong>Anna</strong> - 2,604 occurrences</li>
                      <li><strong>Emma</strong> - 2,003 occurrences</li>
                      <li><strong>Elizabeth</strong> - 1,939 occurrences</li>
                      <li><strong>Minnie</strong> - 1,746 occurrences</li>
                      <li><strong>Margaret</strong> - 1,578 occurrences</li>
                      <li><strong>Ida</strong> - 1,472 occurrences</li>
                      <li><strong>Alice</strong> - 1,414 occurrences</li>
                      <li><strong>Bertha</strong> - 1,320 occurrences</li>
                      <li><strong>Sarah</strong> - 1,288 occurrences</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Top 10 Male Names in 1880</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>John</strong> - 9,655 occurrences</li>
                      <li><strong>William</strong> - 9,532 occurrences</li>
                      <li><strong>James</strong> - 5,927 occurrences</li>
                      <li><strong>Charles</strong> - 5,348 occurrences</li>
                      <li><strong>George</strong> - 5,126 occurrences</li>
                      <li><strong>Frank</strong> - 3,242 occurrences</li>
                      <li><strong>Joseph</strong> - 2,632 occurrences</li>
                      <li><strong>Thomas</strong> - 2,534 occurrences</li>
                      <li><strong>Henry</strong> - 2,444 occurrences</li>
                      <li><strong>Robert</strong> - 2,415 occurrences</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Modern Baby Name Trends</h3>
                <p>Fast-forwarding to the present, baby name trends have evolved significantly. Here are some current trends and popular names:</p>

                <div className="space-y-4 my-6">
                  <div>
                    <h4 className="text-lg font-semibold">Nature-Inspired Names</h4>
                    <p>Names inspired by nature are gaining popularity. For girls, names like <strong>Lily</strong>, <strong>River</strong>, and <strong>Willow</strong> are trending. For boys, names such as <strong>Oakley</strong>, <strong>Sage</strong>, and <strong>Rowan</strong> are becoming more common.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold">Unique Spellings</h4>
                    <p>Parents are increasingly opting for unique spellings of traditional names. For example, <strong>Aubree</strong> instead of <strong>Abby</strong>, or <strong>Jaxon</strong> instead of <strong>Jackson</strong>.</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold">Vintage Revival</h4>
                    <p>There is a resurgence of interest in vintage names, some of which were popular in the 1800s. Names like <strong>Emma</strong>, <strong>Oliver</strong>, and <strong>Alice</strong> are once again in the spotlight.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 my-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">Top 10 Female Names (2022)</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Olivia</strong></li>
                      <li><strong>Emma</strong></li>
                      <li><strong>Amelia</strong></li>
                      <li><strong>Ava</strong></li>
                      <li><strong>Sophia</strong></li>
                      <li><strong>Mia</strong></li>
                      <li><strong>Isabella</strong></li>
                      <li><strong>Charlotte</strong></li>
                      <li><strong>Evelyn</strong></li>
                      <li><strong>Harper</strong></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-3">Top 10 Male Names (2022)</h4>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Liam</strong></li>
                      <li><strong>Noah</strong></li>
                      <li><strong>Ethan</strong></li>
                      <li><strong>Lucas</strong></li>
                      <li><strong>Oliver</strong></li>
                      <li><strong>Benjamin</strong></li>
                      <li><strong>Logan</strong></li>
                      <li><strong>William</strong></li>
                      <li><strong>Alexander</strong></li>
                      <li><strong>Elijah</strong></li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-8 mb-4">Conclusion</h3>
                <p>Choosing a baby name is a personal and significant decision. Whether you prefer the timeless elegance of names from the 1800s or the modern flair of current trends, there are countless beautiful names to choose from.</p>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3">Tips for Choosing a Name:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Consider Family Traditions</strong>: Many parents choose names that have a special meaning within their family.</li>
                    <li><strong>Think About Initials</strong>: Ensure the initials of the name do not spell out anything awkward.</li>
                    <li><strong>Check for Nicknames</strong>: Some names come with natural nicknames that you might like or dislike.</li>
                    <li><strong>Balance with Surname</strong>: Ensure the first name flows well with the surname.</li>
                  </ul>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                onClick={() => togglePost('trending-names')}
                className="text-purple-600 hover:text-purple-700 font-medium mt-4"
              >
                Show less ↑
              </Button>
            </div>
          )}
        </article>

        <article className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">More Articles Coming Soon!</h2>
          <p className="text-gray-600 mb-4">
            Stay tuned for more interesting articles about baby names and parenting tips.
          </p>
        </article>
      </div>
    </div>
  );
};

export default Blogs;