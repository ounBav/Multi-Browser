import React, { useState } from 'react';
import BrowserPanel from './components/BrowserPanel';
import { Plus, Monitor, Youtube } from 'lucide-react';

function App() {
  const availablePanels = 10;
  const [panels, setPanels] = useState([
    { id: '1' },
    { id: '2' }
  ]);

  const addPanel = () => {
    if (panels.length < availablePanels) {
      const newId = Date.now().toString();
      setPanels([...panels, { id: newId }]);
    }
  };

  const removePanel = (id: string) => {
    if (panels.length > 1) {
      setPanels(panels.filter(panel => panel.id !== id));
    }
  };

  const getGridCols = () => {
    switch (panels.length) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-1 lg:grid-cols-2';
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'grid-cols-1 md:grid-cols-2';
      default: return 'grid-cols-1 lg:grid-cols-2';
    }
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
                <h1 className="text-xl font-bold text-gray-900">Multi-Browser YouTube Viewer</h1>
                <p className="text-sm text-gray-600">Watch multiple videos simultaneously</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
                <Monitor className="w-4 h-4" />
                <span>{panels.length} panel{panels.length !== 1 ? 's' : ''}</span>
              </div>
              
              {panels.length < availablePanels && (
                <button
                  onClick={addPanel}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Panel
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{panels.length}</div>
              <div className="text-sm text-gray-600">Active Panels</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{availablePanels - panels.length}</div>
              <div className="text-sm text-gray-600">Available Slots</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">∞</div>
              <div className="text-sm text-gray-600">Video Options</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">HD</div>
              <div className="text-sm text-gray-600">Quality Support</div>
            </div>
          </div>
        </div>

        {/* Browser Panels Grid */}
        <div className={`grid ${getGridCols()} gap-6 transition-all duration-300`}>
          {panels.map((panel) => (
            <div
              key={panel.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${panels.indexOf(panel) * 100}ms`
              }}
            >
              <BrowserPanel
                id={panel.id}
                onRemove={removePanel}
                showRemoveButton={panels.length > 1}
              />
            </div>
          ))}
        </div>

        {/* Instructions */}
        {panels.length === 2 && panels.every(panel => true) && (
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Getting Started</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                <div>
                  <p className="font-medium">Paste YouTube URLs</p>
                  <p className="text-blue-700">Supports youtube.com/watch, youtu.be/, or just video IDs</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                <div>
                  <p className="font-medium">Add More Panels</p>
                  <p className="text-blue-700">Click "Add Panel" to create up to 4 simultaneous viewers</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;