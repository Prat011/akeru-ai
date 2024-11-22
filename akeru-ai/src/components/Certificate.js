import React, { useRef, useEffect } from 'react';

const Certificate = ({ topic, onGenerate }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = 1200;
    canvas.height = 800;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1f2e');
    gradient.addColorStop(1, '#2d3748');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Inner border with pattern
    ctx.strokeStyle = '#718096';
    ctx.lineWidth = 2;
    ctx.setLineDash([10, 10]);
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
    ctx.setLineDash([]);

    // Akeru AI Logo
    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = '#60a5fa';
    ctx.textAlign = 'center';
    ctx.fillText('Akeru AI', canvas.width / 2, 180);

    // Certificate text
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('Certificate of Completion', canvas.width / 2, 280);

    // Topic text
    ctx.font = '30px Arial';
    ctx.fillStyle = '#cbd5e0';
    ctx.fillText('This is to certify completion of', canvas.width / 2, 380);
    
    ctx.font = 'bold 45px Arial';
    ctx.fillStyle = '#60a5fa';
    const topicLines = getLines(ctx, topic, canvas.width - 200);
    topicLines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, 460 + (index * 60));
    });

    // Date
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    ctx.font = '25px Arial';
    ctx.fillStyle = '#cbd5e0';
    ctx.fillText(date, canvas.width / 2, 650);

    // Decorative elements
    drawDecorativeCorner(ctx, 40, 40, 100, 100, true);
    drawDecorativeCorner(ctx, canvas.width - 40, 40, -100, 100, true);
    drawDecorativeCorner(ctx, 40, canvas.height - 40, 100, -100, true);
    drawDecorativeCorner(ctx, canvas.width - 40, canvas.height - 40, -100, -100, true);
  }, [topic]);

  const getLines = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const drawDecorativeCorner = (ctx, x, y, width, height, clockwise) => {
    ctx.strokeStyle = '#4299e1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y, Math.abs(width), 0, Math.PI / 2, clockwise);
    ctx.stroke();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/jpeg', 1.0);
    const link = document.createElement('a');
    link.download = `${topic.toLowerCase().replace(/\s+/g, '-')}-certificate.jpg`;
    link.href = image;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onGenerate) onGenerate();
  };

  return (
    <div className="flex flex-col items-center space-y-4 mt-8 mb-12">
      <canvas 
        ref={canvasRef} 
        className="w-full max-w-4xl rounded-lg shadow-lg"
        style={{ aspectRatio: '3/2' }}
      />
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Certificate
      </button>
    </div>
  );
};

export default Certificate;
