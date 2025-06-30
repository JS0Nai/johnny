import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import { SiGithub } from "react-icons/si";

function ProjectsPage() {
  const router = useRouter();

  // State declarations
  const [showHeader, setShowHeader] = useState(false);
  const [showSubheader, setShowSubheader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("projects");
  const [showImage, setShowImage] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.2 });
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
      setTimeout(() => setShowHeader(true), 1000),
      setTimeout(() => setShowSubheader(true), 1500),
    ];
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const projects = [
    {
      id: 1,
      title: "Intelligent Document Ecosystem (IDE)",
      category: "ai",
      status: "Active",
      year: "2025",
      description:
        "A suite of interconnected projects forming the Intelligent Document Ecosystem. Core objective is to professionalize and expand document processing, analysis, and information retrieval using advanced AI, particularly Large Language Models (LLMs), and robust data management.",
      technologies: ["Python", "LLMs", "Data Engineering", "AI/ML"],
      features: [
        "Structured metadata extraction",
        "Intelligent data filtering",
        "Robust LLM integration",
        "Complex document understanding",
      ],
      image: "/assets/images/project-ide.png",
      link: "https://github.com/JS0Nai/EDS-3",
      github: "/contact",
    },
    {
      id: 2,
      title: "Firewood",
      category: "ai",
      status: "Completed",
      year: "2025",
      description:
        "Professional Chat & Document Processing Toolkit. A comprehensive, production-ready toolkit for processing chat logs and unstructured documents with AI-powered analysis, topic extraction, and intelligent cleaning.",
      technologies: [
        "Python",
        "OpenAI GPT",
        "Google Gemini",
        "Parallel Processing",
      ],
      features: [
        "Multi-format parsing (ChatGPT, Claude, Codex)",
        "Hybrid regex + LLM cleaning approaches",
        "AI-powered analysis and topic extraction",
        "Massively parallel processing with intelligent batching",
      ],
      image: "/assets/images/project-firewood.png",
      link: "https://github.com/JS0Nai/firewood",
      github: "/contact",
    },
    {
      id: 3,
      title: "tXt-ray",
      category: "development",
      status: "Completed",
      year: "2025",
      description:
        "A powerful browser-based text comparison tool with Git-like features, inline comments, blame view, and advanced search capabilities.",
      technologies: [
        "JavaScript",
        "Browser-based",
        "Git Integration",
        "Web Tools",
      ],
      features: [
        "Multiple view modes (Git Unified, Overlay, Side-by-Side)",
        "Word-level diff detection",
        "Smart chunking with context",
        "Comprehensive export options (.patch, text files)",
      ],
      image: "/assets/images/project-txt-ray.png",
      link: "https://github.com/JS0Nai/tXt-ray",
      github: "/contact",
    },
    {
      id: 4,
      title: "Dupstep",
      category: "ai",
      status: "Completed",
      year: "2025",
      description:
        "Document Duplicate Detection Tool. A powerful Python tool that analyzes documents to find and report duplicate content using multiple detection methods including exact matching, fuzzy matching, and AI-powered semantic similarity.",
      technologies: ["Python", "FuzzyWuzzy", "Sentence-BERT", "AI Embeddings"],
      features: [
        "Multiple detection methods (exact, fuzzy, semantic)",
        "Beautiful HTML reports with color-coding",
        "Comprehensive export options (CSV, Excel, JSON)",
        "AI-powered semantic similarity using embeddings",
      ],
      image: "/assets/images/project-dupstep.png",
      link: "https://github.com/JS0Nai/dupstep",
      github: "/contact",
    },
    {
      id: 5,
      title: "Seymour",
      category: "creative",
      status: "Completed",
      year: "2025",
      description:
        "Novel computer vision project that monitors food bowl volume via Reolink E1 Pro camera and controls media playbook based on eating behavior. Uses icon-based volume estimation and archives data for analysis.",
      technologies: [
        "Python",
        "YOLOv8",
        "Computer Vision",
        "RTSP",
        "LLM Integration",
      ],
      features: [
        "Icon-based volume detection using Computer Vision",
        "Automatic media playback control via webhooks",
        "Conditional LLM anomaly detection",
        "YOLOv8 segmentation model with training toolkit",
      ],
      image: "/assets/images/project-seymour.png",
      link: "https://github.com/JS0Nai/seymr",
      github: "/contact",
    },
    {
      id: 6,
      title: "LLM Whisperer",
      category: "ai",
      status: "Completed",
      year: "2024",
      description:
        "PDF Processing Pipeline. A robust PDF processing pipeline using LLMWhisperer for high-quality text extraction with layout preservation.",
      technologies: ["Python", "LLMWhisperer API", "PDF Processing"],
      features: [
        "High-quality PDF text extraction",
        "Layout preservation",
        "Robust processing pipeline",
        "API integration",
      ],
      image: "/assets/images/project-llm-whisperer.png",
      link: "https://github.com/JS0Nai/llmwhisperer-project",
      github: "/contact",
    },
    {
      id: 7,
      title: "Repo-rt",
      category: "ai",
      status: "Completed",
      year: "2024",
      description:
        "Transform your code repositories into actionable insights for both human understanding and advanced AI analysis. A powerful Python-based toolkit designed to scan local repositories or directories.",
      technologies: [
        "Python",
        "Repository Analysis",
        "AI Integration",
        "HTML/JSON",
      ],
      features: [
        "Comprehensive artifact generation",
        "Intelligent content prioritization",
        "Interactive HTML for human browsing",
        "Structured data optimized for AI",
      ],
      image: "/assets/images/project-repo-rt.png",
      link: "https://github.com/JS0Nai/repo-rt",
      github: "/contact",
    },
    {
      id: 8,
      title: "Tuner",
      category: "ai",
      status: "Completed",
      year: "2024",
      description:
        "A comprehensive pipeline for preparing, cleaning, and optimizing content for fine-tuning language models on your writing style and tone. Takes content from various sources and processes it through several stages.",
      technologies: [
        "Python",
        "OpenAI API",
        "Content Processing",
        "ML Pipeline",
      ],
      features: [
        "Content extraction from multiple sources",
        "Text cleaning and preprocessing",
        "AI-driven command extraction/refinement",
        "Dataset creation for various training frameworks",
      ],
      image: "/assets/images/project-tuner.png",
      link: "https://github.com/JS0Nai/Tuner",
      github: "/contact",
    },
    {
      id: 9,
      title: "School Safety Dashboard",
      category: "education",
      status: "In Progress",
      year: "2024",
      description:
        "A comprehensive safety monitoring and compliance system for educational institutions with real-time reporting and incident management.",
      technologies: ["React", "Node.js", "MongoDB", "Firebase"],
      features: [
        "Real-time safety monitoring",
        "Incident reporting system",
        "Compliance tracking",
        "Parent/guardian notifications",
      ],
      image: "/assets/images/project-school-safety.png",
      link: null,
      github: "/contact",
    },
    {
      id: 10,
      title: "Digital Asset Management",
      category: "creative",
      status: "Completed",
      year: "2023",
      description:
        "A comprehensive digital asset management system for creative teams with AI-powered tagging and search capabilities.",
      technologies: ["React", "Express.js", "MongoDB", "AWS S3"],
      features: [
        "AI-powered auto-tagging",
        "Advanced search and filtering",
        "Version control system",
        "Team collaboration tools",
      ],
      image: "/assets/images/project-asset-management.png",
      link: null,
      github: "/contact",
    },
    {
      id: 11,
      title: "Government AI Ethics Framework",
      category: "government",
      status: "Completed",
      year: "2023",
      description:
        "A framework for implementing ethical AI practices in government organizations, focusing on transparency and accountability.",
      technologies: ["Python", "TensorFlow", "Docker", "Kubernetes"],
      features: [
        "AI bias detection algorithms",
        "Compliance reporting tools",
        "Decision transparency logs",
        "Public API for transparency",
      ],
      image: "/assets/images/project-govt-ethics.png",
      link: null,
      github: "/contact",
    },
    {
      id: 12,
      title: "Pubwish",
      category: "creative",
      status: "Completed",
      year: "2019",
      description:
        "A writing platform app that helps writers track progress, collaborate, and improve their writing habits through gamification and social interaction. The app combines powerful writing tools with social features and challenges to encourage consistent writing habits.",
      technologies: ["iOS", "Swift", "Xcode", "CocoaPods"],
      features: [
        "Authentication with multiple social login options",
        "Document editing and writing management",
        "Writing challenges and competitions",
        "Social features (friends, chat, groups)",
      ],
      image: "/assets/images/project-pubwish.png",
      link: null,
      github: "/contact",
    },
  ];

  // Filter projects by category
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Newsletter subscription
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
        className="flex justify-center items-center pt-32 pb-16"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1
            className={`text-7xl md:text-8xl font-bold bg-gradient-to-b from-gray-600 to-transparent bg-clip-text text-transparent tracking-tighter mb-6 scroll-animate ${heroInView ? "fade-in" : ""}`}
          >
            PROJECTS
          </h1>

          <h2
            className={`text-white text-xl md:text-2xl font-light mb-8 leading-relaxed max-w-3xl mx-auto scroll-animate-left ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            Innovative solutions at the intersection of AI, security, and
            creative technology
          </h2>

          <div
            className={`flex flex-wrap justify-center gap-3 mt-12 scroll-animate ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "all" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              All Projects
            </button>
            <button
              onClick={() => handleCategoryChange("ai")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "ai" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              AI Solutions
            </button>
            <button
              onClick={() => handleCategoryChange("education")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "education" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Education
            </button>
            <button
              onClick={() => handleCategoryChange("government")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "government" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Government
            </button>
            <button
              onClick={() => handleCategoryChange("security")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "security" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Security
            </button>
            <button
              onClick={() => handleCategoryChange("creative")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "creative" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Creative
            </button>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div ref={projectsRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`bg-gray-800/40 rounded-lg overflow-hidden shadow-lg scroll-animate ${projectsInView ? "fade-in" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-medium text-white">
                          {project.title}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            project.status === "Completed"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-orange-500/20 text-orange-400"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="text-orange-200/80 text-sm mb-4">
                        {project.year}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <div className="w-1.5 h-1.5 bg-orange-200 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-400 text-sm">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-white font-medium mb-3">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs px-3 py-1 bg-gray-700/50 text-orange-200 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-orange-200 hover:text-white transition-colors"
                      >
                        <span>View Project</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-gray-500">
                        <span>Private Project</span>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </span>
                    )}
                    <Link href={project.github}>
                      <span className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                        <SiGithub className="w-4 h-4" />
                        <span>Code</span>
                      </span>
                    </Link>
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
                <a
                  href="tel:054-376-2321"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  054 376 2321
                </a>
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

export default ProjectsPage;
