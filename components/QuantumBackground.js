import React from 'react';

const QuantumBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="quantum-field">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="quantum-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
        
        {/* Connection Lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="quantum-line"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Orbital Rings */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`orbit-${i}`}
            className="quantum-orbit"
            style={{
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + i * 5}s`
            }}
          />
        ))}
        
        {/* Code-like Grid */}
        <div className="quantum-grid"></div>
        
        {/* Quantum Waves */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`wave-${i}`}
            className="quantum-wave"
            style={{
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuantumBackground;