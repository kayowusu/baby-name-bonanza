const HowToUse = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fadeIn">How to Use</h1>
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg animate-fadeIn" style={{ animationDelay: "200ms" }}>
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Enter Baby Information</h2>
            <p className="text-gray-600">
              Fill in details about your baby including gender, cultural background, and any specific preferences.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Generate Names</h2>
            <p className="text-gray-600">
              Click the "Generate Names" button to receive personalized name suggestions based on your preferences.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Review Suggestions</h2>
            <p className="text-gray-600">
              Browse through the generated names, complete with meanings and explanations of how they match your criteria.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;