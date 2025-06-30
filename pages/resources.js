import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";


function ResourcesPage() {
  const router = useRouter();

  // State declarations
  const [showHeader, setShowHeader] = useState(false);
  const [showSubheader, setShowSubheader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("resources");
  const [showImage, setShowImage] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2 });
  const [resourcesRef, resourcesInView] = useInView({ threshold: 0.2 });
  const [guidelinesRef, guidelinesInView] = useInView({ threshold: 0.2 });
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

  const resources = [
    {
      id: 1,
      title: "Google AI Responsible AI Principles",
      category: "ai-safety",
      type: "Guidelines",
      description:
        "Comprehensive framework for developing AI responsibly, including fairness, accountability, and transparency guidelines.",
      link: "https://ai.google/principles/",
      organization: "Google AI",
      lastUpdated: "2024",
      tags: ["AI Ethics", "Responsible AI", "Google", "Guidelines"],
    },
    {
      id: 2,
      title: "COPPA - Children's Online Privacy Protection Rule",
      category: "child-safety",
      type: "Regulation",
      description:
        "Federal regulation in the United States that imposes certain requirements on operators of websites or online services directed to children under 13.",
      link: "https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule",
      organization: "FTC",
      lastUpdated: "2023",
      tags: ["Child Safety", "Privacy", "COPPA", "Compliance"],
    },
    {
      id: 3,
      title: "NIST AI Risk Management Framework",
      category: "ai-safety",
      type: "Framework",
      description:
        "A comprehensive framework for managing risks associated with artificial intelligence, designed for government and enterprise use.",
      link: "https://www.nist.gov/itl/ai-risk-management-framework",
      organization: "NIST",
      lastUpdated: "2024",
      tags: ["Risk Management", "Government", "NIST", "AI Safety"],
    },
    {
      id: 4,
      title: "Google Cloud Security Best Practices",
      category: "security",
      type: "Best Practices",
      description:
        "Security guidelines and best practices for developing and deploying applications on Google Cloud Platform.",
      link: "https://cloud.google.com/security/best-practices",
      organization: "Google Cloud",
      lastUpdated: "2024",
      tags: ["Cloud Security", "Google Cloud", "Best Practices"],
    },
    {
      id: 5,
      title: "UNESCO AI Ethics Recommendation",
      category: "ai-ethics",
      type: "International Standard",
      description:
        "Global standard on the ethics of artificial intelligence, providing a framework for AI governance and ethics.",
      link: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics",
      organization: "UNESCO",
      lastUpdated: "2023",
      tags: ["AI Ethics", "International", "UNESCO", "Standards"],
    },
    {
      id: 6,
      title: "FERPA - Educational Privacy Laws",
      category: "education",
      type: "Regulation",
      description:
        "Federal law that protects the privacy of student education records, essential for educational AI applications.",
      link: "https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html",
      organization: "U.S. Department of Education",
      lastUpdated: "2023",
      tags: ["Education", "Privacy", "FERPA", "Student Data"],
    },
    {
      id: 7,
      title: "Google AI Safety Guidelines",
      category: "ai-safety",
      type: "Guidelines",
      description:
        "Comprehensive safety guidelines for AI development, including testing, monitoring, and deployment practices.",
      link: "https://ai.google/safety/",
      organization: "Google AI",
      lastUpdated: "2024",
      tags: ["AI Safety", "Google", "Guidelines", "Development"],
    },
    {
      id: 8,
      title: "OWASP Application Security Standards",
      category: "security",
      type: "Standards",
      description:
        "Open-source security standards and guidelines for web application security, including AI-powered applications.",
      link: "https://owasp.org/www-project-application-security-verification-standard/",
      organization: "OWASP",
      lastUpdated: "2024",
      tags: ["Security", "OWASP", "Application Security", "Standards"],
    },
    {
      id: 9,
      title: "GDPR - Data Protection Regulation",
      category: "privacy",
      type: "Regulation",
      description:
        "European regulation on data protection and privacy, crucial for AI systems handling personal data.",
      link: "https://gdpr.eu/",
      organization: "European Union",
      lastUpdated: "2023",
      tags: ["Privacy", "GDPR", "Data Protection", "EU"],
    },
    {
      id: 10,
      title: "Google Safety by Design Principles",
      category: "design",
      type: "Framework",
      description:
        "Design principles for building safe and secure systems from the ground up, including AI and machine learning systems.",
      link: "https://safety.google/principles/",
      organization: "Google",
      lastUpdated: "2024",
      tags: ["Safety by Design", "Google", "Principles", "Design"],
    },
  ];

  const guidelines = [
    {
      title: "AI Development for Educational Institutions",
      principles: [
        "Always prioritize student privacy and data protection",
        "Implement transparent AI decision-making processes",
        "Ensure equitable access and bias-free algorithms",
        "Provide clear opt-out mechanisms for AI features",
        "Regular auditing of AI systems for safety and compliance",
      ],
    },
    {
      title: "Government AI Implementation Standards",
      principles: [
        "Adhere to federal and local AI governance frameworks",
        "Maintain transparency in AI-driven decision making",
        "Implement robust security measures for sensitive data",
        "Ensure accountability and explainability in AI systems",
        "Regular compliance audits and public reporting",
      ],
    },
    {
      title: "Child Safety in AI Applications",
      principles: [
        "Strict adherence to COPPA and similar regulations",
        "Age-appropriate content filtering and moderation",
        "Parental controls and consent mechanisms",
        "Regular safety assessments and child protection measures",
        "Clear communication about data collection and use",
      ],
    },
  ];

  // Filter resources by category
  const filteredResources =
    selectedCategory === "all"
      ? resources
      : resources.filter((resource) => resource.category === selectedCategory);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Newsletter subscription
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "John Li <johnny@johnny.ae>",
          to: email,
          subject: "Newsletter Subscription",
          html: "<p>Thank you for subscribing to our newsletter!</p>",
        }),
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
            RESOURCES
          </h1>

          <h2
            className={`text-white text-xl md:text-2xl font-light mb-8 leading-relaxed max-w-3xl mx-auto scroll-animate-left ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            Safety, compliance, and security resources for AI development in
            educational and government environments
          </h2>

          <div
            className={`text-gray-400 text-lg max-w-2xl mx-auto mb-12 scroll-animate-right ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            Following Google safety and security standards for responsible AI
            implementation
          </div>
        </div>
      </div>

      {/* Guidelines Section */}
      <div ref={guidelinesRef} className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-4xl font-extralight mb-12 tracking-wide text-white text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Implementation{" "}
            <span className="text-orange-200/90">Guidelines</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {guidelines.map((guideline, index) => (
              <div
                key={index}
                className={`bg-gray-800/40 rounded-lg p-8 scroll-animate ${guidelinesInView ? "fade-in" : ""}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <h3 className="text-xl font-medium text-white mb-6">
                  {guideline.title}
                </h3>
                <ul className="space-y-4">
                  {guideline.principles.map((principle, principleIndex) => (
                    <li key={principleIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-200 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300 text-sm leading-relaxed">
                        {principle}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs Section */}
      <div className="py-8 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className={`flex flex-wrap justify-center gap-3 scroll-animate ${guidelinesInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "all" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              All Resources
            </button>
            <button
              onClick={() => handleCategoryChange("ai-safety")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "ai-safety" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              AI Safety
            </button>
            <button
              onClick={() => handleCategoryChange("child-safety")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "child-safety" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Child Safety
            </button>
            <button
              onClick={() => handleCategoryChange("education")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "education" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Education
            </button>
            <button
              onClick={() => handleCategoryChange("security")}
              className={`px-4 py-2 rounded-full text-sm ${selectedCategory === "security" ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-gray-300"} transition-colors hover:bg-orange-200 hover:text-gray-900`}
            >
              Security
            </button>
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div ref={resourcesRef} className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2
            className="text-4xl font-extralight mb-12 tracking-wide text-white text-center"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Safety &{" "}
            <span className="text-orange-200/90">Compliance Resources</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredResources.map((resource, index) => (
              <div
                key={resource.id}
                className={`bg-gray-800/40 rounded-lg p-8 scroll-animate ${resourcesInView ? "fade-in" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className={`px-3 py-1 text-xs rounded-full mb-3 inline-block ${
                        resource.type === "Regulation"
                          ? "bg-red-500/20 text-red-400"
                          : resource.type === "Framework"
                            ? "bg-blue-500/20 text-blue-400"
                            : resource.type === "Guidelines"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-gray-500/20 text-gray-400"
                      }`}
                    >
                      {resource.type}
                    </span>
                    <h3 className="text-xl font-medium text-white mb-2">
                      {resource.title}
                    </h3>
                    <div className="text-orange-200/80 text-sm mb-4">
                      {resource.organization} • {resource.lastUpdated}
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {resource.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-200 hover:text-white transition-colors"
                >
                  <span>View Resource</span>
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Important Notice Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-orange-200/10 border border-orange-200/20 rounded-lg p-8">
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-orange-200 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <h3 className="text-xl font-medium text-orange-200">
                Important Notice
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              These resources are provided for informational purposes and
              represent current best practices in AI safety and compliance.
              Always consult with legal and compliance experts for your specific
              use case and jurisdiction. Regulations and standards evolve
              rapidly, so ensure you're working with the most current versions.
            </p>
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

export default ResourcesPage;
