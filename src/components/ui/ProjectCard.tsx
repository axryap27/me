import { useState } from 'react';
import { TiltCard } from '@/components/ui/TiltCard';
import { ImageStack } from '@/components/ui/ImageStack';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  category: string;
  year: string;
  githubUrl: string;
  externalUrl?: string;
  images?: string[];
  size?: 'phone' | 'square';
  layout?: 'horizontal' | 'vertical';
}

export function ProjectCard({
  title,
  description,
  tech,
  category,
  year,
  githubUrl,
  externalUrl,
  images,
  size = 'square',
  layout = 'horizontal'
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const cardDimensions = size === 'phone'
    ? isExpanded
      ? "w-[280px] h-[580px]"
      : "w-[160px] h-[320px]"
    : "w-[300px] h-[300px]";

  const isVerticalLayout = layout === 'vertical';

  return (
    <div className={`flex ${isVerticalLayout ? 'flex-col' : 'flex-col lg:flex-row'} items-center gap-4 ${isVerticalLayout ? '' : 'lg:gap-8'}`}>
      {/* Project Card Image */}
      <div className="flex-shrink-0">
        <TiltCard
          className={`${cardDimensions} transition-all duration-500 ease-in-out`}
          intensity={8}
          scale={1.02}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700">
            {/* Project Image */}
            <div className="absolute inset-2 rounded-xl">
              {images && images.length > 0 ? (
                <ImageStack
                  images={images}
                  alt={title}
                  objectPosition={size === 'phone' && !isExpanded ? '5% center' : 'center'}
                />
              ) : (
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
                  <div className="text-6xl text-white/50">
                    📱
                  </div>
                </div>
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Expand/Collapse button for phone cards */}
            {size === 'phone' && (
              <div className="absolute top-4 right-4 z-10">
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-2 h-8 w-8 bg-black/30 hover:bg-white/20 border border-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                >
                  {isExpanded ? (
                    <Minimize2 className="h-4 w-4 text-white" />
                  ) : (
                    <Maximize2 className="h-4 w-4 text-white" />
                  )}
                </Button>
              </div>
            )}

            {/* Project info on card */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <div className="flex gap-2">
                {githubUrl && githubUrl !== '#' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="p-2 h-8 w-8 bg-black/30 hover:bg-white/20 border border-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(githubUrl, '_blank');
                    }}
                  >
                    <Github className="h-4 w-4 text-white" />
                  </Button>
                )}
                {externalUrl && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="p-2 h-8 w-8 bg-black/30 hover:bg-white/20 border border-white/20"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(externalUrl, '_blank');
                    }}
                  >
                    <ExternalLink className="h-4 w-4 text-white" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </TiltCard>
      </div>

      {/* Project Details */}
      <div className="flex-1 max-w-[300px]">
        <div className="space-y-2">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">{year}</div>
            <h3 className="text-base font-bold mb-0.5 text-white">{title}</h3>
            <div className="text-xs text-gray-400 mb-1">{category}</div>
            <p className="text-gray-400 text-sm leading-snug line-clamp-3">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {tech.map((techItem, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-0.5 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700"
              >
                {techItem}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
