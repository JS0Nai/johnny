import React from "react";
import Link from "next/link";

const CorporateHero = () => {
  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Animated background shapes */}
      <div className="absolute inset-0 z-0">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative flex flex-col items-center justify-center text-center z-10 px-6">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wider text-orange-200/90"
          style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
        >
          The Monarkh Project
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Exploring the intersection of AI, creativity, and human experience
        </p>
        <div className="flex justify-center items-center gap-6 mt-12">
          <Link href="/about">
            <span className="px-8 py-4 bg-orange-200 text-slate-900 font-semibold rounded-full text-lg hover:bg-orange-300 transition-all duration-300 transform hover:scale-105 cursor-pointer">
              Learn More
            </span>
          </Link>
          <Link href="/contact">
            <span className="px-8 py-4 border-2 border-gray-500 text-white font-semibold rounded-full text-lg hover:bg-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer">
              Get In Touch
            </span>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes gradient-fade { 0%, 100% { opacity: 0; } 50% { opacity: 0.15; } }
        .shape-1, .shape-2, .shape-3 { position: absolute; border-radius: 50%; filter: blur(100px); }
        .shape-1 { width: 500px; height: 500px; background: rgba(59, 130, 246, 0.3); top: -10%; left: -10%; animation: gradient-fade 10s infinite, rotate 20s linear infinite; }
        .shape-2 { width: 400px; height: 400px; background: rgba(236, 72, 153, 0.3); bottom: -5%; right: -5%; animation: gradient-fade 12s infinite reverse, rotate 25s linear infinite reverse; }
        .shape-3 { width: 300px; height: 300px; background: rgba(16, 185, 129, 0.2); bottom: 20%; left: 20%; animation: gradient-fade 8s infinite, rotate 15s linear infinite; }
      `}</style>
    </section>
  );
};

export default CorporateHero;
