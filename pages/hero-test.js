import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import { SiGithub, SiLinkedin, SiTwitter } from "react-icons/si";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// --- Hero Section V1 ---
const HeroV1 = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <main
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <CloudflareImage
          src="jli-signature1000"
          alt="JLi Signature"
          width={1200}
          height={1000}
          className="w-full h-auto max-w-4xl object-contain opacity-5"
        />
      </div>
      <div className="relative z-10 text-center px-4">
        <div className={`transition-all duration-1000 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-4">
            John Li
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light bg-gradient-to-r from-orange-200 to-green-300 bg-clip-text text-transparent mb-8">
            Creative Technologist & AI Specialist
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed mb-12">
            Bridging the gap between imagination and innovation. I build intelligent systems, design compelling user experiences, and explore the frontiers of artificial intelligence.
          </p>
        </div>
        <div className={`flex justify-center items-center gap-6 transition-all duration-1000 delay-200 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/projects"><span className="px-8 py-4 bg-orange-200 text-slate-900 font-semibold rounded-full text-lg hover:bg-orange-300 transition-all duration-300 transform hover:scale-105 cursor-pointer">View My Work</span></Link>
          <Link href="/contact"><span className="px-8 py-4 border-2 border-gray-500 text-white font-semibold rounded-full text-lg hover:bg-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer">Get In Touch</span></Link>
        </div>
        <div className={`flex justify-center gap-8 mt-16 transition-all duration-1000 delay-400 ${heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiGithub size={28} /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiLinkedin size={28} /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiTwitter size={28} /></a>
        </div>
      </div>
    </main>
  );
};

// --- Hero Section V2 (Slider) ---
const HeroV2 = () => {
  const slides = [
    {
      title: "Creative Technologist",
      subtitle: "Where AI Meets Artistic Vision",
      description: "I build intelligent systems that empower creativity, transforming complex data into compelling visual narratives and interactive experiences.",
    },
    {
      title: "AI & Software Engineer",
      subtitle: "Building Robust & Scalable Solutions",
      description: "From custom large language model integrations to full-stack applications, I engineer solutions that are secure, efficient, and impactful.",
    },
    {
      title: "Digital Explorer",
      subtitle: "Innovating at the Edge of Technology",
      description: "My work involves a constant pursuit of what's next, pushing the boundaries of digital interaction and shaping the future of user experience.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  return (
    <main
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900"
    >
      <div className="absolute inset-0 z-0">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <CloudflareImage
          src="jli-signature1000"
          alt="JLi Signature"
          width={1200}
          height={1000}
          className="w-full h-auto max-w-3xl object-contain opacity-5" // 25% smaller
        />
      </div>
      <div className="relative z-10 text-center px-4 flex flex-col items-center">
        <div className="relative h-48 md:h-56 lg:h-64 w-full max-w-4xl mb-12">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-4">
                {slide.title}
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-light bg-gradient-to-r from-orange-200 to-green-300 bg-clip-text text-transparent mb-8">
                {slide.subtitle}
              </h2>
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-300 leading-relaxed">
                {slide.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center items-center gap-4 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-orange-200 scale-125' : 'bg-gray-600'}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

// --- Hero Section V3 (Content Slider) ---
const HeroV3 = () => {
  const slides = [
    {
      type: 'logo',
      component: () => (
        <div className="flex flex-col items-center justify-center text-center h-full">
          <CloudflareImage src="icogo150" alt="Monarkh Logo" width={200} height={200} className="w-48 h-48 md:w-64 md:h-64" />
          <h2 className="text-3xl md:text-5xl font-light text-white mt-6">Creative Technologist</h2>
          <p className="text-lg text-gray-400 mt-2">Exploring the intersection of AI, Design, and Code</p>
        </div>
      )
    },
    {
      type: 'project',
      title: "The Science of Reading",
      category: "Education & Research",
      description: "A research paper synthesizing findings from cognitive science, education, and vision science to create a comprehensive overview of how children learn to read.",
      image: "project-reading-model",
      link: "/projects"
    },
    {
      type: 'article',
      title: "The Future of AI in Creative Industries",
      category: "Featured Article",
      description: "Exploring how artificial intelligence is transforming creative workflows and opening new possibilities for artists and designers worldwide.",
      image: "article-ai-creative",
      link: "/articles"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setTimeout(nextSlide, 8000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-4 relative">
        <div className="relative h-[500px] md:h-[450px]">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div key={index} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {slide.type === 'logo' && <slide.component />}
                {(slide.type === 'project' || slide.type === 'article') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                    <div className="text-center md:text-left">
                      <span className="text-sm font-bold uppercase text-orange-200 tracking-widest">{slide.category}</span>
                      <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">{slide.title}</h2>
                      <p className="text-lg text-gray-300 mb-8">{slide.description}</p>
                      <Link href={slide.link}>
                        <span className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-600 transition-colors cursor-pointer">
                          {slide.type === 'project' ? 'View Project' : 'Read Article'}
                        </span>
                      </Link>
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                       <CloudflareImage src={slide.image} alt={slide.title} width={400} height={300} className="rounded-lg shadow-2xl object-cover" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <button onClick={prevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-20">
        <FiChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-20">
        <FiChevronRight size={24} />
      </button>
    </main>
  );
};

// --- Hero Section V4 (Content Slider with Signature) ---
const HeroV4 = () => {
  const slides = [
    {
      type: 'logo',
      component: () => (
        <div className="flex flex-col items-center justify-center text-center h-full">
          <CloudflareImage src="jli-signature1000" alt="John Li Signature" width={800} height={400} className="w-full max-w-lg" />
        </div>
      )
    },
    {
      type: 'project',
      title: "The Science of Reading",
      category: "Education & Research",
      description: "A research paper synthesizing findings from cognitive science, education, and vision science to create a comprehensive overview of how children learn to read.",
      image: "project-reading-model",
      link: "/projects"
    },
    {
      type: 'article',
      title: "The Future of AI in Creative Industries",
      category: "Featured Article",
      description: "Exploring how artificial intelligence is transforming creative workflows and opening new possibilities for artists and designers worldwide.",
      image: "article-ai-creative",
      link: "/articles"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setTimeout(nextSlide, 8000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-4 relative">
        <div className="relative h-[500px] md:h-[450px]">
          {slides.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div key={index} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                {slide.type === 'logo' && <slide.component />}
                {(slide.type === 'project' || slide.type === 'article') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                    <div className="text-center md:text-left">
                      <span className="text-sm font-bold uppercase text-orange-200 tracking-widest">{slide.category}</span>
                      <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">{slide.title}</h2>
                      <p className="text-lg text-gray-300 mb-8">{slide.description}</p>
                      <Link href={slide.link}>
                        <span className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-full hover:bg-gray-600 transition-colors cursor-pointer">
                          {slide.type === 'project' ? 'View Project' : 'Read Article'}
                        </span>
                      </Link>
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                       <CloudflareImage src={slide.image} alt={slide.title} width={400} height={300} className="rounded-lg shadow-2xl object-cover" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-orange-200 scale-125' : 'bg-gray-600'}`}
          />
        ))}
      </div>
    </main>
  );
};

