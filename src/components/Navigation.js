import React from 'react';
import { MapPin, Navigation as NavigationIcon, Settings, Bell } from 'lucide-react';

const Navigation = ({ currentTime, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-100 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-indigo-200 rounded-full opacity-15 blur-lg"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300 rounded-full opacity-20 blur-md"></div>
      
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 relative z-10">
        {/* Header - Dark Purple Theme */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 px-6 py-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button 
                  onClick={onBack}
                  className="p-2 bg-white bg-opacity-15 rounded-lg backdrop-blur-sm hover:bg-opacity-25 transition-colors"
                >
                  <NavigationIcon className="w-4 h-4" />
                </button>
                <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <NavigationIcon className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Navigation</h1>
                  <p className="text-purple-200 text-xs">Manila, Philippines</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="p-2 bg-white bg-opacity-15 rounded-lg backdrop-blur-sm">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="p-2 bg-white bg-opacity-15 rounded-lg backdrop-blur-sm">
                  <Settings className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="text-center mt-3 text-purple-100 text-sm font-medium">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg shadow-sm">
                <MapPin className="w-4 h-4 text-purple-700" />
              </div>
              <span className="font-semibold text-gray-800">Route Map</span>
            </div>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl h-96 flex items-center justify-center border-2 border-dashed border-gray-300 shadow-inner">
            <div className="text-center text-gray-500">
              <div className="p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full w-fit mx-auto mb-3">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">Interactive Map</p>
              <p className="text-xs mt-1 text-gray-500">Navigation display will appear here</p>
            </div>
          </div>
        </div>

        {/* Current Route Status */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Current Route</p>
              <p className="font-semibold text-gray-800 text-base">Home → Downtown Office</p>
            </div>
            <div className="text-right">
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 px-3 py-2 rounded-full shadow-sm">
                <p className="text-lg font-bold text-emerald-700">24 min</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">ETA: 8:45 AM</p>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="p-6 bg-gradient-to-b from-purple-50 to-purple-100/60">
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-2xl font-medium shadow-sm transition-all">
               Start Navigation
            </button>
            <div className="flex gap-3">
              <button 
                onClick={onBack}
                className="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 py-2 rounded-2xl font-medium shadow-sm transition-all"
              >
                ← Back to Home
              </button>
              <button className="px-4 bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 text-purple-700 rounded-2xl font-medium shadow-sm transition-all">
                 Refresh Route
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-indigo-400/30"></div>
          
        </div>
      </div>
    </div>
  );
};

export default Navigation;