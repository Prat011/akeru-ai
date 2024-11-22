import React from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Alert, AlertDescription } from '../components/ui/alert';
import { TOPIC_SUGGESTIONS } from '../utils/generateContent';
import BlogPosts from './BlogPosts';

const Generator = ({ 
  topic, 
  setTopic, 
  apiKey, 
  setApiKey, 
  handleGenerate, 
  loading, 
  error,
  posts 
}) => {
  return (
    <div className="space-y-4 mb-8">
      <div>
        <label className="block text-sm font-medium mb-2">Gemini API Key</label>
        <Input
          type="password"
          placeholder="Enter your Gemini API key..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="bg-gray-800 border-gray-700"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-2">Topic</label>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Enter a topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 bg-gray-800 border-gray-700"
          />
          <Button 
            onClick={handleGenerate}
            disabled={loading || !topic || !apiKey}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Generating...' : 'Generate Tutorials'}
          </Button>
        </div>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {TOPIC_SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setTopic(suggestion.text)}
              className="px-3 py-1.5 text-sm bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
              title={suggestion.description}
            >
              {suggestion.text}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-8">
        <BlogPosts 
          posts={posts} 
          apiKey={apiKey}
          topic={topic}
        />
      </div>
    </div>
  );
};

export default Generator;