import React from 'react';

export default function TestImages() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <h1 className="text-white text-2xl mb-8">Image Path Test</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-white mb-4">Regular img tag - Brain Tekie Blue</h2>
          <img 
            src="/media/brain-tekie-blue.png" 
            alt="Brain Tekie Blue"
            className="w-64 h-64 bg-gray-800 border border-gray-600"
          />
          <p className="text-gray-400 mt-2">Path: /media/brain-tekie-blue.png</p>
        </div>
        
        <div>
          <h2 className="text-white mb-4">Regular img tag - Brain Creative Pink</h2>
          <img 
            src="/media/brain-creative-pink.png" 
            alt="Brain Creative Pink"
            className="w-64 h-64 bg-gray-800 border border-gray-600"
          />
          <p className="text-gray-400 mt-2">Path: /media/brain-creative-pink.png</p>
        </div>
      </div>
    </div>
  );
}