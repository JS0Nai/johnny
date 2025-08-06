import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Environment detection for Cloudflare images
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
const cloudflareAccountHash = 'afekpjgU7bwy8XYMt0lA2Q';
const variant = 'public';

const Header = ({ isMenuOpen, setIsMenuOpen, activeMenu, setActiveMenu, menuItems }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [showJaison, setShowJaison] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Trigger flip animation on page change
    setIsFlipping(true);
    
    // Check if we're on the research page
    const isResearchPage = router.pathname === '/research';
    
    setTimeout(() => {
      setShowJaison(isResearchPage);
    }, 1000);
    
    setTimeout(() => {
      setIsFlipping(false);
    }, 2000);
  }, [router.pathname]);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/20 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <div className="cursor-pointer relative w-[65px] h-[65px] z-50" style={{ perspective: '1000px' }}>
                <div 
                  className={`absolute inset-0 transition-transform preserve-3d ${isFlipping ? 'animate-coin-flip' : ''}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front side - original logo */}
                  <img
                    src={isDevelopment ? "/media/signature-webpagetopleft-logo.png" : `https://imagedelivery.net/${cloudflareAccountHash}/signature-webpagetopleft-logo/${variant}`}
                    alt="John Li Logo"
                    className="absolute w-full h-full object-contain"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: showJaison ? 'rotateY(180deg)' : 'rotateY(0deg)',
                      transition: 'transform 0.6s'
                    }}
                  />
                  {/* Back side - jaison image */}
                  <img
                    src={isDevelopment ? "/media/jaison.png" : `https://imagedelivery.net/${cloudflareAccountHash}/jaison/${variant}`}
                    alt="Jaison Logo"
                    className="absolute w-full h-full object-contain"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: showJaison ? 'rotateY(0deg)' : 'rotateY(-180deg)',
                      transition: 'transform 0.6s'
                    }}
                  />
                </div>
              </div>
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="px-4 py-2 bg-white/90 border border-gray-400 rounded-full text-black text-sm font-medium tracking-wider hover:bg-white transition-all duration-300 relative z-50"
            >
              MENU
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/60 z-40">
          <div className="container mx-auto px-4 pt-24 h-full overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute bottom-8 left-8 text-white hover:text-yellow-400 transition-colors text-2xl font-light border border-gray-400 rounded-full px-3 py-1"
            >
              close ✕
            </button>
          {/* Mobile Menu */}
          <nav className="space-y-6 md:hidden">
            {menuItems.map((item) => (
              <div key={item.id} className="overflow-hidden">
                {item.subItems && item.subItems.length > 0 ? (
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === item.id ? null : item.id)
                    }
                    className={`w-full flex items-center hover:text-yellow-400 transition-colors py-2 ${router.pathname === item.href ? 'text-yellow-400' : 'text-white'}`}
                  >
                    <span
                      className={`text-green-500 transition-transform duration-300 mr-3
                        ${activeMenu === item.id ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                    <span className="text-lg font-light">{item.label}</span>
                  </button>
                ) : (
                  <Link href={item.href}>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className={`w-full text-left hover:text-yellow-400 transition-colors py-2 ${router.pathname === item.href ? 'text-yellow-400' : 'text-white'}`}
                    >
                      <span className="text-lg font-light">{item.label}</span>
                    </button>
                  </Link>
                )}

                {item.subItems && item.subItems.length > 0 && (
                  <div
                    className={`space-y-4 pl-4 transition-all duration-300
                      ${activeMenu === item.id ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                  >
                    {item.subItems.map((subItem) => (
                      <Link href={subItem.href} key={subItem.label}>
                        <button
                          onClick={() => setIsMenuOpen(false)}
                          className="block w-full text-left text-gray-400 hover:text-white transition-colors py-1"
                        >
                          {subItem.label}
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Menu - Right Aligned */}
          <nav className="hidden md:flex flex-col items-end space-y-4 pt-12">
            {menuItems.map((item, index) => (
              <div 
                key={item.id} 
                className="overflow-hidden"
                style={{ 
                  animationDelay: `${index * 100}ms`
                }}
              >
                {item.subItems && item.subItems.length > 0 ? (
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === item.id ? null : item.id)
                    }
                    className={`flex items-center hover:text-yellow-400 transition-colors py-3 text-right ${router.pathname === item.href ? 'text-yellow-400' : 'text-white'}`}
                  >
                    <span
                      className={`text-green-500 transition-transform duration-300 mr-4
                        ${activeMenu === item.id ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                    <span className="text-2xl font-light tracking-wider">{item.label}</span>
                  </button>
                ) : (
                  <Link href={item.href}>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-right hover:text-yellow-400 transition-colors py-3 ${router.pathname === item.href ? 'text-yellow-400' : 'text-white'}`}
                    >
                      <span className="text-2xl font-light tracking-wider">{item.label}</span>
                    </button>
                  </Link>
                )}

                {item.subItems && item.subItems.length > 0 && (
                  <div
                    className={`space-y-4 pr-4 transition-all duration-300 text-right
                      ${activeMenu === item.id ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                  >
                    {item.subItems.map((subItem) => (
                      <Link href={subItem.href} key={subItem.label}>
                        <button
                          onClick={() => setIsMenuOpen(false)}
                          className="block w-full text-right text-gray-400 hover:text-white transition-colors py-1"
                        >
                          {subItem.label}
                        </button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;