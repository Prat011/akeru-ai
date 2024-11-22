import React, { useState } from 'react';
import BlogPost from './BlogPost';
import CertificateModal from './CertificateModal';

const BlogPosts = ({ posts, apiKey, topic }) => {
  const [showCertificate, setShowCertificate] = useState(false);

  if (!Array.isArray(posts) || posts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {posts.map((post, index) => (
        <BlogPost 
          key={index} 
          post={post} 
          apiKey={apiKey}
          topic={topic}
        />
      ))}
      
      {posts.length === 3 && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowCertificate(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            Get Certificate
          </button>
        </div>
      )}

      <CertificateModal 
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        topic={topic}
      />
    </div>
  );
};

export default BlogPosts;
