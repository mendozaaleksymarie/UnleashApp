import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Shield, Construction, Thermometer, Navigation as NavigationIcon, Settings, Bell } from 'lucide-react';
import Health from './Health';
<<<<<<< HEAD
import Navigation from './Navigation';

const TrafficHealthApp = () => {
=======
import Alert from './Alert';

const TrafficHealthApp = () => {
  const [currentPage, setCurrentPage] = useState('main'); // 'main', 'health', or 'alert'
>>>>>>> ccd4f1304f236005159ffba4fea4678a1c7e6a35
  const [currentTime, setCurrentTime] = useState(new Date());
  const [heatIndex, setHeatIndex] = useState(32);
  const [temperature, setTemperature] = useState(92);
  const [humidity, setHumidity] = useState(65);
  const [currentPage, setCurrentPage] = useState('home'); // home, navigate, health

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
    if (index < 27) return 'text-green-600 bg-green-100';
    if (index < 32) return 'text-yellow-600 bg-yellow-100';
    if (index < 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getHeatIndexWarning = (index) => {
    if (index < 27) return 'Safe conditions';
    if (index < 32) return 'Caution advised';
    if (index < 40) return 'Take frequent breaks';
    return 'Extreme caution - limit exposure';
  };


  // If health page is selected, show the health component
  if (currentPage === 'health') {
    return <Health onBack={() => setCurrentPage('home')} />;
  }

  // If navigate page is selected, show the navigation component
  if (currentPage === 'navigate') {
    return <Navigation currentTime={currentTime} onBack={() => setCurrentPage('home')} />;
  }

  const trafficAlerts = [
    { id: 1, type: 'accident', location: 'I-95 Northbound Mile 45', distance: '0.8 mi', time: '5 min ago', icon: AlertTriangle, color: 'red' },
    { id: 2, type: 'construction', location: 'Route 1 & Main St', distance: '1.2 mi', time: 'Ongoing', icon: Construction, color: 'orange' },
    { id: 3, type: 'police', location: 'Highway 50 Exit 12', distance: '2.1 mi', time: '15 min ago', icon: Shield, color: 'blue' },
    { id: 4, type: 'traffic', location: 'Downtown Bridge', distance: '0.5 mi', time: 'Live', icon: MapPin, color: 'yellow' }
  ];

<<<<<<< HEAD
=======
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

>>>>>>> ccd4f1304f236005159ffba4fea4678a1c7e6a35
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
                  <NavigationIcon className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">TrafficGuard+</h1>
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

        {/* Heat Index Alert - Prominent for Hypertension Monitoring */}
        <div className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg shadow-sm">
                <Thermometer className="w-4 h-4 text-red-700" />
              </div>
              <span className="font-semibold text-gray-800">Heat Index Monitor</span>
            </div>
            
          </div>
          
          {/* Circular Progress Display */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <div className="w-32 h-32 rounded-full border-8 border-gray-200"></div>
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-purple-500 border-t-transparent transform rotate-45"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{Math.round(heatIndex)}°C</div>
                <div className="text-xs text-gray-600">TODAY</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border-l-4 border-orange-400 shadow-sm">
            <p className="text-sm font-medium text-gray-800 mb-1">
              ⚠️ Take frequent breaks
            </p>
            <p className="text-xs text-gray-600">
              High heat can affect blood pressure. Stay hydrated and consider air conditioning.
            </p>
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
                red: 'border-red-200 bg-red-50 text-red-700',
                orange: 'border-orange-200 bg-orange-50 text-orange-700',
                blue: 'border-blue-200 bg-blue-50 text-blue-700',
                yellow: 'border-yellow-200 bg-yellow-50 text-yellow-700'
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
            <button 
              onClick={() => setCurrentPage('navigate')}
              className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white transition-all group"
            >
              <NavigationIcon className="w-6 h-6 text-purple-600 group-hover:text-white mx-auto mb-2" />
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
              className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:bg-gradient-to-r hover:from-purple-500 hover:to-indigo-500 hover:text-white transition-all group"
            >
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