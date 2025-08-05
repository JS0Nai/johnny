import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from "../components/Header";
import CloudflareImage from "../components/CloudflareImage";
import { menuItems as baseMenuItems } from "../config/menuItems";

function LiteraturePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("literature");
  const [currentImage, setCurrentImage] = useState(0);

  // Hero images array
  const heroImages = [
    { src: 'creative-1', alt: 'Person sitting and writing' },
    { src: 'creative-3', alt: 'Signature logo overlay' }
  ];

  // Hero animation cycle - much slower for smooth logo emergence
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 8000); // Change image every 8 seconds for slower, more deliberate transition

    return () => clearInterval(interval);
  }, []);

  // Custom menu items for literature page - replace "RESOURCES" with "LITERATURE"
  const menuItems = baseMenuItems.map(item => 
    item.id === "resources" 
      ? { id: "literature", label: "LITERATURE", href: "/literature", subItems: [] }
      : item
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        menuItems={menuItems}
      />

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Base Image - Person Writing (creative-1) */}
        <div className="absolute inset-0">
          <CloudflareImage
            src="creative-1"
            alt="Person sitting and writing"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Logo Overlay - Emerges from writing person (creative-3) */}
        <div 
          className={`absolute inset-0 transition-opacity duration-[4000ms] ease-in-out ${
            currentImage === 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <CloudflareImage
            src="creative-3"
            alt="Signature logo overlay"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
          <h1
            className="text-7xl md:text-8xl font-extralight tracking-wide text-white mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="text-orange-200/90">Literary</span> Works
          </h1>

          <h2
            className="text-gray-200 text-xl md:text-2xl font-light mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Creative narratives, technical writing, and thoughtful expressions
            exploring the intersection of technology and human experience
          </h2>

        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-light mb-8 text-white">Coming Soon</h3>
          <p className="text-xl text-gray-400 mb-8">
            This page is under construction. Please check back later for creative and technical writing projects.
          </p>
          <Link href="/">
            <span className="text-orange-200 hover:underline text-lg">Go back to Home</span>
          </Link>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        /* Ultra-smooth logo emergence effect */
        .logo-overlay-transition {
          transition: opacity 4s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        
        /* Breathing effect for even smoother transition */
        @keyframes logoEmerge {
          0% { 
            opacity: 0;
            filter: blur(1px);
          }
          20% { 
            opacity: 0.1;
            filter: blur(0.8px);
          }
          50% { 
            opacity: 0.5;
            filter: blur(0.3px);
          }
          80% { 
            opacity: 0.8;
            filter: blur(0.1px);
          }
          100% { 
            opacity: 1;
            filter: blur(0px);
          }
        }
      `}</style>
    </div>
  );
}

export default LiteraturePage;
