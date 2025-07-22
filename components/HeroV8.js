import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import { SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";

const HeroV8 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const nextSlide = () => setCurrentSlide(prev => (prev === 3 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? 3 : prev - 1));

  useEffect(() => {
    // Use 5.16 seconds (5160ms) for video slide, 8 seconds for others
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

  return (
    <main ref={heroRef} className="h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
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
            
            <div className="relative flex flex-col items-center justify-center text-center h-full z-10">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wider text-orange-200/90"
                  style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
                The Monarkh Project
              </h1>
              <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                Exploring the intersection of AI, creativity, and human experience
              </p>
            </div>
          </div>

          {/* Slide 2: Article */}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
            {/* Background image */}
            <div className="absolute inset-0 bg-black">
              <CloudflareImage
                src="tech-runner-blue"
                alt="Tech runner"
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/20"></div>
            
            <div className="relative flex flex-col items-center justify-center text-center h-full z-10">
              <span className="text-sm font-bold uppercase text-orange-200 tracking-widest mb-4">FEATURED ARTICLE</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extralight tracking-wide text-orange-200/90 mb-6"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                The Future of AI in Creative Industries
              </h2>
              <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                Exploring how artificial intelligence is transforming creative workflows and opening new possibilities for artists and designers worldwide.
              </p>
              <Link href="/articles">
                <span className="px-8 py-4 bg-orange-200 text-slate-900 font-semibold rounded-full text-lg hover:bg-orange-300 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                  Read Article
                </span>
              </Link>
            </div>
          </div>

          {/* Slide 3: Project */}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'}`}>
            {/* Background image */}
            <div className="absolute inset-0 bg-black">
              <CloudflareImage
                src="girl-reading"
                alt="Girl reading"
                width={1920}
                height={1080}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/20"></div>
            
            <div className="relative flex flex-col items-start justify-center text-left h-full z-10 pl-12 md:pl-20">
              <span className="text-sm font-bold uppercase text-orange-200 tracking-widest mb-4">THE SCIENCE OF</span>
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide text-cyan-300 mb-6"
                  style={{ fontFamily: "'Arial', sans-serif" }}>
                Science Reading
              </h2>
              <p className="text-base md:text-lg text-white max-w-2xl mb-8 leading-relaxed">
                From investigating vanishing eleosoing op oasing applications programming 
                saeteccagic od when ts we losly. fecernations ac noting iphects.
                <br /><br />
                od asnoanny to sea ctyrtorn-checages neom or doectinvo loyion leots 
                cosenrasbon he tranelsing ceation fo bid: on drfrlary our how?
              </p>
              <div className="text-orange-300 font-bold mb-6">
                YOUR 1-iANDECOUND ENNERI
              </div>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                <Link href="/projects">
                  <span className="px-8 py-4 bg-cyan-400 text-slate-900 font-semibold rounded-full text-lg hover:bg-cyan-300 transition-all duration-300 transform hover:scale-105 cursor-pointer">
                    Explore Projects
                  </span>
                </Link>
                <Link href="/research">
                  <span className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-full text-lg hover:bg-cyan-400/10 hover:border-cyan-300 transition-all duration-300 cursor-pointer">
                    View Research
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Slide 4: HeroV1 content with profile header background */}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === 3 ? 'opacity-100' : 'opacity-0'}`}>
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
                <Link href="/projects"><span className="px-8 py-4 bg-orange-200 text-slate-900 font-semibold rounded-full text-lg hover:bg-orange-300 transition-all duration-300 transform hover:scale-105 cursor-pointer">View My Work</span></Link>
                <Link href="/contact"><span className="px-8 py-4 border-2 border-gray-500 text-white font-semibold rounded-full text-lg hover:bg-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer">Get In Touch</span></Link>
              </div>
              <div className="flex justify-center gap-8 mt-16">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiGithub size={28} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiLinkedin size={28} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiTwitter size={28} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {[0, 1, 2, 3].map((index) => (
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