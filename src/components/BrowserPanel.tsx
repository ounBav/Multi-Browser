import React, { useState } from 'react';
import { X, RefreshCw, Play, Trash2 } from 'lucide-react';

interface BrowserPanelProps {
  id: string;
  onRemove: (id: string) => void;
  showRemoveButton: boolean;
}

const BrowserPanel: React.FC<BrowserPanelProps> = ({ id, onRemove, showRemoveButton }) => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    // If it looks like just a video ID
    if (url.match(/^[a-zA-Z0-9_-]{11}$/)) {
      return url;
    }
    
    return null;
  };

  const handleLoad = () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL or video ID');
      return;
    }

    setIsLoading(true);
    setError('');

    const extractedId = extractVideoId(url.trim());
    
    if (extractedId) {
      setVideoId(extractedId);
      setError('');
    } else {
      setError('Invalid YouTube URL. Please use a valid YouTube link or video ID.');
    }
    
    setIsLoading(false);
  };

  const handleClear = () => {
    setUrl('');
    setVideoId('');
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLoad();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Browser Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          {showRemoveButton && (
            <button
              onClick={() => onRemove(id)}
              className="p-1 hover:bg-red-100 rounded-full transition-colors duration-200 group"
              title="Remove panel"
            >
              <Trash2 className="w-4 h-4 text-gray-600 group-hover:text-red-600" />
            </button>
          )}
        </div>
        
        {/* Address Bar */}
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter YouTube URL or video ID..."
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
          <button
            onClick={handleLoad}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Load</span>
          </button>
          {(url || videoId) && (
            <button
              onClick={handleClear}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              title="Clear"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="aspect-video bg-gray-900 relative">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-50">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-red-700 font-medium mb-2">Error Loading Video</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}
        
        {!videoId && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="text-center text-gray-400">
              <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-10 h-10 text-gray-500" />
              </div>
              <p className="text-lg font-medium mb-2">Ready to Load Video</p>
              <p className="text-sm">Enter a YouTube URL above to get started</p>
            </div>
          </div>
        )}

        {videoId && !error && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=0&modestbranding=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        )}
      </div>
    </div>
  );
};

export default BrowserPanel;