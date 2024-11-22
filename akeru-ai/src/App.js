import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Generator from './components/Generator';
import ExplanationSidebar from './components/ExplanationSidebar';
import { generateTutorial } from './utils/generateContent';

const App = () => {
  const [topic, setTopic] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedText, setSelectedText] = useState('');
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      
      if (text) {
        setSelectedText(text);
        setShowSidebar(true);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const handleGenerate = async () => {
    if (!apiKey.trim()) {
      setError('Please enter your Gemini API key');
      return;
    }
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const generatedPosts = await generateTutorial(topic, apiKey);
      setPosts(generatedPosts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={`transition-all duration-200 ${showSidebar ? 'mr-80' : ''}`}>
        <Generator
          topic={topic}
          setTopic={setTopic}
          apiKey={apiKey}
          setApiKey={setApiKey}
          handleGenerate={handleGenerate}
          loading={loading}
          error={error}
          posts={posts}
        />
      </div>

      {showSidebar && (
        <ExplanationSidebar
          selectedText={selectedText}
          apiKey={apiKey}
          onClose={() => {
            setShowSidebar(false);
            setSelectedText('');
          }}
        />
      )}
    </Layout>
  );
};

export default App;