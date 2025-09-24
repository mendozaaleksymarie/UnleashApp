import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Shield, Construction, Thermometer, Navigation, Settings, Bell, Activity, TrendingUp } from 'lucide-react';
import Health from './Health';
import Alert from './Alert';

const TrafficHealthApp = () => {
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'health', or 'alert'
  const [currentTime, setCurrentTime] = useState(new Date());
  const [heatIndex, setHeatIndex] = useState(32); // Celsius
  const [temperature, setTemperature] = useState(33); // Celsius  
  const [humidity, setHumidity] = useState(65);
  const [location] = useState("Manila, Philippines");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHeatIndex(prev => prev + (Math.random() - 0.5) * 1);
      setTemperature(prev => prev + (Math.random() - 0.5) * 0.8);
      setHumidity(prev => Math.max(30, Math.min(90, prev + (Math.random() - 0.5) * 3)));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getHeatIndexColor = (index) => {
    if (index < 27) return 'text-emerald-600 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200';
    if (index < 32) return 'text-amber-600 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
    if (index < 40) return 'text-orange-600 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200';
    return 'text-red-600 bg-gradient-to-r from-red-50 to-pink-50 border-red-200';
  };

  const getHeatIndexWarning = (index) => {
    if (index < 27) return 'Safe conditions';
    if (index < 32) return 'Caution advised';
    if (index < 40) return 'Take frequent breaks';
    return 'Extreme caution - limit exposure';
  };

  const getHeatIndexLevel = (index) => {
    if (index < 27) return { level: 'NORMAL', color: 'text-emerald-600' };
    if (index < 32) return { level: 'CAUTION', color: 'text-amber-600' };
    if (index < 40) return { level: 'WARNING', color: 'text-orange-600' };
    return { level: 'DANGER', color: 'text-red-600' };
  };

  // Circular progress for heat index - stopwatch style
  const getCircularProgress = (value, max = 50) => {
    const percentage = Math.min((value / max) * 100, 100);
    const strokeDasharray = 2 * Math.PI * 50; // radius = 50
    const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;
    
    return { strokeDasharray, strokeDashoffset, percentage };
  };

  // Get stopwatch color based on heat level
  const getStopwatchColor = (index) => {
    if (index < 27) return '#10b981'; // emerald-500
    if (index < 32) return '#f59e0b'; // amber-500
    if (index < 40) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  // Simplified temperature trend - single color
  const getTemperatureTrend = () => {
    const hours = Array.from({ length: 8 }, (_, i) => {
      const hour = i + 8; // Starting from 8 AM
      const baseTemp = 24 + Math.sin((i / 8) * Math.PI * 2) * 6 + Math.random() * 4;
      const isCurrentHour = i === 4; // Simulate current hour
      return {
        hour: hour > 12 ? `${hour - 12}PM` : `${hour}AM`,
        temp: Math.round(baseTemp),
        height: Math.min((baseTemp / 40) * 100, 100),
        isCurrent: isCurrentHour
      };
    });
    
    return hours.map((data, index) => (
      <div key={index} className="flex flex-col items-center">
        <div className="h-12 w-4 bg-gray-100 rounded-full relative overflow-hidden">
          <div 
            className={`absolute bottom-0 w-full rounded-full transition-all duration-500 ${
              data.isCurrent ? 'bg-purple-600' : 'bg-purple-400'
            }`}
            style={{ height: `${data.height}%` }}
          />
        </div>
        <span className="text-xs text-gray-600 mt-1 font-medium">{data.temp}°</span>
        <span className="text-xs text-gray-500">{data.hour}</span>
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

  // If health page is selected, show the health component
  if (currentPage === 'health') {
    return <Health onBack={() => setCurrentPage('main')} />;
  }

  // If alert page is selected, show the alert component
  if (currentPage === 'alert') {
    return <Alert onBack={() => setCurrentPage('main')} />;
  }

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
                <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">TrafficGuard+</h1>
                  <p className="text-purple-200 text-xs">{location}</p>
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

        {/* Heat Index Monitor - Minimalist Design */}
        <div className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg shadow-sm">
                <Thermometer className="w-4 h-4 text-purple-700" />
              </div>
              <span className="font-semibold text-gray-800">Heat Index Monitor</span>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${heatLevel.level === 'NORMAL' ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700' : heatLevel.level === 'CAUTION' ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700' : heatLevel.level === 'WARNING' ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700' : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-700'}`}>
              {heatLevel.level}
            </span>
          </div>

          {/* Minimalist Circular Progress */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <svg width="140" height="140" className="transform -rotate-90">
                <defs>
                  <linearGradient id="minimalistGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(147, 51, 234)" />
                    <stop offset="100%" stopColor="rgb(99, 102, 241)" />
                  </linearGradient>
                </defs>
                
                {/* Background circle - very thin */}
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  stroke="rgb(243, 244, 246)"
                  strokeWidth="4"
                  fill="transparent"
                />
                
                {/* Progress arc - clean and simple */}
                <circle
                  cx="70"
                  cy="70"
                  r="60"
                  stroke="url(#minimalistGradient)"
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={circularProgress.strokeDasharray}
                  strokeDashoffset={circularProgress.strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
                
                {/* Simple pointer dot */}
                <circle 
                  cx={70 + Math.cos((circularProgress.percentage / 100) * 2 * Math.PI - Math.PI / 2) * 60} 
                  cy={70 + Math.sin((circularProgress.percentage / 100) * 2 * Math.PI - Math.PI / 2) * 60} 
                  r="4" 
                  fill="rgb(147, 51, 234)"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              
              {/* Clean center display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">TODAY</div>
                  <div className="text-3xl font-light text-gray-800 mb-1">{Math.round(heatIndex)}°C</div>
                </div>
              </div>
              
              {/* Simple range indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-between text-xs text-gray-400 px-4">
                <span>0</span>
                <span>50</span>
              </div>
            </div>
            
            {/* Caution Advised Message */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <div className="p-1 bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm font-semibold text-amber-700">Caution Advised</span>
              </div>
              <p className="text-xs text-amber-600 text-center mt-2">
                Monitor heat levels and stay hydrated during travel
              </p>
            </div>
          </div>

          {/* 8-Hour Temperature Trend */}
          <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-4 shadow-inner border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
                <TrendingUp className="w-3 h-3 text-purple-700" />
              </div>
              <span className="text-sm font-medium text-gray-700">Today's Temperature Trend</span>
            </div>
            <div className="flex items-end justify-between gap-2">
              {getTemperatureTrend()}
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
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Current Route</p>
              <p className="font-semibold text-gray-800 text-base">Home → Makati CBD</p>
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
        <div className="p-6 bg-gradient-to-b from-purple-50 to-purple-100/60">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <div className="p-1 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg shadow-sm">
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
                    <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs px-4 py-2 rounded-xl font-medium hover:from-purple-700 hover:to-purple-800 transition-all shadow-sm">
                      Avoid
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-white border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4">
            <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white transition-all group">
              <Navigation className="w-6 h-6 text-purple-600 group-hover:text-white mx-auto mb-2" />
              <span className="text-xs font-semibold text-gray-700 group-hover:text-white">Navigate</span>
            </button>
            <button 
              onClick={() => setCurrentPage('alert')}
              className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white transition-all group">
              <Bell className="w-6 h-6 text-emerald-600 group-hover:text-white mx-auto mb-2" />
              <span className="text-xs font-semibold text-gray-700 group-hover:text-white">Alerts</span>
            </button>
            <button 
              onClick={() => setCurrentPage('health')}
              className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white transition-all group">
              <Thermometer className="w-6 h-6 text-red-500 group-hover:text-white mx-auto mb-2" />
              <span className="text-xs font-semibold text-gray-700 group-hover:text-white">Health</span>
            </button>
          </div>
        </div>

        {/* Health Reminder Footer */}
        <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-indigo-400/30"></div>
          <p className="text-sm font-medium relative z-10">
            💜 Drive safely. Monitor your health. Stay hydrated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrafficHealthApp;
