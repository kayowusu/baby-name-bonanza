const Babies = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-fadeIn">Baby Gallery</h1>
      <div className="grid md:grid-cols-2 gap-8 animate-fadeIn" style={{ animationDelay: "200ms" }}>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <img
            src="/lovable-uploads/894e0cad-ef85-45a1-8029-b17a0ddd2c0b.png"
            alt="Sleeping baby"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Sweet Dreams</h3>
          <p className="text-gray-600">Peaceful moments of baby slumber...</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <img
            src="/lovable-uploads/faeb0e6e-7500-4664-a6f3-099bb6c567b8.png"
            alt="Baby holding hand"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">Tiny Hands</h3>
          <p className="text-gray-600">The precious bond between parent and child...</p>
        </div>
      </div>
    </div>
  );
};

export default Babies;