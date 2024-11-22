import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import ReactMarkdown from 'react-markdown';
import { generateNotes, generateSlides } from '../utils/generateContent';
import SlidesModal from './SlidesModal';

const BlogPost = ({ post, apiKey, topic }) => {
  const [generatingNotes, setGeneratingNotes] = useState(false);
  const [generatingSlides, setGeneratingSlides] = useState(false);
  const [slides, setSlides] = useState(null);
  const [showSlides, setShowSlides] = useState(false);

  const handleDownloadNotes = async () => {
    if (!apiKey || !topic) {
      console.log('Missing apiKey or topic:', { apiKey: !!apiKey, topic });
      return;
    }

    setGeneratingNotes(true);
    try {
      const notes = await generateNotes(topic, post.content, apiKey);
      
      // Create and download markdown file
      const blob = new Blob([notes], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${topic.toLowerCase().replace(/\s+/g, '-')}-notes.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating notes:', error);
    }
    setGeneratingNotes(false);
  };

  const handleGenerateSlides = async () => {
    if (!apiKey || !topic) {
      console.log('Missing apiKey or topic:', { apiKey: !!apiKey, topic });
      return;
    }

    setGeneratingSlides(true);
    try {
      const generatedSlides = await generateSlides(topic, post.content, apiKey);
      setSlides(generatedSlides);
      setShowSlides(true);
    } catch (error) {
      console.error('Error generating slides:', error);
    }
    setGeneratingSlides(false);
  };

  if (!post || typeof post !== 'object') {
    return null;
  }

  const { title, content } = post;
  if (!title || !content) {
    return null;
  }

  return (
    <>
      <Card className="mb-8 p-6 bg-gray-800 border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={handleGenerateSlides}
              disabled={generatingSlides}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" 
                />
              </svg>
              {generatingSlides ? 'Generating...' : 'Generate Slides'}
            </button>
            <button
              onClick={handleDownloadNotes}
              disabled={generatingNotes}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
                />
              </svg>
              {generatingNotes ? 'Generating...' : 'Download Notes'}
            </button>
          </div>
        </div>
        <div className="prose prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </Card>

      <SlidesModal
        isOpen={showSlides}
        onClose={() => setShowSlides(false)}
        slides={slides}
      />
    </>
  );
};

export default BlogPost;