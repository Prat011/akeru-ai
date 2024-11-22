import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[rgb(17,24,39)] text-gray-100 p-8 overflow-x-hidden">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Akeru AI - Generate Medium style tutorial blog posts for anything</h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;