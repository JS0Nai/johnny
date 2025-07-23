import React from "react";
import Link from "next/link";

const Header = ({ isMenuOpen, setIsMenuOpen, activeMenu, setActiveMenu, menuItems }) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/20 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <div className="cursor-pointer">
                <img
                  src="/media/signature-webpagetopleft-logo.png"
                  alt="John Li Logo"
                  width={150}
                  height={150}
                  className="w-[65px] h-[65px] object-contain"
                />
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
        <div className="fixed inset-0 bg-black/80 z-40">
          <div className="container mx-auto px-4 pt-24 h-full overflow-y-auto">
          {/* Mobile Menu */}
          <nav className="space-y-6 md:hidden">
            {menuItems.map((item) => (
              <div key={item.id} className="overflow-hidden">
                {item.subItems && item.subItems.length > 0 ? (
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === item.id ? null : item.id)
                    }
                    className="w-full flex justify-between items-center text-white hover:text-green-500 transition-colors py-2"
                  >
                    <span className="text-xl font-light">{item.label}</span>
                    <span
                      className={`text-green-500 transition-transform duration-300
                        ${activeMenu === item.id ? "rotate-180" : ""}`}
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
                      <span className="text-xl font-light">{item.label}</span>
                    </button>
                  </Link>
                )}

                {item.subItems && item.subItems.length > 0 && (
                  <div
                    className={`space-y-4 pl-4 transition-all duration-300
                      ${activeMenu === item.id ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
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

          {/* Desktop Menu - Staircase Layout */}
          <nav className="hidden md:flex flex-col items-end space-y-8 pt-12">
            {menuItems.map((item, index) => (
              <div 
                key={item.id} 
                className="overflow-hidden"
                style={{ 
                  marginRight: `${item.id === 'contact' ? (index * 60) - 120 : index * 60}px`,
                  animationDelay: `${index * 100}ms`
                }}
              >
                {item.subItems && item.subItems.length > 0 ? (
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === item.id ? null : item.id)
                    }
                    className="flex justify-between items-center text-white hover:text-green-500 transition-colors py-3 text-right"
                  >
                    <span className="text-3xl font-light tracking-wider">{item.label}</span>
                    <span
                      className={`text-green-500 transition-transform duration-300 ml-4
                        ${activeMenu === item.id ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>
                ) : (
                  <Link href={item.href}>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="text-right text-white hover:text-green-500 transition-colors py-3"
                    >
                      <span className="text-3xl font-light tracking-wider">{item.label}</span>
                    </button>
                  </Link>
                )}

                {item.subItems && item.subItems.length > 0 && (
                  <div
                    className={`space-y-4 pr-4 transition-all duration-300 text-right
                      ${activeMenu === item.id ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                  >
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem}
                        className="block w-full text-right text-gray-400 hover:text-white transition-colors py-1"
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
      )}
    </>
  );
};

export default Header;