import React, { useState, useEffect } from 'react';
import { Heart, Thermometer, Droplets, Wind, Play, Pause, CheckCircle, Activity, ArrowLeft } from 'lucide-react';

const Health = ({ onBack }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('inhale'); // inhale, hold, exhale
  const [breathingCount, setBreathingCount] = useState(0);
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [heatIndex, setHeatIndex] = useState(89);
  const [hydrationReminders, setHydrationReminders] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Breathing exercise timer
  useEffect(() => {
    if (breathingActive) {
      const phases = [
        { name: 'inhale', duration: 4000 },
        { name: 'hold', duration: 4000 },
        { name: 'exhale', duration: 6000 }
      ];
      
      let currentPhaseIndex = 0;
      const interval = setInterval(() => {
        const phase = phases[currentPhaseIndex];
        setBreathingPhase(phase.name);
        
        setTimeout(() => {
          currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
          if (currentPhaseIndex === 0) {
            setBreathingCount(prev => prev + 1);
          }
        }, phase.duration);
      }, 14000);
      
      return () => clearInterval(interval);
    }
  }, [breathingActive]);

  // Exercise timer
  useEffect(() => {
    if (currentExercise && exerciseTimer > 0) {
      const interval = setInterval(() => {
        setExerciseTimer(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentExercise, exerciseTimer]);

  const exercises = [
    {
      id: 1,
      name: "Neck Rolls",
      duration: 60,
      description: "Slowly roll your neck in circles to improve blood flow",
      instructions: "5 rolls clockwise, 5 rolls counter-clockwise",
      benefit: "Reduces neck tension, improves circulation"
    },
    {
      id: 2,
      name: "Shoulder Shrugs",
      duration: 30,
      description: "Lift shoulders to ears, hold for 3 seconds, release",
      instructions: "Repeat 10 times slowly",
      benefit: "Releases shoulder tension, improves upper body circulation"
    },
    {
      id: 3,
      name: "Ankle Pumps",
      duration: 45,
      description: "Point toes up and down to activate calf muscle pump",
      instructions: "20 pumps each foot",
      benefit: "Prevents blood pooling in legs, improves venous return"
    },
    {
      id: 4,
      name: "Seated Spinal Twist",
      duration: 60,
      description: "Gently twist your torso left and right while seated",
      instructions: "Hold each side for 15 seconds, repeat 2 times",
      benefit: "Improves spinal mobility, enhances blood flow to organs"
    }
  ];

  const startExercise = (exercise) => {
    setCurrentExercise(exercise);
    setExerciseTimer(exercise.duration);
  };

  const getHeatAdvice = () => {
    if (heatIndex < 80) return { color: 'green', text: 'Safe conditions - maintain normal activity' };
    if (heatIndex < 90) return { color: 'yellow', text: 'Stay hydrated - avoid strenuous activity' };
    if (heatIndex < 105) return { color: 'orange', text: 'Take frequent breaks - use AC when possible' };
    return { color: 'red', text: 'Extreme caution - seek cool environment immediately' };
  };

  const heatAdvice = getHeatAdvice();

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
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="p-2 bg-white bg-opacity-20 rounded-xl backdrop-blur-sm">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold">Health Monitor</h1>
                  <p className="text-purple-200 text-xs">Hypertension Care</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-200 text-xs">Traffic Time</p>
                <p className="text-lg font-bold">15 mins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg shadow-sm">
                <Heart className="w-4 h-4 text-purple-700" />
              </div>
              <span className="font-semibold text-gray-800">Health Dashboard</span>
            </div>
          </div>
          
          {/* Quick Health Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-xl text-center border border-red-100 shadow-sm">
              <div className="p-1 bg-gradient-to-r from-red-100 to-pink-100 rounded-lg w-fit mx-auto mb-1">
                <Thermometer className="w-4 h-4 text-red-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Heat Index</p>
              <p className="font-bold text-red-600">{Math.round(heatIndex)}°F</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl text-center border border-blue-100 shadow-sm">
              <div className="p-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg w-fit mx-auto mb-1">
                <Droplets className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Hydration</p>
              <p className="font-bold text-blue-600">{hydrationReminders}/8</p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-xl text-center border border-green-100 shadow-sm">
              <div className="p-1 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg w-fit mx-auto mb-1">
                <Activity className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xs text-gray-600 font-medium">Exercises</p>
              <p className="font-bold text-green-600">2/4</p>
            </div>
          </div>
        </div>



        {/* Breathing Exercise */}
        <div className="p-6 bg-gradient-to-r from-purple-50 to-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg shadow-sm">
                <Wind className="w-4 h-4 text-purple-700" />
              </div>
              <h2 className="font-semibold text-gray-800">Breathing Exercise</h2>
            </div>
            <button
              onClick={() => setBreathingActive(!breathingActive)}
              className={`p-2 rounded-lg shadow-sm transition-all ${breathingActive ? 'bg-gradient-to-r from-red-100 to-pink-100 text-red-600' : 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600'}`}
            >
              {breathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>
          
          {breathingActive ? (
            <div className="text-center">
              <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg transition-all duration-1000 ${
                breathingPhase === 'inhale' ? 'bg-green-500 transform scale-110' :
                breathingPhase === 'hold' ? 'bg-yellow-500 transform scale-105' :
                'bg-blue-500 transform scale-95'
              }`}>
                {breathingPhase === 'inhale' ? 'Inhale' : 
                 breathingPhase === 'hold' ? 'Hold' : 'Exhale'}
              </div>
              <p className="text-sm text-gray-600 mb-2">Cycles completed: {breathingCount}</p>
              <p className="text-xs text-gray-500">4-4-6 breathing reduces stress and lowers blood pressure</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-3">Deep breathing exercises help lower blood pressure and reduce stress while stuck in traffic</p>
              <p className="text-sm font-medium text-blue-600">4 seconds inhale • 4 seconds hold • 6 seconds exhale</p>
            </div>
          )}
        </div>

        {/* In-Car Exercises */}
        <div className="p-6 bg-gradient-to-r from-purple-50 to-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg shadow-sm">
              <Activity className="w-4 h-4 text-green-700" />
            </div>
            <h2 className="font-semibold text-gray-800">Traffic-Safe Exercises</h2>
          </div>
          
          {currentExercise ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {exerciseTimer}
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{currentExercise.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{currentExercise.description}</p>
              <p className="text-xs font-medium text-green-600 mb-4">💡 {currentExercise.benefit}</p>
              <button
                onClick={() => {setCurrentExercise(null); setExerciseTimer(0);}}
                className="bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-gray-700 px-4 py-2 rounded-2xl text-sm font-medium shadow-sm transition-all"
              >
                Stop Exercise
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {exercises.map(exercise => (
                <div key={exercise.id} className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-4 hover:shadow-sm transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{exercise.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{exercise.instructions}</p>
                      <p className="text-xs text-green-600 mt-1">💡 {exercise.benefit}</p>
                    </div>
                    <button
                      onClick={() => startExercise(exercise)}
                      className="bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 text-green-700 px-3 py-1 rounded-2xl text-sm font-medium ml-3 shadow-sm transition-all"
                    >
                      {exercise.duration}s
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hydration Tracker */}
        <div className="p-6 bg-gradient-to-r from-purple-50 to-gray-50 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg shadow-sm">
                <Droplets className="w-4 h-4 text-blue-700" />
              </div>
              <h2 className="font-semibold text-gray-800">Hydration Tracker</h2>
            </div>
            <button
              onClick={() => setHydrationReminders(prev => Math.min(8, prev + 1))}
              className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium shadow-sm hover:from-blue-200 hover:to-indigo-200 transition-all"
            >
              + Water
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`w-6 h-8 border-2 border-blue-300 rounded-b-full ${i < hydrationReminders ? 'bg-blue-500' : 'bg-gray-100'}`}></div>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 mb-2">{hydrationReminders}/8 glasses today</p>
          <p className="text-xs text-blue-600">💧 Proper hydration helps maintain healthy blood pressure</p>
          
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs font-medium text-gray-800 mb-1">⚠️ Traffic Hydration Tip</p>
            <p className="text-xs text-gray-600">Drink small sips regularly. Dehydration in heat can cause blood pressure to spike.</p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="p-6 bg-gradient-to-r from-purple-50 to-gray-50 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg shadow-sm">
              <CheckCircle className="w-4 h-4 text-purple-700" />
            </div>
            <h2 className="font-semibold text-gray-800">Hypertension Tips</h2>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Keep AC On</p>
                <p className="text-xs text-gray-600">Heat stress increases blood pressure. Use air conditioning when stuck in traffic.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Stay Calm</p>
                <p className="text-xs text-gray-600">Traffic stress raises blood pressure. Practice deep breathing and stay patient.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Move Regularly</p>
                <p className="text-xs text-gray-600">Do ankle pumps and shoulder rolls every 10 minutes to improve circulation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Reminder Footer */}
        <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/30 to-indigo-400/30"></div>

        </div>
      </div>
    </div>
  );
};

export default Health;