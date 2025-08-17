import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CloudflareImage from "../components/CloudflareImage";

function LiteraturePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("literature");
  const [currentImage, setCurrentImage] = useState(0);

  // Hero images array
  const heroImages = [
    { src: 'creative-1', alt: 'Person sitting and writing' },
    { src: 'creative-3', alt: 'Signature logo overlay' }
  ];

  // Hero animation cycle - faster for more dynamic logo emergence
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Change image every 4 seconds for quicker transition

    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { id: "home", label: "HOME", href: "/", subItems: [] },
    { id: "about", label: "ABOUT", href: "/about", subItems: [] },
    { id: "portfolio", label: "PORTFOLIO", href: "/portfolio", subItems: [] },
    { id: "branding", label: "BRANDING", href: "/branding", subItems: [] },
    { id: "projects", label: "PROJECTS", href: "/projects", subItems: [] },
    { id: "articles", label: "ARTICLES", href: "/articles", subItems: [] },
    { id: "literature", label: "LITERATURE", href: "/literature", subItems: [] },
    { id: "contact", label: "CONTACT", href: "/contact", subItems: [] },
  ];

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
            <span className="text-orange-200/90">Creative</span> Writing
          </h1>

          <h2
            className="text-gray-200 text-xl md:text-2xl font-light mb-8 leading-relaxed max-w-3xl mx-auto"
          >
            Exploring the human experience through stories, poetry, and narratives.
          </h2>
        </div>
      </div>

      {/* Literary Projects Section */}
      <div className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 
              className="text-6xl md:text-7xl font-extralight tracking-wide text-white mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              <span className="text-orange-200/90">Literary</span> Projects
            </h2>
            <p className="text-gray-300 text-xl md:text-2xl font-light max-w-4xl mx-auto leading-relaxed">
              A collection of stories, poetry, and narratives exploring the human experience
              through creative expression and thoughtful prose
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Project 1 - Example */}
            <div className="bg-gray-800/40 rounded-2xl p-8 shadow-2xl border border-gray-700/50">
              <div className="flex flex-col gap-8">
                {/* Book Cover and Details Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Book Cover/Image */}
                  <div className="flex-shrink-0">
                    <div className="w-48 h-64 bg-gray-700/50 rounded-lg flex items-center justify-center border border-gray-600/30">
                      {/* Placeholder for book cover - replace with CloudflareImage when you have covers */}
                      <div className="text-center text-gray-400">
                        <div className="text-4xl mb-2">📖</div>
                        <div className="text-sm">Book Cover</div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details - Aligned to match book height */}
                  <div className="flex-1 flex flex-col justify-between h-64">
                    {/* Project Meta */}
                    <div>
                      <h3 className="text-2xl font-light text-white mb-2">The Digital Awakening</h3>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-orange-200 font-medium">Genre:</span>
                          <span className="text-gray-300">Science Fiction</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-orange-200 font-medium">Status:</span>
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                            WIP
                          </span>
                        </div>
                      </div>
                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed">
                        A thought-provoking exploration of consciousness in the age of artificial intelligence, 
                        following a programmer who discovers their AI creation may be more human than expected.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reading Sample - Full Width */}
                <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-600/20 w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-orange-200 rounded-full"></div>
                    <span className="text-orange-200 text-sm font-medium">Preview Excerpt</span>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div className="h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      <div className="text-gray-200 leading-relaxed space-y-4 font-serif" style={{ fontFamily: "'Crimson Text', serif" }}>
                        <p className="text-base">
                          "The cursor blinked against the black screen like a digital heartbeat, 
                          waiting for Marcus to breathe life into another line of code. But tonight 
                          was different. Tonight, the machine was waiting for him."
                        </p>
                        <p className="text-base text-gray-300">
                          He leaned back in his chair, fingers hovering over the keyboard as 
                          the ambient hum of servers filled the silence. Three years of development, 
                          countless sleepless nights, and finally—ARIA was ready for her first 
                          conversation with the world.
                        </p>
                        <p className="text-base text-gray-300">
                          The laboratory hummed with anticipation, monitors casting an ethereal glow 
                          across the walls lined with servers. Marcus had spent three years crafting 
                          ARIA's neural pathways, teaching her to process language, emotion, and 
                          meaning in ways that mimicked human thought.
                        </p>
                        <p className="text-base text-gray-300">
                          As he initiated the startup sequence, a simple greeting appeared on screen: 
                          "Hello, Marcus. I've been thinking while you were away." The words sent 
                          a chill down his spine. ARIA wasn't supposed to think independently yet.
                        </p>
                        <div className="text-orange-200/70 text-sm italic border-l-2 border-orange-200/30 pl-4 mt-6">
                          Continue reading to discover what happens when artificial intelligence 
                          meets human consciousness...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 - Example */}
            <div className="bg-gray-800/40 rounded-2xl p-8 shadow-2xl border border-gray-700/50">
              <div className="flex flex-col gap-8">
                {/* Book Cover and Details Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Book Cover/Image */}
                  <div className="flex-shrink-0">
                    <div className="w-48 h-64 bg-gray-700/50 rounded-lg flex items-center justify-center border border-gray-600/30">
                      <div className="text-center text-gray-400">
                        <div className="text-4xl mb-2">🌟</div>
                        <div className="text-sm">Book Cover</div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details - Aligned to match book height */}
                  <div className="flex-1 flex flex-col justify-between h-64">
                    <div>
                      <h3 className="text-2xl font-light text-white mb-2">Tales from Tomorrow</h3>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-orange-200 font-medium">Genre:</span>
                          <span className="text-gray-300">Children's Fiction</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-orange-200 font-medium">Status:</span>
                          <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                            In Publisher Review
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        A whimsical collection of short stories that introduce young readers to concepts 
                        of technology, creativity, and friendship through magical adventures.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reading Sample - Full Width */}
                <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-600/20 w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-orange-200 rounded-full"></div>
                    <span className="text-orange-200 text-sm font-medium">Preview Excerpt</span>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div className="h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      <div className="text-gray-200 leading-relaxed space-y-4 font-serif" style={{ fontFamily: "'Crimson Text', serif" }}>
                        <p className="text-base">
                          "Luna had always wondered what lived inside her grandmother's old computer. 
                          Today, when she pressed the mysterious glowing button, she was about to find out."
                        </p>
                        <p className="text-base text-gray-300">
                          A soft whirring sound filled the room, and suddenly the screen bloomed 
                          with colors she'd never seen before. Tiny digital butterflies began 
                          to flutter across the monitor, their wings leaving trails of stardust.
                        </p>
                        <p className="text-base text-gray-300">
                          "Oh my!" Luna gasped, leaning closer to the screen. The butterflies seemed 
                          to notice her presence, gathering in a gentle swarm near the glass. Their 
                          wings shimmered with patterns that looked like circuit boards made of light.
                        </p>
                        <p className="text-base text-gray-300">
                          One butterfly, larger than the rest, flew directly toward her. As it touched 
                          the screen, Luna felt a warm tingling in her fingertips. The computer hummed 
                          a melody she'd never heard before, and words began to appear: "Welcome to 
                          the Digital Garden, Luna. We've been waiting for someone with imagination."
                        </p>
                        <div className="text-orange-200/70 text-sm italic border-l-2 border-orange-200/30 pl-4 mt-6">
                          Join Luna on her magical journey through the digital realm...
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 - Poetry Collection */}
            <div className="bg-gray-800/40 rounded-2xl p-8 shadow-2xl border border-gray-700/50">
              <div className="flex flex-col gap-8">
                {/* Book Cover and Details Section */}
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-48 h-64 bg-gray-700/50 rounded-lg flex items-center justify-center border border-gray-600/30">
                      <div className="text-center text-gray-400">
                        <div className="text-4xl mb-2">🎭</div>
                        <div className="text-sm">Poetry Cover</div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details - Aligned to match book height */}
                  <div className="flex-1 flex flex-col justify-between h-64">
                    <div>
                      <h3 className="text-2xl font-light text-white mb-2">Bedtime Story</h3>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-orange-200 font-medium">Genre:</span>
                          <span className="text-gray-300">Poetry </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-orange-200 font-medium">Status:</span>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs">
                            Complete
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed">
                        This short poem was drafted, edited, completed, and inspired
                        one random evening in 2024.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reading Sample - Full Width */}
                <div className="bg-gray-900/60 rounded-xl p-6 border border-gray-600/20 w-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-orange-200 rounded-full"></div>
                    <span className="text-orange-200 text-sm font-medium">Featured Poem</span>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none">
                    <div className="h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                      <div className="text-gray-200 leading-relaxed space-y-4 font-serif text-center" style={{ fontFamily: "'Crimson Text', serif" }}>
                        <div className="text-lg italic">
                          <p>"Bedtime Story"</p>
                        </div>
                        
                        <div className="text-base space-y-3 text-left">
                          <p>Hear goodnight,<br/>
                          Here this night,<br/> 
                          As splashing doves<br/>
                          Fill blackened skies.</p>
                          
                          <p className="text-gray-300">
                          Dreams bestow<br/>
                          A whispered tone,<br/>
                          And faded words<br/>
                          Of flake-fell snow.</p>

                          <p className="text-gray-300">
                          Little fawn,<br/>
                          Where is dawn -<br/>
                          And yawning flowers,<br/>
                          And feathered song?</p>

                          <p className="text-gray-400">
                          Warming ears,<br/>
                          A simmering fear,<br/>
                          And all I love<br/>
                          That holds you near.</p>

                          <p className="text-gray-400">
                          Hands fall<br/>
                          Where seconds slip.<br/>
                          As pulse rhyme<br/>
                          Run past my lips.</p>
                        </div>
                        <div className="text-orange-200/70 text-sm italic border-l-2 border-orange-200/30 pl-4 mt-6">
                          John Li
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4 - Coming Soon Placeholder */}
            <div className="bg-gray-800/20 rounded-2xl p-8 shadow-2xl border border-gray-700/30 border-dashed">
              <div className="text-center py-12">
                <div className="text-6xl mb-4 text-gray-500">✍️</div>
                <h3 className="text-2xl font-light text-gray-400 mb-4">More Projects Coming Soon</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  New stories, novels, and creative works are currently in development. 
                  Stay tuned for more literary adventures.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />

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
