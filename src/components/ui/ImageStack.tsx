import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './button';

interface ImageStackProps {
  images: string[];
  alt: string;
  objectPosition?: string;
}

export function ImageStack({ images, alt, objectPosition = 'center' }: ImageStackProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-full flex items-center overflow-visible">
      {/* Navigation controls - positioned outside the card */}
      {images.length > 1 && (
        <>
          {/* Left arrow - outside card */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevImage}
            onMouseMove={handleMouseMove}
            className="absolute -left-14 top-1/2 -translate-y-1/2 p-2 h-9 w-9 bg-gray-800/90 hover:bg-gray-700 backdrop-blur-sm rounded-full border border-gray-600 z-[100] shadow-lg"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </Button>

          {/* Right arrow - outside card */}
          <Button
            variant="ghost"
            size="sm"
            onClick={nextImage}
            onMouseMove={handleMouseMove}
            className="absolute -right-14 top-1/2 -translate-y-1/2 p-2 h-9 w-9 bg-gray-800/90 hover:bg-gray-700 backdrop-blur-sm rounded-full border border-gray-600 z-[100] shadow-lg"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </Button>
        </>
      )}

      {/* Stacked cards container */}
      <div className="relative w-full h-full">
        {/* Stacked cards behind */}
        {images.length > 1 && (
          <>
            {/* Third card (furthest back) */}
            {images.length > 2 && (
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 opacity-30"
                style={{
                  transform: 'translate(8px, 8px) scale(0.96)',
                  zIndex: 0
                }}
              />
            )}

            {/* Second card (middle) */}
            <div
              className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 opacity-50"
              style={{
                transform: 'translate(4px, 4px) scale(0.98)',
                zIndex: 1
              }}
            />
          </>
        )}

        {/* Current image (front card) */}
        <div className="relative w-full h-full rounded-xl overflow-hidden" style={{ zIndex: 2 }}>
          <img
            src={images[currentImageIndex]}
            alt={`${alt} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{ objectPosition }}
            key={currentImageIndex}
          />

          {/* Pagination dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'bg-white w-4'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
