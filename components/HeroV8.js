import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import { SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";

const HeroV8 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const videoRef = useRef(null);
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const nextSlide = () => setCurrentSlide(prev => (prev === 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? 1 : prev - 1));

  useEffect(() => {
    const duration = currentSlide === 0 ? 5160 : 8000;
    const timer = setTimeout(nextSlide, duration);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Restart video when slide changes to video
  useEffect(() => {
    if (videoRef.current && currentSlide === 0) {
      videoRef.current.currentTime = 0; // Reset to beginning
      videoRef.current.play();
    }
  }, [currentSlide]);

  // Handle touch events
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Remove mouse wheel handler to allow normal page scrolling

  return (
    <main 
      ref={heroRef} 
      className="h-screen flex items-center justify-center relative overflow-hidden bg-slate-900"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 z-0">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>
      
      <div className="w-full relative">
        <div className="relative h-screen">
          {/* Slide 1: Video background */}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-black"></div>
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src="/media/dist-op.mp4"
              autoPlay
              muted={isMuted}
              playsInline
              preload="metadata"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Mute/Unmute button */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="absolute bottom-8 right-8 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
            
            <div className="relative flex flex-col items-center justify-center text-center h-full z-10" style={{ marginTop: '-200px' }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wider text-orange-200/90"
                  style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
                The Monarkh Project
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                Exploring the intersection of AI, creativity, and human experience
              </p>
            </div>
          </div>

          {/* Slide 2: Profile */}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
            {/* Background profile header image */}
            <div className="absolute inset-0 bg-black">
              <CloudflareImage
                src="profile-header"
                alt="Profile header"
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/20"></div>
            
            <div className="relative flex flex-col items-center justify-center text-center h-full z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light bg-gradient-to-r from-orange-200 to-green-300 bg-clip-text text-transparent mb-8">
                Creative Technologist & AI Specialist
              </h2>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
                Bridging the gap between imagination and innovation. I build intelligent systems, design compelling user experiences, and explore the frontiers of artificial intelligence.
              </p>
              <div className="flex justify-center items-center gap-6">
                <Link href="/about"><span className="px-8 py-4 bg-orange-200 text-slate-900 font-semibold rounded-full text-lg hover:bg-orange-300 transition-all duration-300 transform hover:scale-105 cursor-pointer">View Profile</span></Link>
                <Link href="/contact"><span className="px-8 py-4 border-2 border-gray-500 text-white font-semibold rounded-full text-lg hover:bg-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer">Get In Touch</span></Link>
              </div>
              <div className="flex justify-center gap-8 mt-16">
                <a href="https://github.com/JS0Nai" className="text-gray-400 hover:text-white transition-colors"><SiGithub size={28} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiLinkedin size={28} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiTwitter size={28} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows for desktop */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/10 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center bg-white/5 backdrop-blur-sm rounded-full hover:bg-white/10 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-orange-200 scale-125' : 'bg-gray-600'}`}
          />
        ))}
      </div>


      <style jsx>{`
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes gradient-fade { 0%, 100% { opacity: 0; } 50% { opacity: 0.15; } }
        .shape-1, .shape-2, .shape-3 { position: absolute; border-radius: 50%; filter: blur(100px); }
        .shape-1 { width: 500px; height: 500px; background: rgba(59, 130, 246, 0.3); top: -10%; left: -10%; animation: gradient-fade 10s infinite, rotate 20s linear infinite; }
        .shape-2 { width: 400px; height: 400px; background: rgba(236, 72, 153, 0.3); bottom: -5%; right: -5%; animation: gradient-fade 12s infinite reverse, rotate 25s linear infinite reverse; }
        .shape-3 { width: 300px; height: 300px; background: rgba(16, 185, 129, 0.2); bottom: 20%; left: 20%; animation: gradient-fade 8s infinite, rotate 15s linear infinite; }
      `}</style>
    </main>
  );
};

export default HeroV8;