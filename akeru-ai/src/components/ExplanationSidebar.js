import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateExplanation } from '../utils/generateContent';

const ExplanationSidebar = ({ selectedText, apiKey, onClose }) => {
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExplanation = async () => {
      if (!selectedText || !apiKey) return;
      
      setLoading(true);
      setError(null);
      try {
        const result = await generateExplanation(selectedText, apiKey);
        setExplanation(result || '');
      } catch (error) {
        console.error('Error getting explanation:', error);
        setError('Failed to generate explanation. Please try again.');
      }
      setLoading(false);
    };

    getExplanation();
  }, [selectedText, apiKey]);

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-gray-800 border-l border-gray-700 p-4 overflow-y-auto shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Explanation</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-200 transition-colors"
          aria-label="Close explanation"
        >
          ✕
        </button>
      </div>
      
      <div className="selected-text mb-4 p-3 bg-gray-700/50 rounded-lg border border-gray-600">
        <h4 className="text-sm font-medium text-gray-400 mb-2">Selected Text:</h4>
        <p className="text-sm text-gray-200">{selectedText}</p>
      </div>
      
      {loading ? (
        <div className="text-gray-400 animate-pulse">Generating explanation...</div>
      ) : error ? (
        <div className="text-red-400">{error}</div>
      ) : explanation ? (
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown>{explanation}</ReactMarkdown>
        </div>
      ) : null}
    </div>
  );
};

export default ExplanationSidebar;
