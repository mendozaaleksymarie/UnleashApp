import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Shield, Construction, Thermometer, Navigation, Settings, Bell, Activity, TrendingUp } from 'lucide-react';

const TrafficHealthApp = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [heatIndex, setHeatIndex] = useState(89);
  const [temperature, setTemperature] = useState(92);
  const [humidity, setHumidity] = useState(65);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHeatIndex(prev => prev + (Math.random() - 0.5) * 2);
      setTemperature(prev => prev + (Math.random() - 0.5) * 1.5);
      setHumidity(prev => Math.max(30, Math.min(90, prev + (Math.random() - 0.5) * 3)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getHeatIndexColor = (index) => {
    if (index < 80) return 'text-emerald-600 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200';
    if (index < 90) return 'text-amber-600 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
    if (index < 105) return 'text-orange-600 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200';
    return 'text-red-600 bg-gradient-to-r from-red-50 to-pink-50 border-red-200';
  };

  const getHeatIndexWarning = (index) => {
    if (index < 80) return 'Safe conditions';
    if (index < 90) return 'Caution advised';
    if (index < 105) return 'Take frequent breaks';
    return 'Extreme caution - limit exposure';
  };

  const getHeatIndexLevel = (index) => {
    if (index < 80) return { level: 'NORMAL', color: 'text-emerald-600' };
    if (index < 90) return { level: 'CAUTION', color: 'text-amber-600' };
    if (index < 105) return { level: 'WARNING', color: 'text-orange-600' };
    return { level: 'DANGER', color: 'text-red-600' };
  };

  // Circular progress for heat index with purple gradient
  const getCircularProgress = (value, max = 120) => {
    const percentage = Math.min((value / max) * 100, 100);
    const strokeDasharray = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;
    
    return { strokeDasharray, strokeDashoffset, percentage };
  };

  // Heat map bars
  const getHeatMapBars = (currentIndex) => {
    const hours = Array.from({ length: 12 }, (_, i) => {
      const hour = i + 6; // Starting from 6 AM
      const baseTemp = 75 + Math.sin((i / 12) * Math.PI * 2) * 15 + Math.random() * 10;
      const isCurrentHour = i === 8; // Simulate current hour
      return {
        hour: hour > 12 ? `${hour - 12}PM` : `${hour}AM`,
        temp: Math.round(baseTemp),
        height: Math.min((baseTemp / 110) * 100, 100),
        isCurrent: isCurrentHour
      };
    });
    
    return hours.map((data, index) => (
      <div key={index} className="flex flex-col items-center">
        <div className="h-16 w-6 bg-gray-100 rounded-full relative overflow-hidden shadow-inner">
          <div 
            className={`absolute bottom-0 w-full rounded-full transition-all duration-500 ${
              data.isCurrent ? 'bg-gradient-to-t from-purple-600 to-purple-400' : 
              data.temp < 80 ? 'bg-gradient-to-t from-emerald-500 to-emerald-300' :
              data.temp < 90 ? 'bg-gradient-to-t from-amber-500 to-amber-300' :
              data.temp < 105 ? 'bg-gradient-to-t from-orange-500 to-orange-300' : 'bg-gradient-to-t from-red-500 to-red-300'
            }`}
            style={{ height: `${data.height}%` }}
          />
        </div>
        <span className="text-xs text-gray-600 mt-1">{data.hour}</span>
      </div>
    ));
  };

  const trafficAlerts = [
    { id: 1, type: 'accident', location: 'I-95 Northbound Mile 45', distance: '0.8 mi', time: '5 min ago', icon: AlertTriangle, color: 'red' },
    { id: 2, type: 'construction', location: 'Route 1 & Main St', distance: '1.2 mi', time: 'Ongoing', icon: Construction, color: 'orange' },
    { id: 3, type: 'police', location: 'Highway 50 Exit 12', distance: '2.1 mi', time: '15 min ago', icon: Shield, color: 'blue' },
    { id: 4, type: 'traffic', location: 'Downtown Bridge', distance: '0.5 mi', time: 'Live', icon: MapPin, color: 'yellow' }
  ];

  const heatLevel = getHeatIndexLevel(heatIndex);
  const circularProgress = getCircularProgress(heatIndex);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
        {/* Header - Dark Purple Theme */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 px-6 py-5 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">TrafficGuard+</h1>
                  <p className="text-purple-200 text-xs">Health-Aware Navigation</p>
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

        {/* Heat Index Monitor - Enhanced Modern Design */}
        <div className="p-6 bg-gradient-to-br from-white to-purple-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
                <Activity className="w-4 h-4 text-purple-700" />
              </div>
              <span className="font-semibold text-gray-800">Heat Index Monitor</span>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${heatLevel.level === 'NORMAL' ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700' : heatLevel.level === 'CAUTION' ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700' : heatLevel.level === 'WARNING' ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700' : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700'}`}>
              {heatLevel.level}
            </span>
          </div>
          
          {/* Circular Progress Display */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <svg width="120" height="120" className="transform -rotate-90 drop-shadow-sm">
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(147, 51, 234)" />
                    <stop offset="50%" stopColor="rgb(168, 85, 247)" />
                    <stop offset="100%" stopColor="rgb(99, 102, 241)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="rgb(243, 244, 246)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="45"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circularProgress.strokeDasharray}
                  strokeDashoffset={circularProgress.strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">{Math.round(heatIndex)}</span>
                <span className="text-xs text-gray-500">°F</span>
              </div>
            </div>
            
            <div className="flex-1 ml-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                  <span className="text-sm text-gray-600">Temperature</span>
                  <span className="font-semibold text-purple-700">{Math.round(temperature)}°F</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                  <span className="text-sm text-gray-600">Humidity</span>
                  <span className="font-semibold text-purple-700">{Math.round(humidity)}%</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
                  <span className="text-sm text-gray-600">Status</span>
                  <span className={`font-semibold ${heatLevel.color}`}>{heatLevel.level}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 12-Hour Heat Trend */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 shadow-inner">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1 bg-gradient-to-r from-purple-200 to-indigo-200 rounded-lg">
                <TrendingUp className="w-3 h-3 text-purple-700" />
              </div>
              <span className="text-sm font-medium text-gray-700">12-Hour Heat Trend</span>
            </div>
            <div className="flex items-end justify-between gap-1">
              {getHeatMapBars(heatIndex)}
            </div>
          </div>
          
          {/* Health Warning */}
          <div className={`mt-4 p-4 rounded-xl border-l-4 ${getHeatIndexColor(heatIndex)}`}>
            <p className="text-sm font-medium text-slate-800 mb-1">
              ⚠️ {getHeatIndexWarning(heatIndex)}
            </p>
            <p className="text-xs text-slate-600">
              High heat can affect blood pressure. Stay hydrated and consider air conditioning.
            </p>
          </div>
        </div>

        {/* Current Route Status */}
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-purple-100">
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

        {/* Traffic Alerts */}
        <div className="p-6 bg-gradient-to-b from-white to-purple-25">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <div className="p-1 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </div>
            Live Traffic Alerts
          </h3>
          
          <div className="space-y-3">
            {trafficAlerts.map((alert) => {
              const IconComponent = alert.icon;
              const colorClasses = {
                red: 'border-red-200 bg-gradient-to-r from-red-50 to-pink-50 text-red-600',
                orange: 'border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 text-orange-600',
                blue: 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600',
                yellow: 'border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-600'
              };
              
              return (
                <div key={alert.id} className={`p-4 border-2 rounded-2xl ${colorClasses[alert.color]} hover:shadow-sm transition-all`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white rounded-xl shadow-sm">
                      <IconComponent className="w-4 h-4 flex-shrink-0" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-slate-800">
                        {alert.type === 'police' ? 'Police Checkpoint' : 
                         alert.type === 'construction' ? 'Road Construction' :
                         alert.type === 'accident' ? 'Traffic Accident' : 'Heavy Traffic'}
                      </p>
                      <p className="text-xs text-slate-600 truncate mt-1">{alert.location}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-white px-2 py-1 rounded-full font-medium text-slate-600">
                          {alert.distance} ahead
                        </span>
                        <span className="text-xs text-slate-500">{alert.time}</span>
                      </div>
                    </div>
                    <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-3 py-2 rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-sm">
                      Avoid
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-gradient-to-r from-purple-50 via-white to-indigo-50 border-t border-purple-100">
          <div className="grid grid-cols-3 gap-4">
            <button className="p-4 bg-white rounded-2xl shadow-sm border border-purple-100 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white transition-all group">
              <Navigation className="w-6 h-6 text-purple-600 group-hover:text-white mx-auto mb-2" />
              <span className="text-xs font-semibold text-gray-700 group-hover:text-white">Navigate</span>
            </button>
            <button className="p-4 bg-white rounded-2xl shadow-sm border border-purple-100 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white transition-all group">
              <Bell className="w-6 h-6 text-emerald-600 group-hover:text-white mx-auto mb-2" />
              <span className="text-xs font-semibold text-gray-700 group-hover:text-white">Alerts</span>
            </button>
            <button className="p-4 bg-white rounded-2xl shadow-sm border border-purple-100 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 hover:text-white transition-all group">
              <Thermometer className="w-6 h-6 text-red-500 group-hover:text-white mx-auto mb-2" />
              <span className="text-xs font-semibold text-gray-700 group-hover:text-white">Health</span>
            </button>
          </div>
        </div>

        {/* Health Reminder Footer */}
        <div className="p-4 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20"></div>
          <p className="text-sm font-medium relative z-10">
            💜 Drive safely. Monitor your health. Stay hydrated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrafficHealthApp;
