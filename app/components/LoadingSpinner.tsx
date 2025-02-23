const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-200 to-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      <p className="text-gray-600 text-lg mt-4">Loading...</p>
    </div>
  );
};

export default LoadingSpinner; 