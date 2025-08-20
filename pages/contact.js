import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import QuantumBackground from "../components/QuantumBackground";
import { menuItems } from "../config/menuItems";


function ContactPage() {
  const router = useRouter();

  // State declarations
  const [showHeader, setShowHeader] = useState(false);
  const [showSubheader, setShowSubheader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("contact");
  const [showImage, setShowImage] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    projectType: "consultation",
  });
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSubmitStatus, setContactSubmitStatus] = useState(null);

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [newsletterRef, newsletterInView] = useInView({ threshold: 0.2, triggerOnce: true });


  useEffect(() => {
    const timers = [
      setTimeout(() => setShowImage(true), 500),
      setTimeout(() => setShowHeader(true), 1000),
      setTimeout(() => setShowSubheader(true), 1500),
    ];
    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const services = [
    {
      title: "AI Development & Integration",
      description:
        "Custom AI solutions for educational institutions, business, and government organizations with focus on safety and compliance.",
      features: [
        "Custom AI Development",
        "AI Safety Implementation",
        "Compliance Consulting",
        "System Integration",
      ],
    },
    {
      title: "Creative Technology Solutions",
      description:
        "Combining AI with creative workflows to enhance productivity and unlock new possibilities in digital content creation.",
      features: [
        "Generative AI Solutions",
        "Creative Automation",
        "Asset Management",
        "Brand Consistency Tools",
      ],
    },
    {
      title: "Security & Privacy Consulting",
      description:
        "Implementing robust security measures and privacy protections for AI systems in sensitive environments.",
      features: [
        "Security Auditing",
        "Privacy Assessment",
        "Compliance Review",
        "Risk Management",
      ],
    },
    {
      title: "Training & Education",
      description:
        "Educational programs and discussions on responsible AI development, safety standards, and best practices.",
      features: [
        "AI Safety Training",
        "Compliance Workshops",
        "Technical Education",
        "Best Practices Guidance",
      ],
    },
  ];

  const contactMethods = [
    {
      title: "Email",
      value: "Email Below",
      icon: "✉",
      link: "#contact-form",
      description: "For general inquiries and project discussions",
    },
    {
      title: "Phone",
      value: "Request Callback Below",
      icon: "📞",
      link: "#contact-form",
      description: "Available during UAE business hours",
    },
    {
      title: "Location",
      value: "Abu Dhabi, UAE",
      icon: "📍",
      link: "#",
      description: "Available for local and remote projects",
    },
    {
      title: "Response Time",
      value: "24-48 hours",
      icon: "⏱",
      link: "#",
      description: "Typical response time for inquiries",
    },
  ];

  // Handle contact form changes
  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsContactSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactForm,
          site: "johnny.ae" // Identify which site this is from
        }),
      });

      if (response.ok) {
        setContactSubmitStatus("success");
        setContactForm({
          name: "",
          email: "",
          subject: "",
          message: "",
          projectType: "consultation",
        });
      } else {
        setContactSubmitStatus("error");
      }
    } catch (error) {
      setContactSubmitStatus("error");
    } finally {
      setIsContactSubmitting(false);
      setTimeout(() => setContactSubmitStatus(null), 5000);
    }
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
            CONTACT
          </h1>

          <h2
            className={`text-white text-xl md:text-2xl font-light mb-8 leading-relaxed max-w-3xl mx-auto scroll-animate-left ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            Let's collaborate on innovative AI solutions that prioritize safety,
            compliance, and creative excellence
          </h2>

          <div
            className={`text-gray-400 text-lg max-w-2xl mx-auto scroll-animate-right ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            Available for projects in education, government, and creative
            technology
          </div>
        </div>
      </div>

      {/* Contact Methods Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={`text-center scroll-animate ${heroInView ? "fade-in" : ""}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-xl font-medium text-white mb-2">
                  {method.title}
                </h3>
                <a
                  href={method.link}
                  className="text-orange-200 hover:text-white transition-colors text-lg block mb-2"
                >
                  {method.value}
                </a>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form & Services Section */}
      <div ref={contactRef} className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className={`scroll-animate ${contactInView ? "fade-in" : ""}`}>
              <h2
                className="text-4xl font-extralight mb-8 tracking-wide text-white"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Get In <span className="text-orange-200/90">Touch</span>
              </h2>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      className="w-full px-4 py-3 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-lg focus:border-orange-200 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 text-sm mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      className="w-full px-4 py-3 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-lg focus:border-orange-200 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={contactForm.projectType}
                    onChange={handleContactFormChange}
                    className="w-full px-4 py-3 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-lg focus:border-orange-200 focus:outline-none transition-colors"
                  >
                    <option value="consultation">Consultation</option>
                    <option value="ai-development">AI Development</option>
                    <option value="creative-automation">
                      Creative Automation
                    </option>
                    <option value="security-audit">Security Audit</option>
                    <option value="training">Training & Education</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactFormChange}
                    className="w-full px-4 py-3 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-lg focus:border-orange-200 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactFormChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 text-gray-300 border border-gray-700 rounded-lg focus:border-orange-200 focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project, goals, and any specific requirements..."
                    required
                  />
                </div>

                {contactSubmitStatus && (
                  <div
                    className={`text-sm ${contactSubmitStatus === "success" ? "text-green-500" : "text-red-500"}`}
                  >
                    {contactSubmitStatus === "success"
                      ? "Message sent successfully! I'll get back to you within 24-48 hours."
                      : "Something went wrong. Please try again or email me directly."}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isContactSubmitting}
                  className="w-full bg-orange-200 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-orange-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isContactSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>

            {/* Services Overview */}
            <div
              ref={servicesRef}
              className={`scroll-animate ${servicesInView ? "fade-in" : ""}`}
              style={{ transitionDelay: "200ms" }}
            >
              <h2
                className="text-4xl font-extralight mb-8 tracking-wide text-white"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                How I Can <span className="text-orange-200/90">Help</span>
              </h2>

              <div className="space-y-8">
                {services.map((service, index) => (
                  <div key={index} className="bg-gray-800/40 rounded-lg p-6">
                    <h3 className="text-xl font-medium text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <div className="w-1.5 h-1.5 bg-orange-200 rounded-full mr-2"></div>
                          <span className="text-gray-400 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

export default ContactPage;
