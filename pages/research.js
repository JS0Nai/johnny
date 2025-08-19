import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
      id: 10,
      title: "Behavioral Computer Vision for Child Health Monitoring",
      category: "machine-learning",
      date: "2024",
      status: "Patent Pending",
      excerpt:
        "An innovative, non-intrusive system to monitor children's eating behavior and automatically manage screen time based on nutritional engagement.",
      methodology:
        "This project leverages marker-based computer vision and advanced AI analysis to achieve high-accuracy behavioral monitoring without requiring complex food recognition. The system was developed using a novel synthetic data generation approach, ensuring robust performance in real-world scenarios.",
      tags: ["Computer Vision", "Behavioral AI", "Child Health", "Patent Pending"],
      institution: "Personal R&D Project",
      featured: true,
    },
    {
      id: 11,
      title: "Neural Network Optimization for Edge Computing",
      category: "machine-learning",
      date: "March 20, 2024",
      status: "In Progress",
      excerpt:
        "Investigating novel approaches to optimize neural network architectures for deployment on resource-constrained edge devices while maintaining accuracy.",
      methodology:
        "Using quantization techniques, pruning algorithms, and knowledge distillation to reduce model complexity while preserving performance metrics...",
      tags: ["Neural Networks", "Edge Computing", "Optimization", "Mobile AI"],
      institution: "Personal R&D Project",
      featured: false,
    },
    {
      id: 12,
      title: "Privacy-Preserving Machine Learning in Healthcare",
      category: "privacy",
      date: "February 15, 2024",
      status: "Published",
      excerpt:
        "Developing federated learning frameworks that enable collaborative healthcare research while protecting patient privacy and complying with HIPAA regulations.",
      methodology:
        "Implementing differential privacy mechanisms and secure multi-party computation protocols to enable privacy-preserving collaborative learning...",
      tags: ["Privacy", "Healthcare", "Federated Learning", "HIPAA"],
      institution: "Academic Publication",
      featured: false,
    },
    {
        id: 13,
        title: "The Developing Reader: An Expert Report on the Science of Reading, Learning, and Vision in Children Aged 5-15",
        category: "educational-technology",
        date: "June 15, 2024",
        status: "Published",
        excerpt:
          "A comprehensive interdisciplinary study combining cognitive science, vision science, and educational research to create a holistic model for understanding how children learn to read.",
        methodology:
          "Synthesizes advanced eye-tracking technology data with pedagogical practice to provide evidence-based recommendations for educators, clinicians, and parents.",
        tags: ["Educational Technology", "Cognitive Science", "Vision Science", "Pedagogy"],
        institution: "Academic Publication",
        featured: true,
        link: "/developing-reader-manuscript",
        reportLink: "/The Developing Reader - report.pdf"
      },
      {
        id: 14,
        title: "The Architecture of Learning: A Comprehensive Review of Cognitive Mechanisms, Pedagogical Strategies, and Future-Forward Classrooms",
        category: "educational-technology",
        date: "May 1, 2024",
        status: "Published",
        excerpt:
          "A four-part academic synthesis examining decades of peer-reviewed research from cognitive science, educational psychology, and technology studies to address the fundamental challenge of effective education in an era of technological transformation.",
        methodology:
          "Examines cognitive foundations of learning, evidence-based pedagogical strategies, social and environmental learning contexts, and technological transformation analysis.",
        tags: ["Educational Technology", "Cognitive Science", "Pedagogy", "AI in Education"],
        institution: "Academic Publication",
        featured: true,
      },
    {
      id: 15,
      title: "Explainable AI for Government Decision Making",
      category: "explainability",
      date: "January 28, 2024",
      status: "Under Review",
      excerpt:
        "Creating interpretable machine learning models for government policy recommendations with transparent decision pathways and audit trails.",
      methodology:
        "Developing SHAP-based explanation frameworks and causal inference models to provide clear justifications for AI-driven policy recommendations...",
      tags: ["Explainable AI", "Government", "Policy", "Transparency"],
      institution: "Academic Publication",
      featured: false,
    },
    {
      id: 16,
      title: "Adversarial Robustness in Computer Vision Systems",
      category: "security",
      date: "January 10, 2024",
      status: "Complete",
      excerpt:
        "Analyzing vulnerabilities in computer vision models to adversarial attacks and developing defensive mechanisms for critical infrastructure applications.",
      methodology:
        "Employing adversarial training techniques, certified defenses, and ensemble methods to improve model robustness against targeted attacks...",
      tags: ["Adversarial AI", "Computer Vision", "Security", "Robustness"],
      institution: "Academic Publication",
      featured: false,
    },
    {
      id: 17,
      title: "Natural Language Processing for Legal Document Analysis",
      category: "nlp",
      date: "December 18, 2023",
      status: "Published",
      excerpt:
        "Developing specialized NLP models for automated legal document review, contract analysis, and regulatory compliance checking.",
      methodology:
        "Training domain-specific transformer models on legal corpora with fine-tuning for contract clause extraction and compliance verification...",
      tags: ["NLP", "Legal Tech", "Document Analysis", "Compliance"],
      institution: "Academic Publication",
      featured: false,
    },
    {
      id: 18,
      title: "Quantum-Classical Hybrid Algorithms for Optimization",
      category: "quantum",
      date: "November 30, 2023",
      status: "In Progress",
      excerpt:
        "Exploring hybrid quantum-classical approaches to solve complex optimization problems in logistics and supply chain management.",
      methodology:
        "Implementing variational quantum eigensolveranalysis and quantum approximate optimization algorithms (QAOA) for combinatorial optimization...",
      tags: ["Quantum Computing", "Optimization", "Hybrid Algorithms", "Logistics"],
      institution: "Academic Publication",
      featured: false,
    },
    {
        id: 20,
        title: "Dopamine Dysregulation in Childhood Development",
        category: "educational-technology",
        status: "Published",
        date: "2024",
        excerpt:
          "A neurodevelopmental perspective on the impact of artificial rewards in childhood and adolescence, synthesizing evidence from neuroscience and developmental psychology to articulate the Dopamine Dysregulation Hypothesis.",
        methodology: "This paper synthesizes evidence from neuroscience and developmental psychology to articulate the Dopamine Dysregulation Hypothesis: that chronic exposure to modern supernormal stimuli (e.g., digital media, hyper-palatable foods, consumerism) during the critical neurodevelopmental periods of childhood and adolescence dysregulates the brain's reward circuitry.",
        tags: ["Neuroscience", "Childhood Development", "Dopamine", "Behavioral Addiction"],
        institution: "Academic Publication",
        featured: true,
      },
  ];

  const categories = [
    { id: "all", label: "All Research", count: researchProjects.length },
    { id: "machine-learning", label: "Machine Learning", count: researchProjects.filter(p => p.category === "machine-learning").length },
    { id: "educational-technology", label: "Educational Technology", count: researchProjects.filter(p => p.category === "educational-technology").length },
    { id: "privacy", label: "Privacy & Security", count: researchProjects.filter(p => p.category === "privacy" || p.category === "security").length },
    { id: "explainability", label: "Explainable AI", count: researchProjects.filter(p => p.category === "explainability").length },
    { id: "nlp", label: "Natural Language", count: researchProjects.filter(p => p.category === "nlp").length },
    { id: "quantum", label: "Quantum Computing", count: researchProjects.filter(p => p.category === "quantum").length },
  ];

  const filteredProjects = selectedCategory === "all" 
    ? researchProjects 
    : researchProjects.filter(project => 
        project.category === selectedCategory || 
        (selectedCategory === "privacy" && (project.category === "privacy" || project.category === "security")) ||
        (selectedCategory === "educational-technology" && project.category === "educational-technology")
      );

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/newsletter`, {
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

      {/* New Research Blurb */}
      <div className="py-16 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-4xl font-extralight mb-12 tracking-wide text-white text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Research Focus: <span className="text-orange-200/90">Childhood Development, Learning & Reading</span>
          </h2>
          <div className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
            <p className="mb-4">
              My research is dedicated to understanding the intricate processes of childhood development, with a particular focus on the cognitive and neurological foundations of learning and reading. By synthesizing findings from cognitive science, educational psychology, and vision science, my work aims to create a holistic understanding of how children learn to read and the factors that can impede this process.
            </p>
            <p>
              This research has culminated in several key publications, including "The Developing Reader," "The Architecture of Learning," and "Dopamine Dysregulation in Childhood Development." These reports provide evidence-based insights and practical recommendations for educators, clinicians, and parents to support children's educational journeys.
            </p>
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

                    <div className="flex gap-4">
                        <Link href={project.link || "#"}>
                            <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 transition-all duration-200 cursor-pointer font-medium">READ MANUSCRIPT</span>
                        </Link>
                        <a href={project.reportLink || "#"} target="_blank" rel="noopener noreferrer">
                            <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all duration-200 cursor-pointer font-medium">READ REPORT</span>
                        </a>
                        <Link href="/ai">
                            <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 transition-all duration-200 cursor-pointer font-medium">VIEW PROJECT</span>
                        </Link>
                    </div>
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

                  <div className="lg:w-48 flex flex-col gap-2">
                    {project.link && (
                      <Link href={project.link}>
                        <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-300 hover:bg-orange-500/30 transition-all duration-200 cursor-pointer font-medium w-full text-center">READ MANUSCRIPT</span>
                      </Link>
                    )}
                    {project.reportLink && (
                      <a href={project.reportLink} target="_blank" rel="noopener noreferrer">
                        <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-all duration-200 cursor-pointer font-medium w-full text-center">READ REPORT</span>
                      </a>
                    )}
                    <Link href="/ai">
                      <span className="inline-block text-sm px-3 py-1.5 rounded-full bg-gray-500/20 text-gray-300 hover:bg-gray-500/30 transition-all duration-200 cursor-pointer font-medium w-full text-center">VIEW PROJECT</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ResearchPage;