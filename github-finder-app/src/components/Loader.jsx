import React from 'react';

const Loader = () => (
  <div className="flex justify-center items-center h-full py-10">
    <div
      className="
        animate-spin
        rounded-full
        h-16 w-16
        border-4
        border-blue-500
        border-t-transparent
      "
    />
  </div>
);

export default Loader;
