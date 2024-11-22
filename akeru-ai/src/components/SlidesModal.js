import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

const SlidesModal = ({ isOpen, onClose, slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  if (!slides || !Array.isArray(slides) || slides.length === 0) {
    return null;
  }

  const currentSlide = slides[currentSlideIndex];

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {currentSlide.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{currentSlide.content}</ReactMarkdown>
          </div>
        </div>

        <div className="flex justify-between items-center p-4 border-t border-gray-700">
          <div className="text-sm text-gray-400">
            Slide {currentSlideIndex + 1} of {slides.length}
          </div>
          <div className="flex gap-2">
            <button
              onClick={goToPreviousSlide}
              disabled={currentSlideIndex === 0}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={goToNextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SlidesModal;
