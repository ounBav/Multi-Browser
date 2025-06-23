import React, { useEffect, useState } from "react";

interface BrowserPanelProps {
  id: string;
  url: string;
  onRemove: (id: string) => void;
  showRemoveButton: boolean;
}

const getEmbedUrl = (url: string): string => {
  if (!url) return "";

  // Convert normal URL or ID to embed URL
  const videoIdMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|^)([a-zA-Z0-9_-]{11})/
  );
  const videoId = videoIdMatch?.[1] || url;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1`;
};

const BrowserPanel: React.FC<BrowserPanelProps> = ({ id, url, onRemove, showRemoveButton }) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    if (url) {
      setVideoUrl(getEmbedUrl(url));
    }
  }, [url]);

  return (
    <div className="bg-white rounded-xl border shadow-md overflow-hidden relative aspect-video">
      {showRemoveButton && (
        <button
          onClick={() => onRemove(id)}
          className="absolute top-2 right-2 z-10 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      )}
      {videoUrl ? (
        <iframe
          title={`youtube-player-${id}`}
          src={videoUrl}
          className="w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          Loading...
        </div>
      )}
    </div>
  );
};

export default BrowserPanel;