// --- Hero Section V5 (Final Version) ---
const HeroV5 = () => {
  const slides = [
    {
      type: 'intro',
      title: "John Li",
      subtitle: "Creative Technologist & AI Specialist",
      description: "Bridging the gap between imagination and innovation. I build intelligent systems, design compelling user experiences, and explore the frontiers of artificial intelligence.",
    },
    {
      type: 'project',
      title: "The Science of Reading",
      category: "Education & Research",
      description: "A research paper synthesizing findings from cognitive science, education, and vision science to create a comprehensive overview of how children learn to read.",
      link: "/projects"
    },
    {
      type: 'article',
      title: "The Future of AI in Creative Industries",
      category: "Featured Article",
      description: "Exploring how artificial intelligence is transforming creative workflows and opening new possibilities for artists and designers worldwide.",
      link: "/articles"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <main className="h-screen flex flex-col justify-center relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <CloudflareImage
          src="jli-signature1000"
          alt="JLi Signature"
          width={800}
          height={600}
          className="w-full h-auto max-w-2xl object-contain opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-b from-gray-500 to-transparent bg-clip-text text-transparent tracking-tighter mb-8 leading-none">
          PORTFOLIO
        </h1>
        
        <div className="relative h-56 md:h-48">
          {slides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              {slide.type === 'intro' && (
                <div>
                  <h2 className="text-3xl md:text-5xl font-light text-white mb-4">{slide.title}</h2>
                  <p className="text-xl md:text-2xl text-orange-200">{slide.subtitle}</p>
                </div>
              )}
              {(slide.type === 'project' || slide.type === 'article') && (
                <div>
                  <p className="text-sm font-bold uppercase text-gray-400 tracking-widest">{slide.category}</p>
                  <h2 className="text-3xl md:text-5xl font-light text-white mt-2 mb-4">{slide.title}</h2>
                  <Link href={slide.link}><span className="text-orange-200 hover:underline cursor-pointer">Learn More</span></Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-orange-200 scale-125' : 'bg-gray-600'}`}
          />
        ))}
      </div>
    </main>
  );
};

// --- Hero Section V6 (Final Version) ---
const HeroV6 = () => {
  const slides = [
    {
      title: "John Li",
      subtitle: "Creative Technologist & AI Specialist",
      description: "Bridging the gap between imagination and innovation. I build intelligent systems, design compelling user experiences, and explore the frontiers of artificial intelligence.",
    },
    {
      title: "The Science of Reading",
      subtitle: "Education & Research",
      description: "A research paper synthesizing findings from cognitive science, education, and vision science to create a comprehensive overview of how children learn to read.",
    },
    {
      title: "The Future of AI in Creative Industries",
      subtitle: "Featured Article",
      description: "Exploring how artificial intelligence is transforming creative workflows and opening new possibilities for artists and designers worldwide.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroRef, heroInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearTimeout(timer);
  }, [currentSlide, slides.length]);

  return (
    <main
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <CloudflareImage
          src="jli-signature1000"
          alt="JLi Signature"
          width={800}
          height={600}
          className="w-full h-auto max-w-xl object-contain opacity-[0.65]"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 text-center mb-16 z-0">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-b from-gray-700 to-transparent bg-clip-text text-transparent tracking-tighter leading-none">
          JOHN LI
        </h1>
      </div>
      
      <div className="relative z-10 text-center px-4 mt-[-10rem]">
        <div className="relative h-64">
          {slides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <h2 className="text-3xl md:text-5xl font-light text-white mb-4">{slide.title}</h2>
              <p className="text-xl md:text-2xl text-orange-200 mb-6">{slide.subtitle}</p>
              <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed">{slide.description}</p>
            </div>
          ))}
        </div>
        
        <div className={`flex justify-center items-center gap-6 mt-8 transition-all duration-1000 delay-200 ${heroInView ? 'opacity-100' : 'opacity-0'}`}>
          <Link href="/projects"><span className="px-8 py-4 bg-orange-200 text-slate-900 font-semibold rounded-full text-lg hover:bg-orange-300 transition-all duration-300 transform hover:scale-105 cursor-pointer">View My Work</span></Link>
          <Link href="/contact"><span className="px-8 py-4 border-2 border-gray-500 text-white font-semibold rounded-full text-lg hover:bg-gray-800 hover:border-gray-700 transition-all duration-300 cursor-pointer">Get In Touch</span></Link>
        </div>
        
        <div className={`flex justify-center gap-8 mt-12 transition-all duration-1000 delay-400 ${heroInView ? 'opacity-100' : 'opacity-0'}`}>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiGithub size={28} /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiLinkedin size={28} /></a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors"><SiTwitter size={28} /></a>
        </div>
      </div>
    </main>
  );
};

