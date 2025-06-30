import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import { TbBrain, TbServer } from "react-icons/tb";
import CloudflareImage from "../components/CloudflareImage";
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

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2 });
  const [portfolioRef, portfolioInView] = useInView({ threshold: 0.2 });
  const [newsletterRef, newsletterInView] = useInView({ threshold: 0.2 });

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

  useEffect(() => {
    if (portfolioInView) {
      const duration = 2000;
      const steps = 50;
      const interval = duration / steps;
      const targetNumbers = [10000, 13000, 100, 10000, 1000000, 50000];

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
    "artdoll",
    "redmoonwitch",
    "dolly01",
    "artgirl",
    "artgirl2",
    "oceanwitch",
  ];

  const handleSlideChange = (direction) => {
    const slider = document.querySelector(".image-slider-left");
    const scrollAmount = direction === "left" ? -288 : 288;

    if (slider) {
      // Pause the animation when manually scrolling
      slider.style.animationPlayState = "paused";

      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const newScrollPosition = slider.scrollLeft + scrollAmount;

      if (newScrollPosition >= 0 && newScrollPosition <= maxScroll) {
        slider.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      } else {
        // If we're at the end, loop back to start
        slider.scrollTo({
          left: direction === "left" ? maxScroll : 0,
          behavior: "smooth",
        });
      }

      // Resume animation after scrolling
      setTimeout(() => {
        slider.style.animationPlayState = "running";
      }, 1000);
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
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div>
          <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm">
            <div className="mx-auto max-w-screen-xl w-full px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-20">
                <Link href="/">
                  <div className="cursor-pointer">
                    <CloudflareImage
                      src="icogo150"
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

      {/* Signature Image Section */}
      <div>
        <div className="flex justify-center items-center pt-24 pb-8">
          <div className="relative w-full max-w-2xl mx-auto px-4">
            <CloudflareImage
              src="jli-signature1000"
              alt="JLi Signature"
              width={1200}
              height={1000}
              className={`w-full h-auto object-contain max-w-lg mx-auto
                opacity-0 transition-opacity duration-1000
                ${showImage ? "opacity-80" : "opacity-0"}
                sm:w-4/5 md:w-3/4 lg:w-2/3`}
            />
          </div>
        </div>

        {/* Hero Section */}
        <div
          ref={heroRef}
          className="flex items-center justify-center p-4 w-full overflow-hidden"
        >
          <div className="w-full max-w-[95vw] lg:max-w-[2000px] mx-auto text-center relative">
            {/* Welcome and Portfolio Text */}
            <div
              className={`relative mb-16 scroll-animate ${heroInView ? "fade-in" : ""}`}
            >
              <div className="text-6xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] font-bold bg-gradient-to-b from-gray-600 to-transparent bg-clip-text text-transparent tracking-tighter px-4 leading-tight">
                PORTFOLIO
              </div>
              <div className="absolute bottom-2 left-0 right-0 text-gray-400 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl tracking-widest">
                John Li
              </div>
            </div>

            {/* Tagline Section */}
            <div className="mt-24">
              <h1
                className={`text-white text-4xl font-light mb-8 leading-relaxed scroll-animate-left ${heroInView ? "fade-in" : ""}`}
                style={{ transitionDelay: "200ms" }}
              >
                Creative freedom and the pursuit of improving how things work
              </h1>
              <p
                className={`text-gray-400 text-lg scroll-animate-right ${heroInView ? "fade-in" : ""}`}
                style={{ transitionDelay: "400ms" }}
              >
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Showcase Section */}
      <div className="relative bg-gray-900 py-24 overflow-hidden">
        <div className="text-center mb-16">
          <h2
            className="text-7xl font-extralight mb-4 tracking-wide text-white dark:text-gray-200 font-garamond"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="text-orange-200/90">AI</span>{" "}
            <span className="text-white">Image Generations</span>
          </h2>
        </div>

        {/* Top Slider */}
        <div className="relative overflow-hidden mb-8 py-4">
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
            <div className="flex">
              {[1, 2].map((set) => (
                <div key={set} className="flex gap-4 flex-nowrap">
                  {topSliderImages.map((img, index) => (
                    <div
                      key={`${set}-${index}`}
                      className="flex-none w-72 h-96"
                    >
                      <CloudflareImage
                        src={img}
                        alt={`Portfolio ${index + 1}`}
                        width={288}
                        height={384}
                        className="slider-image w-full h-full object-cover rounded-lg"
                      />
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
            <span className="group inline-flex items-center gap-2 text-gray-400 text-sm tracking-widest hover:text-orange-200 transition-colors cursor-pointer">
              Explore The Portfolio
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
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

      {/* Tools & Technologies Banner */}
      <div className="relative py-16 bg-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light text-white mb-4">
            Tools & <span className="text-orange-200">Technologies</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of the platforms and tools I work with daily
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-left">
            <div className="flex items-center py-4 min-w-max">
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
            <div className="flex items-center py-4 min-w-max">
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
                  key={`dup-${index}`}
                  className="text-gray-400 hover:text-orange-200 transition-colors w-8 h-8 mx-6"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom banner - scrolling right */}
      <div className="relative mt-2">
        <div
          className="relative transform -rotate-6 bg-orange-200 -mx-8"
          style={{
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          <div className="flex whitespace-nowrap animate-scroll-right">
            <div className="flex items-center text-gray-900 text-2xl md:text-3xl font-semibold py-4">
              {[1, 2, 3].map((i) => (
                <span key={i} className="flex items-center">
                  {"Generative AI * Custom Coding * Research * DevOps"
                    .split("*")
                    .map((text, index) => (
                      <span key={index} className="flex items-center">
                        <span>{text}</span>
                        <span className="text-orange-300 mx-3 transform rotate-45 font-regular">
                          ✱
                        </span>
                      </span>
                    ))}
                </span>
              ))}
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
              { number: "13K", label: "AI Generated Images" },
              { number: "100", label: "Commercial Licenses" },
              { number: "10K", label: "Coding Hours" },
              { number: "1M", label: "Words Written" },
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
                  href="mailto:hi@johnny.ae"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  hi@johnny.ae
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
