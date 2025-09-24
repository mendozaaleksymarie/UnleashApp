import React, { useState, useEffect } from 'react';
import { MapPin, AlertTriangle, Shield, Construction, Thermometer, Navigation, Settings, Bell } from 'lucide-react';

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
    if (index < 80) return 'text-green-600 bg-green-100';
    if (index < 90) return 'text-yellow-600 bg-yellow-100';
    if (index < 105) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getHeatIndexWarning = (index) => {
    if (index < 80) return 'Safe conditions';
    if (index < 90) return 'Caution advised';
    if (index < 105) return 'Take frequent breaks';
    return 'Extreme caution - limit exposure';
  };

  const trafficAlerts = [
    { id: 1, type: 'accident', location: 'I-95 Northbound Mile 45', distance: '0.8 mi', time: '5 min ago', icon: AlertTriangle, color: 'red' },
    { id: 2, type: 'construction', location: 'Route 1 & Main St', distance: '1.2 mi', time: 'Ongoing', icon: Construction, color: 'orange' },
    { id: 3, type: 'police', location: 'Highway 50 Exit 12', distance: '2.1 mi', time: '15 min ago', icon: Shield, color: 'blue' },
    { id: 4, type: 'traffic', location: 'Downtown Bridge', distance: '0.5 mi', time: 'Live', icon: MapPin, color: 'yellow' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Navigation className="w-6 h-6" />
              <div>
                <h1 className="text-lg font-bold">TrafficGuard+</h1>
                <p className="text-blue-100 text-xs">Health-Aware Navigation</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Bell className="w-5 h-5" />
              <Settings className="w-5 h-5" />
            </div>
          </div>
          <div className="text-center mt-2 text-blue-100 text-sm">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>

        {/* Heat Index Alert - Prominent for Hypertension Monitoring */}
        <div className="p-4 border-b bg-gradient-to-r from-red-50 to-orange-50">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-gray-800">Heat Index Monitor</span>
            </div>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
              HYPERTENSION ALERT
            </span>
          </div>
          
          <div className={`text-center p-4 rounded-xl ${getHeatIndexColor(heatIndex)}`}>
            <div className="text-3xl font-bold mb-1">{Math.round(heatIndex)}°F</div>
            <div className="text-sm font-medium mb-2">Current Heat Index</div>
            <div className="text-xs opacity-75">
              Temp: {Math.round(temperature)}°F | Humidity: {Math.round(humidity)}%
            </div>
          </div>
          
          <div className="mt-3 p-3 bg-white rounded-lg border-l-4 border-red-400">
            <p className="text-sm font-medium text-gray-800 mb-1">
              ⚠️ {getHeatIndexWarning(heatIndex)}
            </p>
            <p className="text-xs text-gray-600">
              High heat can affect blood pressure. Stay hydrated and consider air conditioning.
            </p>
          </div>
        </div>

        {/* Current Route Status */}
        <div className="p-4 bg-green-50 border-b">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Current Route</p>
              <p className="font-semibold text-gray-800">Home → Downtown Office</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">24 min</p>
              <p className="text-xs text-gray-500">ETA: 8:45 AM</p>
            </div>
          </div>
        </div>

        {/* Traffic Alerts */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
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
                <div key={alert.id} className={`p-3 border rounded-xl ${colorClasses[alert.color]}`}>
                  <div className="flex items-start gap-3">
                    <IconComponent className="w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm capitalize">
                        {alert.type === 'police' ? 'Police Checkpoint' : 
                         alert.type === 'construction' ? 'Road Construction' :
                         alert.type === 'accident' ? 'Traffic Accident' : 'Heavy Traffic'}
                      </p>
                      <p className="text-xs opacity-75 truncate">{alert.location}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs opacity-75">{alert.distance} ahead</span>
                        <span className="text-xs opacity-75">•</span>
                        <span className="text-xs opacity-75">{alert.time}</span>
                      </div>
                    </div>
                    <button className="text-xs px-2 py-1 bg-white bg-opacity-70 rounded-lg font-medium">
                      Avoid
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="grid grid-cols-3 gap-3">
            <button className="p-3 bg-white rounded-xl shadow-sm border hover:bg-gray-50 transition-colors">
              <Navigation className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <span className="text-xs font-medium text-gray-700">Navigate</span>
            </button>
            <button className="p-3 bg-white rounded-xl shadow-sm border hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5 text-green-600 mx-auto mb-1" />
              <span className="text-xs font-medium text-gray-700">Alerts</span>
            </button>
            <button className="p-3 bg-white rounded-xl shadow-sm border hover:bg-gray-50 transition-colors">
              <Thermometer className="w-5 h-5 text-red-600 mx-auto mb-1" />
              <span className="text-xs font-medium text-gray-700">Health</span>
            </button>
          </div>
        </div>

        {/* Health Reminder Footer */}
        <div className="p-3 bg-blue-600 text-white text-center">
          <p className="text-xs">
            💙 Drive safely. Monitor your health. Stay hydrated.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrafficHealthApp;
