import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
        <span className="mt-4 text-lg font-semibold text-black">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;