import React, { useState } from "react";
import BrowserPanel from "./components/BrowserPanel";
import { Plus, Monitor, Youtube } from "lucide-react";

function App() {
  const availablePanels = 100;
  const [panels, setPanels] = useState<{ id: string; url: string }[]>([]);
  const [panelCountInput, setPanelCountInput] = useState("2");
  const [urlInput, setUrlInput] = useState("");

  const handleStart = () => {
    const count = Math.min(parseInt(panelCountInput || "0"), availablePanels);
    const url = urlInput.trim();

    if (!url || count <= 0) return;

    const newPanels = Array.from({ length: count }, (_, i) => ({
      id: `${Date.now()}-${i}`,
      url: url,
    }));

    setPanels(newPanels);
  };

  const removePanel = (id: string) => {
    if (panels.length > 1) {
      setPanels(panels.filter((panel) => panel.id !== id));
    }
  };

  const getGridCols = () => {
    if (panels.length <= 1) return "grid-cols-1";
    if (panels.length === 2) return "grid-cols-1 lg:grid-cols-2";
    if (panels.length === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (panels.length === 4) return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 lg:grid-cols-2";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Multi-Browser YouTube Viewer
                </h1>
                <p className="text-sm text-gray-600">
                  Watch multiple videos simultaneously
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Form */}
        <div className="mb-6 bg-white/70 rounded-xl border border-gray-200 p-6 space-y-4">
          <div className="grid md:grid-cols-3 gap-4 items-center">
            <input
              type="number"
              min="1"
              max={availablePanels}
              placeholder="Number of panels"
              value={panelCountInput}
              onChange={(e) => setPanelCountInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="YouTube URL or ID"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleStart}
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
            >
              Start Watching
            </button>
          </div>
        </div>

        {/* Panels Grid */}
        <div className={`grid ${getGridCols()} gap-6 transition-all duration-300`}>
          {panels.map((panel, index) => (
            <div
              key={panel.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BrowserPanel
                id={panel.id}
                url={panel.url}
                onRemove={removePanel}
                showRemoveButton={panels.length > 1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
