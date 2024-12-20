import { NameGenerator } from "@/components/NameGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-baby-pink via-white to-baby-blue">
      <div className="container py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 animate-fadeIn">
              Baby Name Generator
            </h1>
            <p className="text-lg md:text-xl text-gray-600 animate-fadeIn" style={{ animationDelay: "200ms" }}>
              Find the perfect name for your little one using AI
            </p>
            
            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto animate-fadeIn" style={{ animationDelay: "400ms" }}>
              <img
                src="/lovable-uploads/bb6c4b1c-c93d-4e48-8f29-998df797504f.png"
                alt="Sleeping baby"
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
              <img
                src="/lovable-uploads/e736cec3-c4df-43b9-9d80-11563df2804a.png"
                alt="Baby holding hand"
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl animate-fadeIn" style={{ animationDelay: "600ms" }}>
            <NameGenerator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;