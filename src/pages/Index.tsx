import { NameGenerator } from "@/components/NameGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-baby-pink via-white to-baby-blue">
      <div className="container py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Baby Name Generator
            </h1>
            <p className="text-lg text-gray-600">
              Generate unique and meaningful baby names using AI
            </p>
          </div>
          
          <NameGenerator />
        </div>
      </div>
    </div>
  );
};

export default Index;