import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuantumBackground from "../components/QuantumBackground";
import { menuItems } from "../config/menuItems";


function ArticlesPage() {
  const router = useRouter();

  // State declarations
  const [showHeader, setShowHeader] = useState(false);
  const [showSubheader, setShowSubheader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("articles");
  const [showImage, setShowImage] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [articlesRef, articlesInView] = useInView({ threshold: 0, triggerOnce: true });
  const [newsletterRef, newsletterInView] = useInView({ threshold: 0.2, triggerOnce: true });


  useEffect(() => {
    // Only run animation timers once when component mounts
    if (!showHeader && !showSubheader && !showImage) {
      const timers = [
        setTimeout(() => setShowImage(true), 500),
        setTimeout(() => setShowHeader(true), 1000),
        setTimeout(() => setShowSubheader(true), 1500),
      ];
      return () => timers.forEach((timer) => clearTimeout(timer));
    }
  }, []);

  const articles = [
    {
      id: 1,
      title: "The Future of AI in Creative Industries",
      category: "ai",
      date: "March 15, 2024",
      readTime: "8 min read",
      excerpt:
        "Exploring how artificial intelligence is transforming creative workflows and opening new possibilities for artists and designers worldwide.",
      content:
        "As AI technologies continue to evolve, creative professionals are discovering innovative ways to integrate these tools into their workflows...",
      tags: ["AI", "Creative", "Technology", "Future"],
      image: "/assets/images/article-ai-creative.png",
      featured: true,
    },
    {
      id: 2,
      title: "Building Secure AI Systems for Education",
      category: "security",
      date: "February 28, 2024",
      readTime: "12 min read",
      excerpt:
        "A comprehensive guide to implementing AI systems in educational environments while maintaining student privacy and data security.",
      content:
        "Educational institutions are increasingly adopting AI technologies, but security and privacy concerns remain paramount...",
      tags: ["Security", "Education", "AI", "Privacy"],
      image: "/assets/images/article-secure-ai.png",
      featured: false,
    },
    {
      id: 3,
      title: "Government AI Ethics: A Framework for Responsible Implementation",
      category: "ethics",
      date: "February 10, 2024",
      readTime: "15 min read",
      excerpt:
        "Understanding the ethical considerations and frameworks needed for responsible AI deployment in government organizations.",
      content:
        "Government agencies worldwide are grappling with the ethical implications of AI implementation...",
      tags: ["Ethics", "Government", "AI", "Policy"],
      image: "/assets/images/article-govt-ethics.png",
      featured: true,
    },
    {
      id: 4,
      title: "Optimizing Creative Workflows with Automation",
      category: "productivity",
      date: "January 22, 2024",
      readTime: "10 min read",
      excerpt:
        "How to streamline creative processes using automation tools and AI-powered solutions for maximum efficiency.",
      content:
        "Creative professionals often find themselves bogged down by repetitive tasks that could be automated...",
      tags: ["Automation", "Productivity", "Creative", "Workflow"],
      image: "/assets/images/article-automation.png",
      featured: false,
    },
    {
      id: 5,
      title: "The Psychology of Human-AI Collaboration",
      category: "research",
      date: "January 8, 2024",
      readTime: "14 min read",
      excerpt:
        "Examining the psychological aspects of working alongside AI systems and how to build effective human-AI partnerships.",
      content:
        "As AI becomes more prevalent in the workplace, understanding the psychological dynamics of human-AI collaboration becomes crucial...",
      tags: ["Psychology", "Collaboration", "AI", "Research"],
      image: "/assets/images/article-psychology.png",
      featured: false,
    },
    {
      id: 6,
      title: "Next.js and AI: Building Intelligent Web Applications",
      category: "development",
      date: "December 18, 2023",
      readTime: "11 min read",
      excerpt:
        "A technical deep-dive into integrating AI capabilities into Next.js applications for enhanced user experiences.",
      content:
        "Next.js provides an excellent foundation for building AI-powered web applications...",
      tags: ["Next.js", "Development", "AI", "Web"],
      image: "/assets/images/article-nextjs-ai.png",
      featured: false,
    },
  ];

  // Filter articles by category
  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/newsletter`, {
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
      <QuantumBackground />
      {/* Header */}
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        menuItems={menuItems}
      />

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="flex justify-center items-center pt-32 pb-16"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1
            className={`text-7xl md:text-8xl font-bold bg-gradient-to-b from-gray-600 to-transparent bg-clip-text text-transparent tracking-tighter mb-6 scroll-animate ${heroInView ? "fade-in" : ""}`}
          >
            ARTICLES
          </h1>

          <h2
            className={`text-white text-xl md:text-2xl font-light mb-8 leading-relaxed max-w-3xl mx-auto scroll-animate-left ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            Insights, tutorials, and thoughts on AI, technology, and creative
            development
          </h2>

          <div
            className={`flex flex-wrap justify-center gap-3 mt-12 scroll-animate ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "all" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              All Articles
            </button>
            <button
              onClick={() => handleCategoryChange("ai")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "ai" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              AI & Technology
            </button>
            <button
              onClick={() => handleCategoryChange("security")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "security" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Security
            </button>
            <button
              onClick={() => handleCategoryChange("ethics")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "ethics" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Ethics
            </button>
            <button
              onClick={() => handleCategoryChange("development")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "development" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Development
            </button>
          </div>
        </div>
      </div>

      {/* Featured Articles Section */}
      <div ref={articlesRef} className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-4xl font-extralight mb-12 tracking-wide text-white text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Featured <span className="text-orange-200/90">Articles</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {articles
              .filter((article) => article.featured)
              .map((article, index) => (
                <div
                  key={article.id}
                  className="bg-gray-800/40 rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-orange-200/20 text-orange-200 text-xs rounded-full">
                        FEATURED
                      </span>
                      <span className="text-gray-400 text-sm">
                        {article.date}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium text-white mb-4 hover:text-orange-200 transition-colors cursor-pointer">
                      {article.title}
                    </h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {article.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`#article-${article.id}`}
                      className="inline-flex items-center gap-2 text-orange-200 hover:text-white transition-colors"
                    >
                      <span>Read Article</span>
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
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* All Articles Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-4xl font-extralight mb-12 tracking-wide text-white text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            All <span className="text-orange-200/90">Articles</span>
          </h2>

          <div className="space-y-8">
            {filteredArticles.map((article, index) => (
              <div
                key={article.id}
                className="bg-gray-800/40 rounded-lg p-8"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          article.featured
                            ? "bg-orange-200/20 text-orange-200"
                            : "bg-gray-700/50 text-gray-300"
                        }`}
                      >
                        {article.category.toUpperCase()}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {article.date}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 text-sm">
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium text-white mb-4 hover:text-orange-200 transition-colors cursor-pointer">
                      {article.title}
                    </h3>

                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {article.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`#article-${article.id}`}
                      className="inline-flex items-center gap-2 text-orange-200 hover:text-white transition-colors"
                    >
                      <span>Read Article</span>
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
                    </a>
                  </div>
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
      `}</style>
    </div>
  );
}

export default ArticlesPage;
