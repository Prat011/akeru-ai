const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const MODEL = 'gemini-1.5-pro';

export const TOPIC_SUGGESTIONS = [
  { text: "How to work with React Hooks", description: "Learn about useState, useEffect, and custom hooks" },
  { text: "What is GraphQL", description: "Modern API query language and runtime" },
  { text: "What is Docker", description: "Container platform for modern applications" },
  { text: "Portfolio website using Next.js and TypeScript", description: "JavaScript with syntax for types" },
  { text: "Deploying a React app with Next.js", description: "React framework for production-grade applications" },
];

export const generateExplanation = async (text, apiKey) => {
  if (!apiKey) {
    throw new Error('Gemini API key is required');
  }

  const headers = {
    'Content-Type': 'application/json'
  };

  const body = {
    contents: [{
      parts: [{
        text: `Please explain this concept in a clear and concise way, using markdown formatting for better readability. Include relevant examples if applicable:

"${text}"

Please format your response with:
- Clear headings using ##
- Code examples in \`\`\` blocks when relevant
- Bullet points for key concepts
- **Bold** for important terms
- *Italic* for emphasis`
      }]
    }],
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.7
    }
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating explanation:', error);
    throw error;
  }
};

export const generateTutorial = async (topic, apiKey) => {
  if (!apiKey) {
    throw new Error('Gemini API key is required');
  }

  const generatePost = async (type) => {
    const prompts = {
      beginner: `Write a detailed tutorial blog post for beginners about ${topic}. 
                 Include sections for introduction, prerequisites, key concepts, and practical examples. 
                 Format the response in markdown.`,
      
      advanced: `Write an advanced tutorial blog post about ${topic} for experienced practitioners. 
                 Use Code snippets wherever necessary.
                 Focus on complex techniques, optimizations, and professional workflows. 
                 Format the response in markdown.`,
      
      bestPractices: `Write a comprehensive blog post about best practices and common pitfalls in ${topic}. 
                      Include real-world examples, case studies, and professional tips. 
                      Format the response in markdown.`
    };

    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      contents: [{
        parts: [{
          text: prompts[type]
        }]
      }],
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7
      }
    };

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
        throw new Error('Invalid response format from Gemini API');
      }

      return {
        title: `${topic} - ${type.charAt(0).toUpperCase() + type.slice(1)} Guide`,
        content: data.candidates[0].content.parts[0].text
      };
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  };

  try {
    const [beginnerPost, advancedPost, bestPracticesPost] = await Promise.all([
      generatePost('beginner'),
      generatePost('advanced'),
      generatePost('bestPractices')
    ]);
    return [beginnerPost, advancedPost, bestPracticesPost];
  } catch (error) {
    throw error;
  }
};

export const generateNotes = async (topic, content, apiKey) => {
  if (!apiKey) {
    throw new Error('Gemini API key is required');
  }

  const prompt = `Create detailed study notes for the following tutorial about ${topic}:

${content}

Format the notes in markdown with:
- Key concepts
- Important points
- Code examples
- Best practices
- Common pitfalls to avoid`;

  const headers = {
    'Content-Type': 'application/json'
  };

  const body = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7
    }
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating notes:', error);
    throw error;
  }
};

export const generateSlides = async (topic, content, apiKey) => {
  if (!apiKey) {
    throw new Error('Gemini API key is required');
  }

  const prompt = `Create a presentation slide deck for the topic "${topic}" based on this content:

${content}

Format the response as a JSON array of slides. Each slide should have a 'title' and 'content' field.
The content should be in markdown format and include bullet points.
Include code examples where relevant.
Keep each slide focused and concise.
Include these slide types:
- Title slide with topic name and brief description
- Overview/Agenda of what will be covered
- Key concepts with clear explanations
- Code examples with explanations
- Best practices and tips
- Summary of main points

Example format:
[
  {
    "title": "Introduction to Topic",
    "content": "# Main points\\n- Point 1\\n- Point 2"
  }
]

Make sure each slide is informative but not overwhelming. Use bullet points for better readability.`;

  const headers = {
    'Content-Type': 'application/json'
  };

  const body = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7
    }
  };

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid response format from Gemini API');
    }

    const slidesText = data.candidates[0].content.parts[0].text;
    // Parse the JSON response while handling potential JSON within markdown code blocks
    const slides = JSON.parse(slidesText.replace(/```json\n|\n```/g, ''));
    
    return slides;
  } catch (error) {
    console.error('Error generating slides:', error);
    throw error;
  }
};