const FAQ = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fadeIn">Frequently Asked Questions</h1>
      <div className="space-y-6 animate-fadeIn" style={{ animationDelay: "200ms" }}>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">How does the name generator work?</h2>
          <p className="text-gray-600">
            Our name generator uses advanced AI to create personalized name suggestions based on your preferences and cultural background.
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Can I save my favorite names?</h2>
          <p className="text-gray-600">
            Currently, you can bookmark your browser or take screenshots of your favorite names. We're working on adding a save feature!
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Are the name meanings accurate?</h2>
          <p className="text-gray-600">
            Yes, our AI sources name meanings from reliable linguistic and cultural databases to ensure accuracy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;