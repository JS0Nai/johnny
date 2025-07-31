import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import { TbBrain, TbServer } from "react-icons/tb";
import CloudflareImage from "../components/CloudflareImage";
import HeroV8 from "../components/HeroV8";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { SiAdobe } from "react-icons/si";
import { SiGoogle } from "react-icons/si";
import { SiOpenai } from "react-icons/si";
import { SiIbm } from "react-icons/si";
import { SiMeta } from "react-icons/si";
import { SiApple } from "react-icons/si";
import { SiAmazonaws } from "react-icons/si";
import { SiFirebase } from "react-icons/si";
import { SiCloudflare } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { SiDocker } from "react-icons/si";
import { SiGithub } from "react-icons/si";
import { SiVisualstudiocode } from "react-icons/si";
import { SiInstagram } from "react-icons/si";
import { SiMicrosoft } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiNextdotjs } from "react-icons/si";
import { SiTailwindcss } from "react-icons/si";
import { SiNodedotjs } from "react-icons/si";
import { SiPython } from "react-icons/si";
import { SiJavascript } from "react-icons/si";

function HomePage() {
  const router = useRouter();

  // State declarations
  const [showBlog, setShowBlog] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showSubheader, setShowSubheader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("home");
  const [showImage, setShowImage] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [numbers, setNumbers] = useState(["0", "0", "0", "0", "0", "0"]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(null);

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [coreDisciplinesRef, coreDisciplinesInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [portfolioRef, portfolioInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [portfolioSliderRef, portfolioSliderInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [playgroundRef, playgroundInView] = useInView({ threshold: 0.2, triggerOnce: true });
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
      setTimeout(() => setShowBlog(true), 500),
      setTimeout(() => setShowResources(true), 1000),
      setTimeout(() => setShowHeader(true), 1500),
      setTimeout(() => setShowSubheader(true), 2000),
    ];
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  // Hero carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Initialize slider position
  useEffect(() => {
    if (portfolioSliderInView) {
      const slider = document.querySelector(".image-slider-left");
      if (slider) {
        // Start at the beginning of the first set
        slider.scrollLeft = 0;
      }
    }
  }, [portfolioSliderInView]);

  // Handle hover for portfolio slider
  useEffect(() => {
    const handleSliderHover = () => {
      const slider = document.querySelector(".image-slider-left");
      const sliderContent = slider?.querySelector('.flex');
      
      if (!slider || !sliderContent) return;

      const handleMouseEnter = () => {
        if (sliderContent.dataset.manuallyPaused !== "true") {
          sliderContent.style.animationPlayState = "paused";
        }
      };

      const handleMouseLeave = () => {
        if (sliderContent.dataset.manuallyPaused !== "true") {
          sliderContent.style.animationPlayState = "running";
        }
      };

      slider.addEventListener('mouseenter', handleMouseEnter);
      slider.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        slider.removeEventListener('mouseenter', handleMouseEnter);
        slider.removeEventListener('mouseleave', handleMouseLeave);
      };
    };

    if (portfolioSliderInView) {
      const cleanup = handleSliderHover();
      return cleanup;
    }
  }, [portfolioSliderInView]);

  useEffect(() => {
    if (portfolioInView) {
      const duration = 2000;
      const steps = 50;
      const interval = duration / steps;
      const targetNumbers = [10000, 15000, 100, 18000, 2000000, 50000];

      const animateNumbers = () => {
        for (let i = 0; i <= steps; i++) {
          setTimeout(() => {
            setNumbers((prevNumbers) =>
              prevNumbers.map((num, index) => {
                const currentValue = Math.round(
                  (targetNumbers[index] * i) / steps,
                );
                // Format large numbers
                if (currentValue >= 1000000) {
                  return `${Math.round(currentValue / 1000000)}M`;
                }
                if (currentValue >= 1000) {
                  return `${Math.round(currentValue / 1000)}K`;
                }
                return currentValue;
              }),
            );
          }, i * interval);
        }
      };

      animateNumbers();
    } else {
      setNumbers([0, 0, 0, 0, 0, 0]);
    }
  }, [portfolioInView]);

  const topSliderImages = [
    "mouthy",
    "dist-op",
    "simplechaos",
    "bee",
    "surrealproductphotoshoot",
    "batty",
    "greencloseup",
    "broken",
    "lonelymoon",
    "stanky",
    "fuming",
    "plasticdoll",
    "BeethovensFlower",
    "sky",
    "bluemystic",
    "eyeballing",
    "colorfuldrawing",
    "brighteyes",
    "akkiro",
    "dollyparts",
    "tigger",
    "influence",
    "lavasplash",
    "littlewatercolor",
    "lostcount",
    "mistywitch",
    "artofgirl",
    "modeldoll",
    "nofreckles",
    "parade",
    "pencilhair",
    "cliffhanger",
    "prettywitch",
    "seademon",
    "doli",
    "senorita3",
    "streetscene",
    "theorient",
    "thoughts",
    "witchprincess",
  ];

  // Define which images have video versions
  const imagesWithVideo = ["simplechaos", "batty", "bee", "mouthy", "dist-op", "surrealproductphotoshoot"]; // Add more image names here as you add videos

  // Map image names to video names (when they differ)
  const videoNameMap = {
    // Add mappings here when image and video names differ
    // Example: "image-name": "video-name",
    "surrealproductphotoshoot": "surreal--photoshoot",
  };

  // Helper function to get video filename
  const getVideoName = (imageName) => {
    return videoNameMap[imageName] || imageName;
  };

  const handleSlideChange = (direction) => {
    const slider = document.querySelector(".image-slider-left");
    const sliderContent = slider?.querySelector('.flex');
    const scrollAmount = direction === "left" ? -288 : 288;

    if (slider && sliderContent) {
      // Pause the animation when manually scrolling
      sliderContent.style.animationPlayState = "paused";
      sliderContent.dataset.manuallyPaused = "true";

      const singleSetWidth = sliderContent.scrollWidth / 2; // Since we have 2 sets of images
      const currentScroll = slider.scrollLeft;

      // Handle seamless looping
      if (direction === "left") {
        if (currentScroll <= 0) {
          // If at the beginning, jump to the end of the first set
          slider.scrollTo({
            left: singleSetWidth - scrollAmount,
            behavior: "auto"
          });
          setTimeout(() => {
            slider.scrollBy({
              left: scrollAmount,
              behavior: "smooth"
            });
          }, 10);
        } else {
          slider.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
          });
        }
      } else {
        // Scrolling right
        if (currentScroll >= singleSetWidth) {
          // If we've scrolled past the first set, reset to beginning
          slider.scrollTo({
            left: 0,
            behavior: "auto"
          });
          setTimeout(() => {
            slider.scrollBy({
              left: scrollAmount,
              behavior: "smooth"
            });
          }, 10);
        } else {
          slider.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
          });
        }
      }

      // Resume animation after scrolling (but only if not hovering)
      setTimeout(() => {
        if (sliderContent) {
          sliderContent.dataset.manuallyPaused = "false";
          // Check if we're hovering before resuming
          if (!slider.matches(':hover')) {
            sliderContent.style.animationPlayState = "running";
          }
        }
      }, 3000);
    }
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
      {/* Header */}
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        menuItems={menuItems}
      />

      {/* HeroV8 Section */}
      <HeroV8 />


      {/* The Monarch Project Section */}
      <div className="py-24 bg-slate-900 relative z-10 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-6xl font-light text-white mb-4">
            The Monarch Project
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Exploring the intersection of creativity and humanity
          </p>
        </div>
      </div>

      {/* Core Disciplines Section with Tech Stack Visualizer */}
      <div ref={coreDisciplinesRef} className="py-24 bg-slate-900 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-light text-white mb-4 text-center">
            Core <span className="text-orange-200">Disciplines</span>
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">
            An innovative showcase of professional work and creative exploration
          </p>
          
          <div className="bento-3d-grid">
            {/* Regular Discipline Boxes */}
            <Link href="/projects">
              <div className={`box-3d scroll-animate ${coreDisciplinesInView ? "fade-in" : ""}`} style={{ transitionDelay: '100ms' }}>
                <div className="box-overlay"></div>
                <div className="box-content">
                  <div className="box-icon">💡</div>
                  <h3 className="box-title">Applications</h3>
                  <p className="box-preview">Custom-built platforms</p>
                </div>
              </div>
            </Link>
            
            <Link href="/research">
              <div className={`box-3d scroll-animate ${coreDisciplinesInView ? "fade-in" : ""}`} style={{ transitionDelay: '200ms' }}>
                <div className="box-overlay"></div>
                <div className="box-content">
                  <div className="box-icon">🔬</div>
                  <h3 className="box-title">Research</h3>
                  <p className="box-preview">Technical explorations</p>
                </div>
              </div>
            </Link>
            
            <Link href="/portfolio">
              <div className={`box-3d scroll-animate ${coreDisciplinesInView ? "fade-in" : ""}`} style={{ transitionDelay: '300ms' }}>
                <div className="box-overlay"></div>
                <div className="box-content">
                  <div className="box-icon">🎨</div>
                  <h3 className="box-title">Portfolio</h3>
                  <p className="box-preview">AI-generated art gallery</p>
                </div>
              </div>
            </Link>
            
            <Link href="/literature">
              <div className={`box-3d scroll-animate ${coreDisciplinesInView ? "fade-in" : ""}`} style={{ transitionDelay: '400ms' }}>
                <div className="box-overlay"></div>
                <div className="box-content">
                  <div className="box-icon">✍️</div>
                  <h3 className="box-title">Literature</h3>
                  <p className="box-preview">Creative narratives</p>
                </div>
              </div>
            </Link>
            
            <Link href="/articles">
              <div className={`box-3d scroll-animate ${coreDisciplinesInView ? "fade-in" : ""}`} style={{ transitionDelay: '500ms' }}>
                <div className="box-overlay"></div>
                <div className="box-content">
                  <div className="box-icon">📰</div>
                  <h3 className="box-title">Articles</h3>
                  <p className="box-preview">Published insights</p>
                </div>
              </div>
            </Link>
            
            <Link href="/design-branding">
              <div className={`box-3d scroll-animate ${coreDisciplinesInView ? "fade-in" : ""}`} style={{ transitionDelay: '600ms' }}>
                <div className="box-overlay"></div>
                <div className="box-content">
                  <div className="box-icon">🎯</div>
                  <h3 className="box-title">Branding</h3>
                  <p className="box-preview">Visual identity & brand strategy</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Portfolio Showcase Section */}
      <div ref={portfolioSliderRef} className="relative bg-gray-900 py-24 overflow-hidden">
        <div className="text-center mb-16">
          <h2
            className="text-7xl font-extralight mb-4 tracking-wide text-white dark:text-gray-200 font-garamond"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="text-orange-200/90">AI</span>{" "}
            <span className="text-white">Generation</span>
          </h2>
        </div>

        {/* Top Slider */}
        <div className="relative overflow-hidden mb-8 py-4" style={{ overflowX: 'hidden' }}>
          <button
            onClick={() => handleSlideChange("left")}
            className="slider-button absolute left-2 sm:left-4"
            aria-label="Previous slide"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="image-slider-left">
            <div className={`flex ${portfolioSliderInView ? 'animate-slider-scroll' : ''}`} style={{ gap: '16px' }}>
              {[1, 2].map((set) => (
                <div key={set} className="flex gap-4 flex-nowrap" style={{ paddingRight: set === 1 ? '16px' : '0' }}>
                  {topSliderImages.map((img, index) => (
                    <div
                      key={`${set}-${index}`}
                      className="flex-none w-72 h-96 relative overflow-hidden rounded-lg"
                      onMouseEnter={() => setHoveredImage(`${set}-${img}`)}
                      onMouseLeave={() => setHoveredImage(null)}
                    >
                      {imagesWithVideo.includes(img) && hoveredImage === `${set}-${img}` ? (
                        <video
                          src={`/media/${getVideoName(img)}.mp4`}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          playsInline
                          preload="metadata"
                          onEnded={(e) => e.target.play()} // Loop the video
                        />
                      ) : (
                        <CloudflareImage
                          src={img}
                          alt={`Portfolio ${index + 1}`}
                          width={288}
                          height={384}
                          className="slider-image w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleSlideChange("right")}
            className="slider-button absolute right-2 sm:right-4"
            aria-label="Next slide"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Explore Text */}
        <div className="text-center mt-12">
          <Link href="/portfolio">
            <span className="group inline-flex items-center gap-2 text-gray-400 text-lg tracking-widest hover:text-orange-200 transition-colors cursor-pointer">
              Explore The Portfolio
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {/* AI Playground Section */}
      <div ref={playgroundRef} className="py-24 bg-gradient-to-b from-slate-900 to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-6xl font-light mb-4 text-purple-400 scroll-animate ${playgroundInView ? "fade-in" : ""}`}>
              AI Playground
            </h2>
            <p className={`text-xl text-gray-300 max-w-2xl mx-auto scroll-animate-left ${playgroundInView ? "fade-in" : ""}`} style={{ transitionDelay: '200ms' }}>
              Experience the power of AI firsthand. Interactive demos coming soon!
            </p>
          </div>

          <div className={`bg-gray-800/40 rounded-2xl p-8 shadow-2xl border border-gray-700/50 scroll-animate ${playgroundInView ? "fade-in" : ""}`} style={{ transitionDelay: '400ms' }}>
            {/* Placeholder for Gradio */}
            <div className="bg-gray-900 rounded-xl p-8 mb-8 text-center" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <div className="text-6xl mb-4">🤖</div>
                <h3 className="text-2xl text-white mb-4">AI Demo Coming Soon</h3>
                <p className="text-gray-400 mb-6">We're setting up interactive AI experiences for you to try</p>
                <Link href="/contact">
                  <span className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg cursor-pointer inline-block transition-colors">
                    Get Notified When Live
                  </span>
                </Link>
              </div>
            </div>
            
            {/* Feature Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-full px-6 py-3 text-center text-purple-300">
                🎨 Style Transfer
              </div>
              <div className="bg-pink-500/10 border border-pink-500/30 rounded-full px-6 py-3 text-center text-pink-300">
                ✍️ Text Generation
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-full px-6 py-3 text-center text-blue-300">
                🖼️ Image Analysis
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-full px-6 py-3 text-center text-green-300">
                💬 AI Chat
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tools & Technologies Section */}
      <div className="relative py-16 bg-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-white mb-4">
            Tools & <span className="text-orange-200">Technologies</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of the platforms and tools I work with daily
          </p>
        </div>

        {/* Tech Stack Visualizer - Centered */}
        <div className="flex justify-center mb-16">
          <div className="tech-stack-standalone">
            <div className="tech-stack-content-standalone">
              <div className="tech-orbit-container">
                <div className="orbit-center">
                  <span style={{ fontSize: '3rem' }}>🚀</span>
                </div>
                
                {/* Static positioned icons for better visibility */}
                <div className="tech-icon-wrapper">
                  <div className="tech-icon-item" style={{ top: '20%', left: '15%' }}>
                    <SiDocker className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="tech-icon-item" style={{ top: '20%', right: '15%' }}>
                    <SiGithub className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon-item" style={{ bottom: '20%', left: '15%' }}>
                    <SiPython className="w-8 h-8 text-yellow-400" />
                  </div>
                  <div className="tech-icon-item" style={{ bottom: '20%', right: '15%' }}>
                    <SiApple className="w-8 h-8 text-white" />
                  </div>
                  <div className="tech-icon-item" style={{ top: '50%', left: '5%' }}>
                    <SiGoogle className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="tech-icon-item" style={{ top: '50%', right: '5%' }}>
                    <SiAdobe className="w-8 h-8 text-red-500" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 left-0 right-0 text-center z-20">
                <h3 className="text-2xl font-light mb-2 text-white">Tech Stack</h3>
                <p className="text-gray-400">Full-Stack AI Development</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tools & Technologies Scrolling Icons */}
        <div className="relative overflow-hidden mb-6">
          <div className="flex animate-scroll-left">
            <div className="flex items-center py-5 min-w-max">
              {[
                SiOpenai,
                SiAdobe,
                SiGoogle,
                SiIbm,
                SiMeta,
                SiApple,
                SiReact,
                SiNextdotjs,
                SiTailwindcss,
                SiNodedotjs,
                SiPython,
                SiJavascript,
                SiAmazonaws,
                SiFirebase,
                SiCloudflare,
                SiMongodb,
                SiMysql,
                SiDocker,
                SiGithub,
                SiVisualstudiocode,
                SiInstagram,
                SiMicrosoft,
              ].map((Icon, index) => (
                <Icon
                  key={index}
                  className="text-gray-400 hover:text-orange-200 transition-colors w-8 h-8 mx-6"
                />
              ))}
            </div>
            <div className="flex items-center py-5 min-w-max">
              {[
                SiOpenai,
                SiAdobe,
                SiGoogle,
                SiIbm,
                SiMeta,
                SiApple,
                SiReact,
                SiNextdotjs,
                SiTailwindcss,
                SiNodedotjs,
                SiPython,
                SiJavascript,
                SiAmazonaws,
                SiFirebase,
                SiCloudflare,
                SiMongodb,
                SiMysql,
                SiDocker,
                SiGithub,
                SiVisualstudiocode,
                SiInstagram,
                SiMicrosoft,
              ].map((Icon, index) => (
                <Icon
                  key={index}
                  className="text-gray-400 hover:text-orange-200 transition-colors w-8 h-8 mx-6"
                />
              ))}
            </div>
          </div>
        </div>

        {/* GitHub Activity Ticker - Opposite Direction */}
        <div className="bg-gray-800/40 border-y border-gray-700/50 py-2 overflow-hidden backdrop-blur-sm">
          <div className="flex animate-ticker-reverse">
            <div className="flex items-center whitespace-nowrap px-6">
              <span className="text-green-400 text-xs mr-2">🟢</span>
              <span className="text-gray-300 text-xs mr-8">Latest commit: <strong className="text-white">Added comprehensive AI generation feature with model selection and style transfer capabilities</strong> in portfolio-site repository • 2 hours ago</span>
              <span className="text-orange-200 text-xs mr-2">📊</span>
              <span className="text-gray-300 text-xs mr-8">This week: <strong className="text-white">47 commits</strong> across 5 active repositories including neural-network-experiments and data-visualization-tools</span>
              <span className="text-red-400 text-xs mr-2">🔥</span>
              <span className="text-gray-300 text-xs mr-8">Current development streak: <strong className="text-white">23 consecutive days</strong> of continuous coding and research</span>
              <span className="text-yellow-400 text-xs mr-2">⭐</span>
              <span className="text-gray-300 text-xs mr-8">New stars: <strong className="text-white">+12</strong> on Firewood machine learning framework project this week</span>
              <span className="text-purple-400 text-xs mr-2">🚀</span>
              <span className="text-gray-300 text-xs mr-8">Deployed: <strong className="text-white">3 new AI models</strong> to production environment on AWS infrastructure</span>
              <span className="text-blue-400 text-xs mr-2">💡</span>
              <span className="text-gray-300 text-xs mr-8">Research: Published findings on <strong className="text-white">transformer optimization techniques</strong> improving inference speed by 40%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Stats Section */}
      <div ref={portfolioRef} className="bg-gray-900 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div
            className={`text-center mb-20 scroll-animate ${portfolioInView ? "fade-in" : ""}`}
          >
            <h2 className="text-sm uppercase tracking-widest mb-8 font-light text-gray-300"></h2>

            <div className="space-y-1">
              <h1
                className={`text-7xl font-extralight tracking-wide text-white scroll-animate-left ${portfolioInView ? "fade-in" : ""}`}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  transitionDelay: "200ms",
                }}
              >
                Create
              </h1>
              <h1
                className={`text-7xl font-extralight tracking-wide text-white scroll-animate-right ${portfolioInView ? "fade-in" : ""}`}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  transitionDelay: "300ms",
                }}
              >
                design
              </h1>
              <div
                className={`flex justify-center items-baseline space-x-4 scroll-animate ${portfolioInView ? "fade-in" : ""}`}
                style={{ transitionDelay: "400ms" }}
              >
                <h1
                  className="text-5xl font-extralight text-orange-200/90 tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  develop
                </h1>
              </div>
              <h1
                className={`text-5xl font-extralight text-gray-500/80 tracking-wide scroll-animate ${portfolioInView ? "fade-in" : ""}`}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  transitionDelay: "500ms",
                }}
              >
                DEPLOY
              </h1>
            </div>
          </div>

          {/* Numbers grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 mt-12">
            {[
              { number: "10K", label: "Licensed Image Assets" },
              { number: "15K", label: "AI Generated Images" },
              { number: "100", label: "Commercial Licenses" },
              { number: "18K", label: "Coding Hours" },
              { number: "2M", label: "Creative Words Written" },
              { number: "50K", label: "Photography Collection" },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center scroll-animate ${portfolioInView ? "fade-in" : ""}`}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  transitionDelay: `${(index + 6) * 150}ms`,
                }}
              >
                <div className="text-7xl font-extralight mb-2 tracking-wide text-white">
                  <span
                    style={{ fontFamily: "Arial, sans-serif", fontWeight: 100 }}
                  >
                    {numbers[index]?.toString().replace(/[KM+]/g, "")}
                  </span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {numbers[index]?.toString().match(/[KM+]/g)}
                  </span>
                  <span
                    className="text-orange-200/90"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    +
                  </span>
                </div>
                <div className="text-lg text-gray-400/90 font-light tracking-wide">
                  {item.label}
                </div>
              </div>
            ))}
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
      <Footer />

      <style jsx global>{`
        /* Keep existing styles */
        .section {
            max-width: 1200px;
            margin: 0 auto;
        }

        .section h2 {
            font-size: 3rem;
            font-weight: 300;
            text-align: center;
            margin-bottom: 1rem;
        }

        .subtitle {
            text-align: center;
            color: #94a3b8;
            margin-bottom: 4rem;
            font-size: 1.1rem;
        }

        /* Fix Core Disciplines spacing */
        .bento-3d-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            padding: 0 20px;
            max-width: 1400px;
            margin: 0 auto;
        }

        /* Box Styles from Option 3 */
        .box-3d {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            transform-style: preserve-3d;
            transition: transform 0.6s;
            width: 100%;
            aspect-ratio: 4/3;
        }

        .box-3d:hover {
            transform: rotateY(5deg) rotateX(-5deg) translateZ(10px);
        }

        .box-content {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #1e293b, #334155) !important;
            border: 1px solid rgba(148, 163, 184, 0.3);
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: all 0.3s ease;
            border-radius: 20px;
        }

        .box-3d:hover .box-content {
            background: linear-gradient(135deg, #1e293b, rgba(251, 191, 36, 0.2));
            border-color: rgba(251, 191, 36, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .box-icon {
            font-size: 2.45rem;
            margin-bottom: 1.2rem;
            opacity: 0.8;
            transition: all 0.3s ease;
        }

        .box-3d:hover .box-icon {
            transform: scale(1.15) translateY(-5px);
            opacity: 1;
        }

        .box-title {
            font-size: 1.6rem;
            font-weight: 300;
            margin-bottom: 0.8rem;
            letter-spacing: 0.1em;
            color: white !important;
        }

        .box-preview {
            color: #94a3b8 !important;
            font-size: 0.9rem;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease 0.1s;
            line-height: 1.4;
        }

        .box-3d:hover .box-preview {
            opacity: 1;
            transform: translateY(0);
        }

        .box-overlay {
            position: absolute;
            inset: 0;
            background: rgba(251, 191, 36, 0.1);
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }

        .box-3d:hover .box-overlay {
            opacity: 1;
        }

        /* Bento Size Variations */
        .large {
            grid-column: span 2;
            grid-row: span 2;
        }

        .wide {
            grid-column: span 2;
        }

        .tall {
            grid-row: span 2;
        }

        /* Fixed Tech Stack Styles */
        .tech-stack-content {
            background: linear-gradient(135deg, #0f172a, #1e293b) !important;
            position: relative;
        }

        .tech-orbit-container {
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .orbit-center {
            width: 140px;
            height: 140px;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 60px rgba(251, 191, 36, 0.5);
            z-index: 10;
            position: relative;
        }

        .tech-icon-wrapper {
            position: absolute;
            inset: 0;
            pointer-events: none;
        }

        .tech-icon-item {
            position: absolute;
            width: 60px;
            height: 60px;
            background: rgba(30, 41, 59, 0.95);
            border: 2px solid rgba(148, 163, 184, 0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            animation: float 3s ease-in-out infinite;
            transition: all 0.3s ease;
        }

        .tech-icon-item:nth-child(1) { animation-delay: 0s; }
        .tech-icon-item:nth-child(2) { animation-delay: 0.5s; }
        .tech-icon-item:nth-child(3) { animation-delay: 1s; }
        .tech-icon-item:nth-child(4) { animation-delay: 1.5s; }
        .tech-icon-item:nth-child(5) { animation-delay: 2s; }
        .tech-icon-item:nth-child(6) { animation-delay: 2.5s; }

        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .tech-stack-box:hover .tech-icon-item {
            transform: scale(1.1);
            border-color: rgba(251, 191, 36, 0.5);
            background: rgba(30, 41, 59, 1);
        }

        /* Better GitHub Ticker */
        .github-ticker {
            background: rgba(30, 41, 59, 0.8);
            border-top: 1px solid rgba(251, 191, 36, 0.2);
            border-bottom: 1px solid rgba(251, 191, 36, 0.2);
            padding: 12px 0;
            backdrop-filter: blur(10px);
        }

        /* GitHub Ticker Animation */
        @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .animate-ticker {
            animation: ticker 30s linear infinite;
        }

        .animate-ticker-reverse {
            animation: ticker-reverse 30s linear infinite;
        }

        .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
        }

        @keyframes ticker-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
        }

        @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        
        /* Portfolio Slider Auto-scroll Animation */
        .animate-slider-scroll {
            animation: scroll-left 90s linear infinite;
        }
        
        .animate-slider-scroll:hover {
            animation-play-state: paused;
        }

        /* Standalone Tech Stack Styles */
        .tech-stack-standalone {
            width: 400px;
            height: 400px;
            position: relative;
            border-radius: 20px;
            overflow: hidden;
        }

        .tech-stack-content-standalone {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, #0f172a, #1e293b) !important;
            border: 1px solid rgba(148, 163, 184, 0.1);
            border-radius: 20px;
            padding: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            transition: all 0.3s ease;
        }

        .tech-stack-standalone:hover .tech-stack-content-standalone {
            background: linear-gradient(135deg, #1e293b, rgba(251, 191, 36, 0.2)) !important;
            border-color: rgba(251, 191, 36, 0.3);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        /* Scroll Animation Classes */
        .scroll-animate {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scroll-animate-left {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scroll-animate-right {
            opacity: 0;
            transform: translateX(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scroll-animate.fade-in,
        .scroll-animate-left.fade-in,
        .scroll-animate-right.fade-in {
            opacity: 1;
            transform: translateY(0) translateX(0);
        }

        /* Responsive */
        @media (max-width: 1200px) {
            .bento-3d-grid {
                max-width: 1200px;
                gap: 20px;
            }
        }

        @media (max-width: 1024px) {
            .bento-3d-grid {
                grid-template-columns: repeat(2, 1fr);
                max-width: 900px;
                gap: 20px;
                padding: 0 16px;
            }
            
            .tech-icon-item {
                width: 50px;
                height: 50px;
            }
            
            .orbit-center {
                width: 100px;
                height: 100px;
            }

            .tech-stack-standalone {
                width: 300px;
                height: 300px;
            }
        }

        @media (max-width: 640px) {
            .bento-3d-grid {
                grid-template-columns: 1fr;
                max-width: 100%;
                gap: 16px;
                padding: 0 12px;
            }
            
            .box-3d {
                aspect-ratio: 16/9;
            }
            
            .large, .wide, .tall {
                grid-column: span 1;
                grid-row: span 1;
            }
            
            .tech-icon-item {
                width: 45px;
                height: 45px;
            }
            
            .orbit-center {
                width: 90px;
                height: 90px;
            }

            .tech-stack-standalone {
                width: 280px;
                height: 280px;
            }
        }
      `}</style>

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

        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;