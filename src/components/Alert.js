import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Square, RotateCcw } from 'lucide-react';

const Alert = ({ onBack }) => {
  const [exerciseStep, setExerciseStep] = useState(0);
  const [isExercising, setIsExercising] = useState(false);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [exerciseType, setExerciseType] = useState('shrug'); // 'shrug', 'backward', 'forward'

  // Exercise animation cycle
  useEffect(() => {
    let interval;
    if (isExercising) {
      interval = setInterval(() => {
        setExerciseStep(prev => {
          const newStep = (prev + 1) % 8;
          
          // Count exercises
          if (newStep === 0) {
            setExerciseCount(prevCount => {
              const newCount = prevCount + 1;
              
              // Exercise progression logic
              if (exerciseType === 'shrug' && newCount >= 10) {
                setExerciseType('backward');
                setExerciseCount(0);
              } else if (exerciseType === 'backward' && newCount >= 5) {
                setExerciseType('forward');
                setExerciseCount(0);
              } else if (exerciseType === 'forward' && newCount >= 5) {
                if (currentSet < 2) {
                  setCurrentSet(prev => prev + 1);
                  setExerciseType('shrug');
                  setExerciseCount(0);
                } else {
                  setIsExercising(false);
                  setExerciseType('shrug');
                  setExerciseCount(0);
                  setCurrentSet(1);
                }
              }
              
              return newCount;
            });
          }
          
          return newStep;
        });
      }, 500); // Slower animation for better following
    }
    return () => clearInterval(interval);
  }, [isExercising, exerciseType, exerciseCount, currentSet]);

  const resetExercise = () => {
    setIsExercising(false);
    setExerciseStep(0);
    setExerciseCount(0);
    setCurrentSet(1);
    setExerciseType('shrug');
  };

  const getExerciseDescription = () => {
    switch (exerciseType) {
      case 'shrug':
        return `Shoulder Shrugs - ${exerciseCount}/10`;
      case 'backward':
        return `Backward Rolls - ${exerciseCount}/5`;
      case 'forward':
        return `Forward Rolls - ${exerciseCount}/5`;
      default:
        return 'Exercise Complete!';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-bold">Exercise Alert</h1>
              <p className="text-purple-100 text-xs">Traffic Break Exercise</p>
            </div>
          </div>
        </div>

        {/* Exercise Title */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Exercise 2: Shoulder Rolls & Shrugs
            </h2>
            <p className="text-sm text-gray-600 mb-1">[Dynamic Exercise]</p>
            <p className="text-xs text-green-700 font-medium">
              Perfect for traffic delays and hypertension management
            </p>
          </div>
        </div>

        {/* Animated Carabao Character */}
        <div className="flex justify-center py-8 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="relative">
            {/* Character container - based on your reference image */}
            <div className="w-32 h-40 relative">
              
              {/* Main body */}
              <div className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-amber-800 rounded-full transition-all duration-300 ${
                isExercising && exerciseType === 'shrug' ? (
                  exerciseStep < 2 ? 'scale-105' : 'scale-100'
                ) : ''
              }`}>
                {/* Body outline */}
                <div className="absolute inset-1 border-2 border-amber-900 rounded-full"></div>
              </div>
              
              {/* Head */}
              <div className={`absolute top-2 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-amber-800 rounded-full relative transition-all duration-300 ${
                isExercising ? (
                  exerciseType === 'shrug' && exerciseStep < 2 ? '-translate-y-1' :
                  exerciseType === 'backward' && exerciseStep < 4 ? 'rotate-1' :
                  exerciseType === 'forward' && exerciseStep >= 4 ? '-rotate-1' : ''
                ) : ''
              }`}>
                
                {/* Ears */}
                <div className="absolute -top-2 left-2 w-4 h-6 bg-pink-300 rounded-full transform -rotate-12"></div>
                <div className="absolute -top-2 right-2 w-4 h-6 bg-pink-300 rounded-full transform rotate-12"></div>
                
                {/* Hair tufts - wavy brown sections on top */}
                <div className="absolute top-1 left-4 w-4 h-3 bg-amber-900 rounded-b-full"></div>
                <div className="absolute top-0 left-7 w-3 h-4 bg-amber-900 rounded-b-full"></div>
                <div className="absolute top-0 right-7 w-3 h-4 bg-amber-900 rounded-b-full"></div>
                <div className="absolute top-1 right-4 w-4 h-3 bg-amber-900 rounded-b-full"></div>
                
                {/* Eyes on brown part */}
                <div className={`absolute top-6 left-5 w-2 h-3 bg-gray-900 rounded-full transition-all ${
                  isExercising ? 'scale-110' : ''
                }`}></div>
                <div className={`absolute top-6 right-5 w-2 h-3 bg-gray-900 rounded-full transition-all ${
                  isExercising ? 'scale-110' : ''
                }`}></div>
                
                {/* Large pink snout area - prominent oval */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-18 h-12 bg-pink-300 rounded-full">
                  {/* Nostrils */}
                  <div className="absolute top-3 left-5 w-1.5 h-3 bg-gray-900 rounded-full"></div>
                  <div className="absolute top-3 right-5 w-1.5 h-3 bg-gray-900 rounded-full"></div>
                  {/* Smile - curved line */}
                  <div className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-1 border-b-2 border-gray-900 rounded-full transition-all ${
                    isExercising ? 'w-5 border-b-3' : ''
                  }`}></div>
                </div>
              </div>
              
              {/* Left Arm - animated based on exercise type */}
              <div className={`absolute top-20 left-2 w-4 h-12 bg-amber-800 rounded-full transition-all duration-300 origin-top ${
                isExercising ? (
                  exerciseType === 'shrug' ? (
                    exerciseStep < 2 ? 'rotate-12 -translate-y-2' : 'rotate-0'
                  ) : exerciseType === 'backward' ? (
                    exerciseStep === 0 ? 'rotate-45' :
                    exerciseStep === 1 ? 'rotate-90' :
                    exerciseStep === 2 ? 'rotate-135' :
                    exerciseStep === 3 ? 'rotate-180' :
                    'rotate-0'
                  ) : exerciseType === 'forward' ? (
                    exerciseStep === 4 ? '-rotate-45' :
                    exerciseStep === 5 ? '-rotate-90' :
                    exerciseStep === 6 ? '-rotate-135' :
                    exerciseStep === 7 ? '-rotate-180' :
                    'rotate-0'
                  ) : 'rotate-0'
                ) : ''
              }`}>
                <div className="absolute bottom-0 w-5 h-4 bg-amber-900 rounded-full"></div>
              </div>
              
              {/* Right Arm - animated based on exercise type */}
              <div className={`absolute top-20 right-2 w-4 h-12 bg-amber-800 rounded-full transition-all duration-300 origin-top ${
                isExercising ? (
                  exerciseType === 'shrug' ? (
                    exerciseStep < 2 ? '-rotate-12 -translate-y-2' : 'rotate-0'
                  ) : exerciseType === 'backward' ? (
                    exerciseStep === 0 ? '-rotate-45' :
                    exerciseStep === 1 ? '-rotate-90' :
                    exerciseStep === 2 ? '-rotate-135' :
                    exerciseStep === 3 ? '-rotate-180' :
                    'rotate-0'
                  ) : exerciseType === 'forward' ? (
                    exerciseStep === 4 ? 'rotate-45' :
                    exerciseStep === 5 ? 'rotate-90' :
                    exerciseStep === 6 ? 'rotate-135' :
                    exerciseStep === 7 ? 'rotate-180' :
                    'rotate-0'
                  ) : 'rotate-0'
                ) : ''
              }`}>
                <div className="absolute bottom-0 w-5 h-4 bg-amber-900 rounded-full"></div>
              </div>
              
              {/* Legs */}
              <div className="absolute bottom-0 left-6 w-5 h-10 bg-amber-800 rounded-full">
                <div className="absolute bottom-0 left-0 w-6 h-3 bg-amber-900 rounded-full"></div>
              </div>
              <div className="absolute bottom-0 right-6 w-5 h-10 bg-amber-800 rounded-full">
                <div className="absolute bottom-0 right-0 w-6 h-3 bg-amber-900 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercise Progress */}
        <div className="p-4 bg-gray-50">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">Set {currentSet} of 2</h3>
            <p className="text-sm font-medium text-purple-600 mb-2">
              {getExerciseDescription()}
            </p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: exerciseType === 'shrug' ? `${(exerciseCount/10) * 100}%` : 
                         exerciseType === 'backward' ? `${(exerciseCount/5) * 100}%` : 
                         `${(exerciseCount/5) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Exercise Instructions */}
        <div className="p-4 bg-white">
          <div className="bg-blue-50 rounded-2xl p-4 mb-4">
            <h4 className="font-bold text-blue-900 mb-2">How to do:</h4>
            <div className="space-y-1 text-blue-800 text-sm">
              <p>• Roll shoulders backward 5 times, then forward 5 times</p>
              <p>• Shrug shoulders towards ears, hold for 2 seconds, then release fully</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-4 mb-4">
            <h4 className="font-bold text-green-900 mb-2">Benefits:</h4>
            <p className="text-green-800 text-sm">
              Relieves upper body stiffness and enhances circulation, helping to manage hypertension and improve comfort while driving.
            </p>
          </div>

          <div className="bg-yellow-50 rounded-2xl p-4 mb-4">
            <h4 className="font-bold text-yellow-900 mb-2">Cautions:</h4>
            <p className="text-yellow-800 text-sm">
              ⚠️ Move smoothly, avoid sudden jerks.
            </p>
          </div>
        </div>

        {/* Exercise Controls */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => setIsExercising(!isExercising)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                isExercising 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isExercising ? (
                <>
                  <Square className="w-4 h-4" />
                  Stop Exercise
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Start Exercise
                </>
              )}
            </button>
            
            <button 
              onClick={resetExercise}
              className="flex items-center gap-2 px-4 py-3 bg-gray-200 text-gray-700 rounded-full font-bold hover:bg-gray-300 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
          
          {isExercising && (
            <p className="text-center text-sm text-purple-600 animate-pulse mt-3">
              Follow along with our carabao! 🐃💪
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-purple-600 text-white text-center">
          <p className="text-xs">
            💙 Take breaks during traffic. Your health matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;