// --- Hero Section V7 (Final Version) ---
const HeroV7 = () => {
  const slides = [
    {
      type: 'intro',
      title: "John Li",
      subtitle: "Creative Technologist & AI Specialist",
      description: "Bridging the gap between imagination and innovation. I build intelligent systems, design compelling user experiences, and explore the frontiers of artificial intelligence.",
    },
    {
      type: 'project',
      title: "The Science of Reading",
      subtitle: "Education & Research",
      description: "A research paper synthesizing findings from cognitive science, education, and vision science to create a comprehensive overview of how children learn to read.",
      link: "/projects"
    },
    {
      type: 'article',
      title: "The Future of AI in Creative Industries",
      subtitle: "Featured Article",
      description: "Exploring how artificial intelligence is transforming creative workflows and opening new possibilities for artists and designers worldwide.",
      link: "/articles"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <main className="h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 text-center mb-16 z-0">
          <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold bg-gradient-to-b from-gray-700 to-transparent bg-clip-text text-transparent tracking-tighter leading-none">
            JOHN LI
          </h1>
        </div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <div className="relative h-80">
          {slides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                {/* Left Column: Signature */}
                <div className={`flex items-center justify-center transition-all duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                  <CloudflareImage
                    src="jli-signature1000"
                    alt="JLi Signature"
                    width={600}
                    height={400}
                    className="w-full h-auto max-w-md object-contain opacity-80"
                  />
                </div>
                
                {/* Right Column: Text Content */}
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-5xl font-light text-white mb-4">{slide.title}</h2>
                  <p className="text-xl md:text-2xl text-orange-200 mb-6">{slide.subtitle}</p>
                  <p className="max-w-2xl text-lg text-gray-300 leading-relaxed">{slide.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};


function HeroTestPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: "home", label: "HOME", href: "/", subItems: [] },
    { id: "about", label: "ABOUT", href: "/about", subItems: [] },
    { id: "portfolio", label: "PORTFOLIO", href: "/portfolio", subItems: [] },
    { id: "projects", label: "PROJECTS", href: "/projects", subItems: [] },
    { id: "articles", label: "ARTICLES", href: "/articles", subItems: [] },
    { id: "resources", label: "RESOURCES", href: "/resources", subItems: [] },
    { id: "contact", label: "CONTACT", href: "/contact", subItems: [] },
  ];

  return (
    <div className="bg-slate-900 text-white relative w-full overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/"><div className="cursor-pointer"><CloudflareImage src="jli-signature1000" alt="John Li Signature" width={200} height={50} className="h-12 w-auto" /></div></Link>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 w-8 h-8 flex items-center justify-center">
              {isMenuOpen ? (<div className="relative w-6 h-6"><div className="absolute top-1/2 left-0 w-6 h-0.5 bg-white rotate-45"></div><div className="absolute top-1/2 left-0 w-6 h-0.5 bg-white -rotate-45"></div></div>) : (<div className="space-y-1"><div className="w-6 h-0.5 bg-green-500"></div><div className="w-6 h-0.5 bg-green-500"></div></div>)}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <div className={`fixed inset-0 bg-black/95 transition-transform duration-500 ease-in-out z-40 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="container mx-auto px-4 pt-24"><nav className="space-y-6">{menuItems.map((item) => (<Link href={item.href} key={item.id}><button onClick={() => setIsMenuOpen(false)} className="w-full text-left text-white hover:text-green-500 transition-colors py-2"><span className="text-2xl font-light">{item.label}</span></button></Link>))}</nav></div>
      </div>
      
      {/* --- HERO SECTIONS --- */}
      <div className="border-b-4 border-dashed border-red-500"><h1 className="text-center text-red-500 py-4 text-2xl font-bold">VERSION 1 (STATIC)</h1><HeroV1 /></div>
      <div className="border-b-4 border-dashed border-green-500"><h1 className="text-center text-green-500 py-4 text-2xl font-bold">VERSION 2 (SLIDER)</h1><HeroV2 /></div>
      <div className="border-b-4 border-dashed border-blue-500"><h1 className="text-center text-blue-500 py-4 text-2xl font-bold">VERSION 3 (CONTENT SLIDER)</h1><HeroV3 /></div>
      <div className="border-b-4 border-dashed border-purple-500"><h1 className="text-center text-purple-500 py-4 text-2xl font-bold">VERSION 4 (SIGNATURE SLIDER)</h1><HeroV4 /></div>
      <div className="border-b-4 border-dashed border-yellow-500"><h1 className="text-center text-yellow-500 py-4 text-2xl font-bold">VERSION 5 (FINAL)</h1><HeroV5 /></div>
      <div className="border-b-4 border-dashed border-pink-500"><h1 className="text-center text-pink-500 py-4 text-2xl font-bold">VERSION 6 (FINAL)</h1><HeroV6 /></div>
      <div className="border-b-4 border-dashed border-teal-500"><h1 className="text-center text-teal-500 py-4 text-2xl font-bold">VERSION 7 (FINAL)</h1><HeroV7 /></div>
      
      {/* Simple Clean Hero Section */}
      <div className="border-b-4 border-dashed border-cyan-500">
        <h1 className="text-center text-cyan-500 py-4 text-2xl font-bold">SIMPLE CLEAN HERO</h1>
        <div className="h-screen w-full flex flex-col justify-center items-center relative bg-slate-900 border-t-4 border-green-500">
          <div className="mx-auto max-w-screen-xl w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full text-center relative min-h-[600px] flex flex-col justify-center">
              
              {/* Background Signature - Large and Properly Sized */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
                <CloudflareImage
                  src="jli-signature1000"
                  alt="JLi Signature Background"
                  width={1000}
                  height={800}
                  className="w-full max-w-none h-full object-contain opacity-15 scale-150"
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                {/* Portfolio Text */}
                <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[9rem] font-bold text-white/80 tracking-tighter mb-8 leading-none">
                  PORTFOLIO
                </h1>
                
                {/* Name */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-orange-200 mb-6 font-light">
                  John Li
                </h2>
                
                {/* Tagline */}
                <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                  Creative freedom and the pursuit of improving how things work
                </p>

                {/* Simple Call to Action */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="bg-orange-200 hover:bg-orange-300 text-slate-900 px-8 py-3 rounded-lg font-medium transition-colors">
                    View Work
                  </button>
                  <button className="border border-gray-400 hover:border-orange-200 text-gray-300 hover:text-orange-200 px-8 py-3 rounded-lg font-medium transition-colors">
                    Read About Me
                  </button>
                </div>
              </div>
            </div>
          </div>
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
    </div>
  );
}

export default HeroTestPage;