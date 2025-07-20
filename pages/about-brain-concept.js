import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import { 
  SiPython, SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, 
  SiNodedotjs, SiDocker, SiGithub, SiAmazonaws, SiMongodb,
  SiAdobe, SiInstagram, SiFigma
} from "react-icons/si";
import { TbBrain, TbCode, TbPalette } from "react-icons/tb";

function AboutPage() {
  const router = useRouter();

  // State declarations
  const [showHeader, setShowHeader] = useState(false);
  const [showSubheader, setShowSubheader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("about");
  const [showImage, setShowImage] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedBrainSide, setSelectedBrainSide] = useState('left'); // 'left' or 'right'
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [brainRef, brainInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [contentRef, contentInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [newsletterRef, newsletterInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const menuItems = [
    { id: "home", label: "HOME", href: "/", subItems: [] },
    { id: "about", label: "ABOUT", href: "/about", subItems: [] },
    { id: "portfolio", label: "PORTFOLIO", href: "/portfolio", subItems: [] },
    { id: "projects", label: "PROJECTS", href: "/projects", subItems: [] },
    { id: "articles", label: "ARTICLES", href: "/articles", subItems: [] },
    { id: "resources", label: "RESOURCES", href: "/resources", subItems: [] },
    { id: "contact", label: "CONTACT", href: "/contact", subItems: [] },
  ];

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowImage(true), 500),
      setTimeout(() => setShowHeader(true), 1000),
      setTimeout(() => setShowSubheader(true), 1500),
    ];
    
    // Check if device supports touch
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  // Technical skills (Left Brain)
  const technicalSkills = {
    category: "Left Brain",
    description: "The analytical side: algorithms, systems, and logic",
    subcategories: [
      {
        title: "AI & Machine Learning",
        items: ["OpenAI API", "Hugging Face", "LangChain", "Custom AI Models", "Google AI", "IBM Watson"],
      },
      {
        title: "Development",
        items: ["Python", "JavaScript", "React", "Next.js", "Node.js", "FastAPI"],
      },
      {
        title: "Cloud & DevOps",
        items: ["AWS", "Docker", "Firebase", "Cloudflare", "Git", "CI/CD"],
      },
      {
        title: "Data & Systems",
        items: ["MongoDB", "MySQL", "Elasticsearch", "QDrant", "ChromaDB", "System Architecture"],
      },
    ],
  };

  // Creative skills (Right Brain)
  const creativeSkills = {
    category: "Right Brain",
    description: "The artistic side: imagination, aesthetics, and expression",
    subcategories: [
      {
        title: "AI Art & Generation",
        items: ["Midjourney", "DALL-E", "Stable Diffusion", "RunwayML", "Custom Workflows"],
      },
      {
        title: "Visual Design",
        items: ["Adobe Creative Suite", "Figma", "Photography", "Video Production", "Brand Design"],
      },
      {
        title: "Writing & Content",
        items: ["Creative Writing", "English Literature", "Content Strategy", "Storytelling", "Technical Writing"],
      },
      {
        title: "Digital Art",
        items: ["Digital Painting", "3D Visualization", "Motion Graphics", "UI/UX Design", "Generative Art"],
      },
    ],
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setEmail("");
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
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
                    src="/media/signature-logo-wht.png"
                    alt="John Li Logo"
                    width={150}
                    height={150}
                    className="w-[65px] h-[65px] object-contain"
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
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto px-4 pt-24">
          <nav className="space-y-6">
            {menuItems.map((item) => (
              <div key={item.id} className="overflow-hidden">
                {item.subItems.length > 0 ? (
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === item.id ? null : item.id)
                    }
                    className="w-full flex justify-between items-center text-white hover:text-green-500 transition-colors py-2"
                  >
                    <span className="text-2xl font-light">{item.label}</span>
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
                      <span className="text-2xl font-light">{item.label}</span>
                    </button>
                  </Link>
                )}

                {item.subItems.length > 0 && (
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
        </div>
      </div>

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="flex justify-center items-center pt-32 pb-8"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1
            className={`text-7xl md:text-8xl font-bold bg-gradient-to-b from-gray-600 to-transparent bg-clip-text text-transparent tracking-tighter mb-6 scroll-animate ${heroInView ? "fade-in" : ""}`}
          >
            ABOUT ME
          </h1>

          <h2
            className={`text-white text-xl md:text-2xl font-light mb-8 leading-relaxed max-w-3xl mx-auto scroll-animate-left ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            
            
            Logic meets imagination. Code becomes art.
          </h2>
        </div>
      </div>

      {/* Interactive Brain Section */}
      <div ref={brainRef} className="py-16 px-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className={`text-center mb-16 scroll-animate ${brainInView ? "fade-in" : ""}`}>
            <div className="relative inline-block p-8">
              {/* Brain Container with 3D Rotation */}
              <div className="perspective-container">
                <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] mx-auto cursor-pointer">
                  <div 
                    className={`rotate-container ${selectedBrainSide === 'right' ? 'rotated' : ''}`}
                    onMouseEnter={() => !isTouchDevice && setSelectedBrainSide(prev => prev === 'left' ? 'right' : 'left')}
                    onClick={() => setSelectedBrainSide(selectedBrainSide === 'left' ? 'right' : 'left')}
                  >
                    {/* Technical Brain (Front) */}
                    <div className="brain-side">
                      <img
                        src="brain-tekie-blue"
                        alt="TEKKIE"
                        width={400}
                        height={400}
                        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                        style={{ transform: 'scale(0.9)' }}
                      />
                    </div>

                    {/* Creative Brain (Back - flipped) */}
                    <div className="brain-side brain-back">
                      <img
                        src="brain-creative-pink"
                        alt="PANTSER"
                        width={400}
                        height={400}
                        className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                        style={{ transform: 'scaleX(-1) scale(0.9)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <p className="text-gray-400 mt-8 text-sm animate-pulse">
                {isTouchDevice 
                  ? "Tap the brain or labels to switch perspectives"
                  : "Hover over the brain to toggle sides or Click below to select."
                }
              </p>

              {/* Labels with click functionality */}
              <div className="flex justify-between mt-8 text-lg max-w-md mx-auto">
                <button
                  onClick={() => setSelectedBrainSide('left')}
                  className={`flex-1 text-center transition-all duration-300 group cursor-pointer ${
                    selectedBrainSide === 'left' ? 'text-blue-400 scale-110' : 'text-gray-400 hover:text-blue-300'
                  }`}
                >
                  <TbCode className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-light">Tekkie</span>
                </button>
                <button
                  onClick={() => setSelectedBrainSide('right')}
                  className={`flex-1 text-center transition-all duration-300 group cursor-pointer ${
                    selectedBrainSide === 'right' ? 'text-pink-400 scale-110' : 'text-gray-400 hover:text-pink-300'
                  }`}
                >
                  <TbPalette className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-light">Pantser</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Display based on selection */}
          <div ref={contentRef} className="mt-16">
            {selectedBrainSide === 'left' && (
              <div className={`scroll-animate ${contentInView ? "fade-in" : ""}`}>
                <h3 className="text-4xl font-extralight text-center mb-4 text-blue-400"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {technicalSkills.category}
                </h3>
                <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                  {technicalSkills.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {technicalSkills.subcategories.map((subcat, index) => (
                    <div
                      key={index}
                      className="bg-blue-900/20 border border-blue-800/40 rounded-lg p-6"
                    >
                      <h4 className="text-xl font-medium text-blue-300 mb-4">
                        {subcat.title}
                      </h4>
                      <div className="space-y-2">
                        {subcat.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                            <span className="text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedBrainSide === 'right' && (
              <div className={`scroll-animate ${contentInView ? "fade-in" : ""}`}>
                <h3 className="text-4xl font-extralight text-center mb-4 text-pink-400"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {creativeSkills.category}
                </h3>
                <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
                  {creativeSkills.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {creativeSkills.subcategories.map((subcat, index) => (
                    <div
                      key={index}
                      className="bg-pink-900/20 border border-pink-800/40 rounded-lg p-6"
                    >
                      <h4 className="text-xl font-medium text-pink-300 mb-4">
                        {subcat.title}
                      </h4>
                      <div className="space-y-2">
                        {subcat.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center">
                            <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                            <span className="text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* My Story Section */}
      <div className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2
            className="text-5xl font-extralight mb-8 tracking-wide text-white text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            My <span className="text-orange-200/90">Journey</span>
          </h2>

          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            <p>
              I'm John Li, a creative technologist based in Abu Dhabi, where the 
              intersection of art and technology isn't just my profession—it's my passion.
            </p>

            <p>
              With an English Literature degree fueling my creative side and years of 
              deep technical experience powering my analytical mind, I've found my sweet 
              spot at the convergence of imagination and logic. This unique blend allows 
              me to approach problems from angles others might miss.
            </p>

            <p>
              My journey has taken me from traditional photography and writing to the 
              cutting edge of AI development. Today, I've generated over 13,000 AI images, 
              written more than a million words, and coded for over 10,000 hours—each 
              project teaching me something new about the beautiful complexity of merging 
              human creativity with machine intelligence.
            </p>

            <p>
              Whether I'm developing AI systems for educational institutions, creating 
              generative art, or building secure applications for government use, I bring 
              both hemispheres to every challenge: the discipline of clean code and the 
              freedom of creative expression.
            </p>
          </div>
        </div>
      </div>

      {/* Profile Image Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className={`relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden border-4 border-orange-200/20 scroll-animate ${skillsInView ? "fade-in" : ""}`}
          >
            <img
              src="profilepicjaison"
              alt="John Li"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div ref={newsletterRef} className="bg-gray-900 p-16 text-center">
        <div
          className={`mb-8 scroll-animate ${newsletterInView ? "fade-in" : ""}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-16 h-16 mx-auto text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M0 9l12 6L24 9M0 9v13h24V9M0 9l12 2l12-2" />
            <path
              className="opacity-60"
              d="M-4 9l4 0M24 9l4 0"
              strokeDasharray="1 2"
            />
          </svg>
        </div>

        <h2
          className={`text-4xl md:text-5xl font-light text-white mb-8 leading-tight scroll-animate-left ${newsletterInView ? "fade-in" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          Get the latest <span className="text-orange-200">updates</span>
          <br />
          direct to inbox
        </h2>

        <form
          onSubmit={handleNewsletterSubmit}
          className={`max-w-xl mx-auto scroll-animate ${newsletterInView ? "fade-in" : ""}`}
          style={{ transitionDelay: "400ms" }}
        >
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
            <div
              className={`mb-4 text-sm ${submitStatus === "success" ? "text-green-500" : "text-red-500"}`}
            >
              {submitStatus === "success"
                ? "Successfully subscribed!"
                : "Something went wrong. Please try again."}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="group inline-flex items-center gap-2 text-white text-xl 
                     border-b-2 border-orange-200 pb-1 hover:border-white transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "SENDING..." : "SUBSCRIBE"}
          </button>
        </form>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 px-8 py-16 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="text-3xl text-white font-light mb-6">John Li</div>
            <p className="text-gray-400 mt-4">
              Portfolio, Projects, and Resources{" "}
              <span className="italic"></span>
            </p>
          </div>

          {/* Location Section */}
          <div className="mb-16">
            <h3 className="text-3xl text-white font-light mb-6">Location</h3>
            <address className="text-gray-400 not-italic">
              Abu Dhabi,
              <br />
              United Arab Emirates
            </address>
          </div>

          {/* Contact Section */}
          <div className="mb-16">
            <h3 className="text-3xl text-white font-light mb-6">
              Let's Connect.
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-orange-200">✉</span>
                <a
                  href="mailto:johnny@johnny.ae"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  johnny@johnny.ae
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-200">📞</span>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Request Callback
                </Link>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 mb-16">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Facebook
            </a>
            <span className="text-gray-600">/</span>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              X/Twitter
            </a>
            <span className="text-gray-600">/</span>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Instagram
            </a>
          </div>

          {/* Footer Credits */}
          <div className="text-center text-gray-400 text-sm">
            <p>
              Designed by{" "}
              <a
                href="#"
                className="text-white hover:text-orange-200 transition-colors"
              >
                Monarkh AI Design and Build
              </a>
              , Powered by{" "}
              <a
                href="#"
                className="text-white hover:text-orange-200 transition-colors"
              >
                Monarkh
              </a>
            </p>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors mt-2 inline-block"
            >
              Privacy
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        .animate-scroll-left {
          animation: scrollLeft 20s linear infinite;
        }

        .animate-scroll-right {
          animation: scrollRight 20s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }

        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .scroll-animate-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: all 0.8s ease-out;
        }

        .scroll-animate-right {
          opacity: 0;
          transform: translateX(30px);
          transition: all 0.8s ease-out;
        }

        .fade-in {
          opacity: 1;
          transform: translate(0);
        }

        .perspective-container {
          perspective: 1000px;
        }

        .rotate-container {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .rotate-container.rotated {
          transform: rotateY(180deg);
        }

        .brain-side {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .brain-back {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}

export default AboutPage;