const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="relative w-24 h-24">
          {/* Book Cover */}
          <div className="absolute inset-0 bg-blue-500 w-full h-full rounded-md shadow-lg animate-[flip_1.5s_linear_infinite]"></div>
  
          {/* Book Pages */}
          <div className="absolute inset-0 bg-white w-20 h-24 rounded-md shadow-md transform rotate-[15deg] animate-[pageFlip_1.5s_linear_infinite]"></div>
          <div className="absolute inset-0 bg-white w-20 h-24 rounded-md shadow-md transform rotate-[-15deg] animate-[pageFlip_1.5s_linear_infinite_0.2s]"></div>
        </div>
  
        <p className="mt-6 text-lg font-semibold text-gray-700">
          📖 Learning in Progress...
        </p>
  
        <style>
          {`
            @keyframes flip {
              0%, 100% { transform: rotateY(0deg); }
              50% { transform: rotateY(180deg); }
            }
  
            @keyframes pageFlip {
              0%, 100% { transform: rotate(15deg); opacity: 0.8; }
              50% { transform: rotate(-15deg); opacity: 1; }
            }
          `}
        </style>
      </div>
    );
  };
  
  export default Loader;