import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import { SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";

const HeroV8 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const nextSlide = () => setCurrentSlide(prev => (prev === 3 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? 3 : prev - 1));

  useEffect(() => {
    const timer = setTimeout(nextSlide, 8000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <main ref={heroRef} className="h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-4 relative">
        <div className="relative h-[500px] md:h-[450px]">
          {/* Slide 1: Signature logo with PORTFOLIO text */}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center justify-center text-center h-full relative">
              <div className="relative">
                <img 
                  src="/media/signature-logo-wht.png" 
                  alt="John Li Logo" 
                  width={450}
                  height={375}
                  className="max-w-[70vw] md:max-w-[450px] lg:max-w-[500px] w-full h-auto opacity-85 object-contain" 
                />
                <h1 className="absolute bottom-0 left-1/2 -translate-x-1/2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-b from-gray-600 to-transparent bg-clip-text text-transparent tracking-tighter">
                  PORTFOLIO
                </h1>
              </div>
            </div>
          </div>

          {/* Slide 2: Article */}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
              <div className="text-center md:text-left">
                <span className="text-sm font-bold uppercase text-orange-200 tracking-widest">FEATURED ARTICLE</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">The Future of AI in Creative Industries</h2>
                <p className="text-lg text-gray-300 mb-8">Exploring how artificial intelligence is transforming creative workflows and opening new possibilities for artists and designers worldwide.</p>
                <Link href="/articles">
                  <span className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-600 transition-colors cursor-pointer">
                    Read Article
                  </span>
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <CloudflareImage src="article-ai-creative" alt="The Future of AI in Creative Industries" width={400} height={300} className="rounded-lg shadow-2xl object-cover" />
              </div>
            </div>
          </div>

          {/* Slide 3: Project */}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
              <div className="text-center md:text-left">
                <span className="text-sm font-bold uppercase text-orange-200 tracking-widest">Education & Research</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">The Science of Reading</h2>
                <p className="text-lg text-gray-300 mb-8">A research paper synthesizing findings from cognitive science, education, and vision science to create a comprehensive overview of how children learn to read.</p>
                <Link href="/projects">
                  <span className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-600 transition-colors cursor-pointer">
                    View Project
                  </span>
                </Link>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <CloudflareImage src="project-reading-model" alt="The Science of Reading" width={400} height={300} className="rounded-lg shadow-2xl object-cover" />
              </div>
            </div>
          </div>

          {/* Slide 4: HeroV1 content without John Li title */}
          <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === 3 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center justify-center text-center h-full">
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