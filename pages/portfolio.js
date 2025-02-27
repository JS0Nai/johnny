import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useInView } from '../hooks/useInView';
import { TbBrain, TbServer } from 'react-icons/tb';
import { 
  SiAdobe,
  SiGoogle,
  SiOpenai,
  SiIbm,
  SiMeta
} from 'react-icons/si';

function PortfolioPage() {
  const router = useRouter();
  
  // State declarations
  const [showHeader, setShowHeader] = useState(false);
  const [showSubheader, setShowSubheader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('portfolio');
  const [showImage, setShowImage] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2 });
  const [galleryRef, galleryInView] = useInView({ threshold: 0.2 });
  const [newsletterRef, newsletterInView] = useInView({ threshold: 0.2 });

  const menuItems = [
    { id: 'home', label: 'HOME', href: '/', subItems: [] },
    { id: 'about', label: 'ABOUT', href: '/about', subItems: [] },
    { id: 'portfolio', label: 'PORTFOLIO', href: '/portfolio', subItems: [] },
    { id: 'projects', label: 'PROJECTS', href: '/projects', subItems: [] },
    { id: 'articles', label: 'ARTICLES', href: '/articles', subItems: [] },
    { id: 'resources', label: 'RESOURCES', href: '/resources', subItems: [] },
    { id: 'contact', label: 'CONTACT', href: '/contact', subItems: [] }
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowImage(true), 500),
      setTimeout(() => setShowHeader(true), 1000),
      setTimeout(() => setShowSubheader(true), 1500)
    ];
    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  // Image portfolio data
  const portfolioItems = [
    {
      id: 1,
      title: "Fantasy Scene",
      category: "fantasy",
      image: "/assets/images/fantasyscene.png",
      description: "A fantasy landscape exploring magical themes",
      tools: ["Midjourney", "Photoshop"]
    },
    {
      id: 2,
      title: "Ocean Witch",
      category: "character",
      image: "/assets/images/oceanwitch.png",
      description: "Character design of a sea-dwelling sorceress",
      tools: ["Stable Diffusion", "DALL-E"]
    },
    {
      id: 3,
      title: "Art Doll",
      category: "stylized",
      image: "/assets/images/artdoll.png", 
      description: "Stylized digital doll design with artistic elements",
      tools: ["DALL-E", "Photoshop"]
    },
    {
      id: 4,
      title: "Red Moon Witch",
      category: "character",
      image: "/assets/images/redmoonwitch.png",
      description: "Character concept with red moon motif",
      tools: ["Midjourney", "Photoshop"]
    },
    {
      id: 5,
      title: "Art Girl",
      category: "character",
      image: "/assets/images/artgirl.png",
      description: "Stylized female character with artistic elements",
      tools: ["DALL-E", "Photoshop"]
    },
    {
      id: 6,
      title: "Stylized Portrait",
      category: "character",
      image: "/assets/images/artgirl2.png",
      description: "Character portrait in vibrant style",
      tools: ["Midjourney", "Photoshop"]
    },
    {
      id: 7,
      title: "Doll Portrait",
      category: "stylized",
      image: "/assets/images/dolly01.png",
      description: "Detailed doll character with stylized elements",
      tools: ["Stable Diffusion", "Photoshop"]
    },
    {
      id: 8,
      title: "Eye Study",
      category: "stylized",
      image: "/assets/images/eye.png",
      description: "Detailed study of eye design and lighting",
      tools: ["DALL-E", "Photoshop"]
    }
  ];

  // Filter images by category
  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // For pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // Newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setEmail('');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative w-full overflow-x-hidden">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm">
          <div className="mx-auto max-w-screen-xl w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <Link href="/">
                <div className="cursor-pointer">
                  <img 
                    src="/assets/images/icogo150.png" 
                    alt="Monarkh Logo" 
                    width={150} 
                    height={150}
                    className="w-[65px] h-[65px]"
                  />
                </div>
              </Link>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="p-2 w-8 h-8 flex items-center justify-center"
              >
                {isMenuOpen ? (
                  <div className="relative w-6 h-6">
                    <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-white rotate-45"></div>
                    <div className="absolute top-1/2 left-0 w-6 h-0.5 bg-white -rotate-45"></div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="w-6 h-0.5 bg-green-500"></div>
                    <div className="w-6 h-0.5 bg-green-500"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/95 transition-transform duration-500 ease-in-out z-40
          ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container mx-auto px-4 pt-24">
          <nav className="space-y-6">
            {menuItems.map((item) => (
              <div key={item.id} className="overflow-hidden">
                {item.subItems.length > 0 ? (
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                    className="w-full flex justify-between items-center text-white hover:text-green-500 transition-colors py-2"
                  >
                    <span className="text-2xl font-light">{item.label}</span>
                    <span 
                      className={`text-green-500 transition-transform duration-300 
                        ${activeMenu === item.id ? 'rotate-180' : ''}`}
                    >
                      ▼
                    </span>
                  </button>
                ) : (
                  <Link href={item.href}>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-left text-white hover:text-green-500 transition-colors py-2"
                    >
                      <span className="text-2xl font-light">{item.label}</span>
                    </button>
                  </Link>
                )}

                {item.subItems.length > 0 && (
                  <div 
                    className={`space-y-4 pl-4 transition-all duration-300 
                      ${activeMenu === item.id ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                  >
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem}
                        className="block w-full text-left text-gray-400 hover:text-white transition-colors py-1"
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="flex justify-center items-center pt-32 pb-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 
            className={`text-7xl md:text-8xl font-bold bg-gradient-to-b from-gray-600 to-transparent bg-clip-text text-transparent tracking-tighter mb-6 scroll-animate ${heroInView ? 'fade-in' : ''}`}
          >
            IMAGE PORTFOLIO
          </h1>
          
          <h2 
            className={`text-white text-xl md:text-2xl font-light mb-8 leading-relaxed max-w-2xl mx-auto scroll-animate-left ${heroInView ? 'fade-in' : ''}`}
            style={{ transitionDelay: '200ms' }}
          >
            A collection of AI-generated artwork and designs created with a variety of tools and techniques
          </h2>
          
          <div 
            className={`flex flex-wrap justify-center gap-3 mt-12 scroll-animate ${heroInView ? 'fade-in' : ''}`}
            style={{ transitionDelay: '400ms' }}
          >
            <button 
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === 'all' ? 'bg-orange-200 text-gray-900' : 'bg-gray-800 text-gray-300'} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              All Works
            </button>
            <button 
              onClick={() => handleCategoryChange('character')}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === 'character' ? 'bg-orange-200 text-gray-900' : 'bg-gray-800 text-gray-300'} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Characters
            </button>
            <button 
              onClick={() => handleCategoryChange('fantasy')}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === 'fantasy' ? 'bg-orange-200 text-gray-900' : 'bg-gray-800 text-gray-300'} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Fantasy
            </button>
            <button 
              onClick={() => handleCategoryChange('stylized')}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === 'stylized' ? 'bg-orange-200 text-gray-900' : 'bg-gray-800 text-gray-300'} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Stylized
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div ref={galleryRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {currentItems.map((item, index) => (
              <div 
                key={item.id}
                className={`bg-gray-800/40 rounded-lg overflow-hidden shadow-lg scroll-animate ${galleryInView ? 'fade-in' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white text-xl font-medium">{item.title}</h3>
                    <p className="text-gray-300 text-sm mt-2">{item.description}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white text-lg font-medium">{item.title}</h3>
                    <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tools.map((tool, i) => (
                      <span 
                        key={i}
                        className="text-xs px-2 py-1 bg-gray-700/50 text-orange-200 rounded-full"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center 
                      ${currentPage === index + 1 ? 'bg-orange-200 text-gray-900' : 'bg-gray-800 text-white'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tools Banner */}
      <div className="relative py-12 bg-gray-900">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-light text-white">
            Tools & <span className="text-orange-200">Technologies</span>
          </h2>
        </div>

        <div className="w-full relative overflow-hidden">
          <div className="flex justify-center items-center py-8 space-x-12 md:space-x-16">
            <div className="flex items-center justify-center flex-wrap gap-12 md:gap-16">
              <SiOpenai className="text-gray-400 hover:text-orange-200 transition-colors w-12 h-12" title="OpenAI DALL-E" />
              <SiAdobe className="text-gray-400 hover:text-orange-200 transition-colors w-12 h-12" title="Adobe Photoshop" />
              <SiGoogle className="text-gray-400 hover:text-orange-200 transition-colors w-12 h-12" title="Google DeepDream" />
              <SiIbm className="text-gray-400 hover:text-orange-200 transition-colors w-12 h-12" title="IBM Watson" />
              <SiMeta className="text-gray-400 hover:text-orange-200 transition-colors w-12 h-12" title="Meta AI" />
              <TbBrain className="text-gray-400 hover:text-orange-200 transition-colors w-12 h-12" title="Midjourney" />
              <TbServer className="text-gray-400 hover:text-orange-200 transition-colors w-12 h-12" title="Stable Diffusion" />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div ref={newsletterRef} className="bg-gray-900 p-16 text-center">
        <div className={`mb-8 scroll-animate ${newsletterInView ? 'fade-in' : ''}`}>
          <svg
            viewBox="0 0 24 24"
            className="w-16 h-16 mx-auto text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M0 9l12 6L24 9M0 9v13h24V9M0 9l12 2l12-2" />
            <path className="opacity-60" d="M-4 9l4 0M24 9l4 0" strokeDasharray="1 2" />
          </svg>
        </div>
        
        <h2 className={`text-4xl md:text-5xl font-light text-white mb-8 leading-tight scroll-animate-left ${newsletterInView ? 'fade-in' : ''}`}
            style={{ transitionDelay: '200ms' }}>
          Get the latest <span className="text-orange-200">updates</span>
          <br />
          direct to inbox
        </h2>

        <form onSubmit={handleNewsletterSubmit} className={`max-w-xl mx-auto scroll-animate ${newsletterInView ? 'fade-in' : ''}`}
              style={{ transitionDelay: '400ms' }}>
          <div className="mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-6 py-4 bg-gray-800/50 text-gray-300 placeholder-gray-500 
                       border-b border-gray-700 focus:border-orange-200 focus:outline-none
                       transition-colors text-lg"
              required
              disabled={isSubmitting}
            />
          </div>

          {submitStatus && (
            <div className={`mb-4 text-sm ${submitStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>
              {submitStatus === 'success' ? 'Successfully subscribed!' : 'Something went wrong. Please try again.'}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center gap-2 text-white text-xl 
                     border-b-2 border-orange-200 pb-1 hover:border-white transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'SENDING...' : 'SUBSCRIBE'}
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 px-8 py-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-3xl text-white font-light mb-6">John Li</div>
            <p className="text-gray-400 mt-4">
              Portfolio, Projects, and Resources{' '}
              <span className="italic"></span> 
            </p>
          </div>

          {/* Location Section */}
          <div className="mb-16">
            <h3 className="text-3xl text-white font-light mb-6">Location</h3>
            <address className="text-gray-400 not-italic">
              Abu Dhabi,<br />
              United Arab Emirates
            </address>
          </div>

          {/* Contact Section */}
          <div className="mb-16">
            <h3 className="text-3xl text-white font-light mb-6">Let's Connect.</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-orange-200">✉</span>
                <a href="mailto:hi@johnny.ae" className="text-gray-400 hover:text-white transition-colors">
                  hi@johnny.ae
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-200">📞</span>
                <a href="tel:054-376-2321" className="text-gray-400 hover:text-white transition-colors">
                  054 376 2321
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-16">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a>
            <span className="text-gray-600">/</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">X/Twitter</a>
            <span className="text-gray-600">/</span>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
          </div>

          {/* Footer Credits */}
          <div className="text-center text-gray-400 text-sm">
            <p>
              Designed by{' '}
              <a href="#" className="text-white hover:text-orange-200 transition-colors">
                Monarkh AI Design and Build
              </a>
              , Powered by{' '}
              <a href="#" className="text-white hover:text-orange-200 transition-colors">
                Monarkh
              </a>
            </p>
            <a href="#" className="text-gray-400 hover:text-white transition-colors mt-2 inline-block">
              Privacy
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }

        @keyframes scrollRight {
          0% { transform: translateX(-33.33%); }
          100% { transform: translateX(0); }
        }

        .animate-scroll-left {
          animation: scrollLeft 12s linear infinite;
        }

        .animate-scroll-right {
          animation: scrollRight 12s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default PortfolioPage;