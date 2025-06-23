import React from "react";

interface ShortsPanelProps {
  id: string;
  url: string;
  onRemove: (id: string) => void;
  showRemoveButton: boolean;
}

const getShortsEmbedUrl = (input: string): string => {
  const match = input.match(/(?:shorts\/|youtu\.be\/|watch\?v=)?([a-zA-Z0-9_-]{11})/);
  const videoId = match?.[1] || input;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`;
};

const ShortsPanel: React.FC<ShortsPanelProps> = ({ id, url, onRemove, showRemoveButton }) => {
  const embedUrl = getShortsEmbedUrl(url);

  return (
    <div className="relative bg-white rounded-xl border shadow-sm overflow-hidden">
      {showRemoveButton && (
        <button
          onClick={() => onRemove(id)}
          className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full px-2 py-1 text-xs"
        >
          ×
        </button>
      )}
      <div className="aspect-[9/16]">
        <iframe
          title={`short-${id}`}
          src={embedUrl}
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full border-0 rounded-b-xl"
        />
      </div>
    </div>
  );
};

export default ShortsPanel;
