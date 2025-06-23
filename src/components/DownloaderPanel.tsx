import React, { useState } from "react";
import { Download, User, Video, Globe } from "lucide-react";

const platforms = [
  { label: "TikTok", value: "tiktok" },
  { label: "Instagram", value: "instagram" },
  { label: "Facebook", value: "facebook" },
  { label: "Twitter", value: "twitter" },
];

const DownloaderPanel: React.FC = () => {
  const [platform, setPlatform] = useState("tiktok");
  const [videoUrl, setVideoUrl] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("");

  const handleDownloadUrl = () => {
    if (!videoUrl.trim()) {
      setStatus("Please enter a valid video URL.");
      return;
    }

    setStatus("Downloading video...");
    // TODO: Call backend API here
    setTimeout(() => setStatus("Download complete ✅"), 1500);
  };

  const handleDownloadByUsername = () => {
    if (!username.trim()) {
      setStatus("Please enter a valid username.");
      return;
    }

    setStatus(`Downloading all videos from ${username}...`);
    // TODO: Call backend API for bulk download
    setTimeout(() => setStatus(`Downloaded videos from @${username} ✅`), 2000);
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
      <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Download className="w-5 h-5 text-blue-600" /> Social Video Downloader
      </h2>

      {/* Platform selector */}
      <div className="flex gap-4 flex-wrap">
        {platforms.map((p) => (
          <button
            key={p.value}
            onClick={() => setPlatform(p.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border ${
              platform === p.value
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 hover:bg-blue-50 border-gray-300"
            }`}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Video URL Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
          <Video className="w-4 h-4 text-blue-500" />
          Single Video URL
        </label>
        <input
          type="text"
          placeholder={`Paste ${platform} video URL here...`}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button
          onClick={handleDownloadUrl}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Download Video
        </button>
      </div>

      {/* Download by Username */}
      {platform === "tiktok" && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
            <User className="w-4 h-4 text-blue-500" />
            TikTok Username
          </label>
          <input
            type="text"
            placeholder="Enter TikTok username (without @)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={handleDownloadByUsername}
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Download All from @{username || "username"}
          </button>
        </div>
      )}

      {/* Status Message */}
      {status && (
        <div className="mt-4 text-sm text-blue-700 bg-blue-50 rounded-lg p-2 border border-blue-200">
          {status}
        </div>
      )}
    </div>
  );
};

export default DownloaderPanel;
