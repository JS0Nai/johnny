import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import Header from "../components/Header";
import { menuItems } from "../config/menuItems";


function ResearchPage() {
  const router = useRouter();

  // State declarations
  const [showHeader, setShowHeader] = useState(false);
  const [showSubheader, setShowSubheader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("research");
  const [showImage, setShowImage] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [researchRef, researchInView] = useInView({ threshold: 0, triggerOnce: true });
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

  const researchProjects = [
    {
      id: 1,
      title: "Neural Network Optimization for Edge Computing",
      category: "machine-learning",
      date: "March 20, 2024",
      status: "In Progress",
      excerpt:
        "Investigating novel approaches to optimize neural network architectures for deployment on resource-constrained edge devices while maintaining accuracy.",
      methodology:
        "Using quantization techniques, pruning algorithms, and knowledge distillation to reduce model complexity while preserving performance metrics...",
      tags: ["Neural Networks", "Edge Computing", "Optimization", "Mobile AI"],
      institution: "Stanford AI Lab",
      featured: true,
    },
    {
      id: 2,
      title: "Privacy-Preserving Machine Learning in Healthcare",
      category: "privacy",
      date: "February 15, 2024",
      status: "Published",
      excerpt:
        "Developing federated learning frameworks that enable collaborative healthcare research while protecting patient privacy and complying with HIPAA regulations.",
      methodology:
        "Implementing differential privacy mechanisms and secure multi-party computation protocols to enable privacy-preserving collaborative learning...",
      tags: ["Privacy", "Healthcare", "Federated Learning", "HIPAA"],
      institution: "MIT CSAIL",
      featured: true,
    },
    {
      id: 3,
      title: "Explainable AI for Government Decision Making",
      category: "explainability",
      date: "January 28, 2024",
      status: "Under Review",
      excerpt:
        "Creating interpretable machine learning models for government policy recommendations with transparent decision pathways and audit trails.",
      methodology:
        "Developing SHAP-based explanation frameworks and causal inference models to provide clear justifications for AI-driven policy recommendations...",
      tags: ["Explainable AI", "Government", "Policy", "Transparency"],
      institution: "Carnegie Mellon University",
      featured: false,
    },
    {
      id: 4,
      title: "Adversarial Robustness in Computer Vision Systems",
      category: "security",
      date: "January 10, 2024",
      status: "Complete",
      excerpt:
        "Analyzing vulnerabilities in computer vision models to adversarial attacks and developing defensive mechanisms for critical infrastructure applications.",
      methodology:
        "Employing adversarial training techniques, certified defenses, and ensemble methods to improve model robustness against targeted attacks...",
      tags: ["Adversarial AI", "Computer Vision", "Security", "Robustness"],
      institution: "UC Berkeley",
      featured: false,
    },
    {
      id: 5,
      title: "Natural Language Processing for Legal Document Analysis",
      category: "nlp",
      date: "December 18, 2023",
      status: "Published",
      excerpt:
        "Developing specialized NLP models for automated legal document review, contract analysis, and regulatory compliance checking.",
      methodology:
        "Training domain-specific transformer models on legal corpora with fine-tuning for contract clause extraction and compliance verification...",
      tags: ["NLP", "Legal Tech", "Document Analysis", "Compliance"],
      institution: "Harvard Law School",
      featured: true,
    },
    {
      id: 6,
      title: "Quantum-Classical Hybrid Algorithms for Optimization",
      category: "quantum",
      date: "November 30, 2023",
      status: "In Progress",
      excerpt:
        "Exploring hybrid quantum-classical approaches to solve complex optimization problems in logistics and supply chain management.",
      methodology:
        "Implementing variational quantum eigensolveranalysis and quantum approximate optimization algorithms (QAOA) for combinatorial optimization...",
      tags: ["Quantum Computing", "Optimization", "Hybrid Algorithms", "Logistics"],
      institution: "IBM Quantum Research",
      featured: false,
    },
  ];

  const categories = [
    { id: "all", label: "All Research", count: researchProjects.length },
    { id: "machine-learning", label: "Machine Learning", count: researchProjects.filter(p => p.category === "machine-learning").length },
    { id: "privacy", label: "Privacy & Security", count: researchProjects.filter(p => p.category === "privacy" || p.category === "security").length },
    { id: "explainability", label: "Explainable AI", count: researchProjects.filter(p => p.category === "explainability").length },
    { id: "nlp", label: "Natural Language", count: researchProjects.filter(p => p.category === "nlp").length },
    { id: "quantum", label: "Quantum Computing", count: researchProjects.filter(p => p.category === "quantum").length },
  ];

  const filteredProjects = selectedCategory === "all" 
    ? researchProjects 
    : researchProjects.filter(project => 
        project.category === selectedCategory || 
        (selectedCategory === "privacy" && (project.category === "privacy" || project.category === "security"))
      );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 relative w-full overflow-x-hidden">
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
            RESEARCH
          </h1>

          <h2
            className={`text-2xl md:text-3xl font-extralight mb-8 text-gray-300 scroll-animate ${heroInView ? "fade-in" : ""}`}
            style={{ fontFamily: "'Cormorant Garamond', serif", transitionDelay: "400ms" }}
          >
            Advancing the frontiers of <span className="text-orange-200/90">artificial intelligence</span> through rigorous scientific inquiry
          </h2>

          {/* Category Filter */}
          <div className={`flex flex-wrap gap-3 justify-center scroll-animate ${heroInView ? "fade-in" : ""}`} style={{ transitionDelay: "600ms" }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm ${selectedCategory === category.id ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Research Section */}
      <div ref={researchRef} className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-4xl font-extralight mb-12 tracking-wide text-white text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Featured <span className="text-orange-200/90">Research</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {filteredProjects
              .filter((project) => project.featured)
              .map((project, index) => (
                <div
                  key={project.id}
                  className="bg-gray-800/40 rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-orange-200/20 text-orange-200 text-xs rounded-full">
                        FEATURED
                      </span>
                      <span className="text-gray-400 text-sm">
                        {project.date}
                      </span>
                      <span className="text-gray-500">•</span>
                      <span className={`text-sm px-2 py-1 rounded-full text-xs ${
                        project.status === "Published" ? "bg-green-500/20 text-green-300" :
                        project.status === "In Progress" ? "bg-yellow-500/20 text-yellow-300" :
                        project.status === "Under Review" ? "bg-blue-500/20 text-blue-300" :
                        "bg-purple-500/20 text-purple-300"
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-medium text-white mb-4 hover:text-orange-200 transition-colors cursor-pointer">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.excerpt}
                    </p>

                    <div className="text-sm text-gray-400 mb-6">
                      <span className="font-medium text-orange-200">Institution:</span> {project.institution}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`#research-${project.id}`}
                      className="inline-flex items-center gap-2 text-orange-200 hover:text-white transition-colors"
                    >
                      <span>View Research</span>
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

      {/* All Research Projects Section */}
      <div className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-4xl font-extralight mb-12 tracking-wide text-white text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            All Research <span className="text-orange-200/90">Projects</span>
          </h2>

          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="bg-gray-800/20 border border-gray-700/30 rounded-lg p-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-gray-400 text-sm">
                        {project.date}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded-full text-xs ${
                        project.status === "Published" ? "bg-green-500/20 text-green-300" :
                        project.status === "In Progress" ? "bg-yellow-500/20 text-yellow-300" :
                        project.status === "Under Review" ? "bg-blue-500/20 text-blue-300" :
                        "bg-purple-500/20 text-purple-300"
                      }`}>
                        {project.status}
                      </span>
                      {project.featured && (
                        <span className="px-2 py-1 bg-orange-200/20 text-orange-200 text-xs rounded-full">
                          FEATURED
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl font-medium text-white mb-4 hover:text-orange-200 transition-colors cursor-pointer">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.excerpt}
                    </p>

                    <div className="text-sm text-gray-400 mb-4">
                      <span className="font-medium text-orange-200">Institution:</span> {project.institution}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-48 flex lg:flex-col gap-3">
                    <a
                      href={`#research-${project.id}`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-orange-200/10 text-orange-200 rounded-lg hover:bg-orange-200/20 transition-colors text-sm"
                    >
                      <span>View Details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
      <div ref={newsletterRef} className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className={`text-4xl font-extralight mb-6 tracking-wide text-white scroll-animate ${newsletterInView ? "fade-in" : ""}`}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Stay Updated on <span className="text-orange-200/90">Research</span>
          </h2>

          <p
            className={`text-xl text-gray-300 mb-8 scroll-animate ${newsletterInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            Get notified about new research publications, findings, and updates from the lab.
          </p>

          <form
            onSubmit={handleNewsletterSubmit}
            className={`flex flex-col sm:flex-row gap-4 max-w-md mx-auto scroll-animate ${newsletterInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-200"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-orange-200 text-gray-900 rounded-lg font-medium hover:bg-orange-100 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {submitStatus === "success" && (
            <p className="mt-4 text-green-400">
              Thank you for subscribing to research updates!
            </p>
          )}
          {submitStatus === "error" && (
            <p className="mt-4 text-red-400">
              There was an error subscribing. Please try again.
            </p>
          )}
        </div>
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

      {/* Global Styles */}
      <style jsx global>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.3s ease-out;
        }

        .scroll-animate.fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default ResearchPage;