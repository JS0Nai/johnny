import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
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
import { TbBrain, TbCode, TbPalette } from "react-icons/tb";
import { FaRobot, FaCloud, FaShieldAlt, FaLightbulb, FaHandshake, FaBrain, FaCode, FaServer, FaDatabase, FaPaintBrush, FaPencilAlt, FaCubes, FaGraduationCap, FaBookOpen, FaFlask, FaMicroscope, FaChartLine, FaCogs, FaNetworkWired, FaUserShield, FaDumbbell, FaPalette, FaRunning } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

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
  const [activeExpertiseTab, setActiveExpertiseTab] = useState('ai'); // for Core Expertise tabs
  const [expandedCard, setExpandedCard] = useState(null); // for expandable cards

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [storyRef, storyInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [brainRef, brainInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [contentRef, contentInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [newsletterRef, newsletterInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [expertiseRef, expertiseInView] = useInView({ threshold: 0.2, triggerOnce: true });

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

  const skills = [
    {
      category: "AI & Machine Learning",
      items: [
        "Generative AI",
        "Midjourney",
        "DALL-E",
        "Stable Diffusion",
        "ChatGPT",
        "Claude",
        "RunwayML",
        "OpenAI API",
        "Hugging Face",
        "Google AI",
        "IBM Watson",
        "Meta AI",
        "Custom AI Models"
      ],
    },
    {
      category: "Creative Software",
      items: [
        "Adobe Photoshop",
        "Adobe Illustrator",
        "Adobe After Effects",
        "Figma",
        "Sketch",
      ],
    },
    {
      category: "Development",
      items: [
        "JavaScript",
        "React",
        "Next.js",
        "Node.js",
        "Python",
        "TailwindCSS",
      ],
    },
    {
      category: "Cloud & DevOps",
      items: ["Google Workspace", "Firebase", "Docker", "Git", "CI/CD", "Cloudflare"],
    },
    {
      category: "Databases",
      items: ["QDrant", "ChromaDB", "MongoDB", "MySQL", "PostgreSQL", "Redis"],
    },
    {
      category: "Photography",
      items: [
        "Digital Photography",
        "Photo Editing",
        "Color Grading",
        "Composition",
      ],
    },
  ];

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

  const experiences = [
    {
      period: "Early '80s",
      title: "The Writing Journey Begins",
      image: "typewriter-green",
      description: "\"If a story is in you, it has to come out.\" - William Faulkner",
      achievements: [],
    },
    {
      period: "Early to Mid '80s",
      title: "TRS-80",
      image: "trs80-computer",
      description: "• Coding journey begins. Mostly creating ASCII boxing programs\n• Model 4 (RadioShack)\n• Level II BASIC, 64 KB RAM max, and dual 5¼″ floppy drives.",
      achievements: [],
    },
    {
      period: "Early to Mid '80s",
      title: "Commodore VIC-20",
      image: "vic20-computer",
      description: "The best worst video games ever!",
      achievements: [],
    },
    {
      period: "1986",
      title: "TV/Gaming Era",
      image: "tv-gaming",
      imageOnly: true,
      description: "The evolution of gaming and display technology.",
      achievements: [],
    },
    {
      period: "Mid to Late '80s",
      title: "Electronic Typewriter",
      image: "electronic-typewriter",
      description: "Electronic typewriter upgrade - much better for night writing.",
      achievements: [],
    },
    {
      period: "1989",
      title: "Connectivity Component",
      image: "connector-device",
      imageOnly: true,
      description: "Early connectivity and networking components.",
      achievements: [],
    },
    {
      period: "Mid to Late '80s",
      title: "Commodore 64",
      image: "commodore64-setup",
      description: "Big power up!",
      achievements: [],
    },
    {
      period: "Early '90s",
      title: "ProWrite Document",
      image: "prowrite-document",
      imageOnly: true,
      description: "Early word processing and document creation.",
      achievements: [],
    },
    {
      period: "1993-1994",
      title: "International Business College Degree",
      company: "University",
      Icon: FaGraduationCap,
      description:
        "• Completed an International Business College Degree\n• Focus on business studies\n• Business study specialization\n• International commerce curriculum",
      achievements: [],
    },
    {
      period: "Mid '90s",
      title: "Network Infrastructure",
      image: "ethernet-wiring",
      description: "Multi-floor ethernet wiring - before the WIFI era.",
      achievements: [],
    },
    {
      period: "1995-1997",
      title: "Bachelor of Arts Psychology and Early Childhood Education",
      company: "University",
      Icon: FaGraduationCap,
      description:
        "Course focuses included child psychology and behavior, anthropological biology, and chemistry.",
      achievements: [],
    },
    {
      period: "Late '90s",
      title: "Tower Computing",
      image: "desktop-computers",
      description: "You can never have too many towers.",
      achievements: [],
    },
    {
      period: "Late '90s to 2007",
      title: "Youth & Athletics Trainer",
      company: "Fitness Center",
      location: "USA",
      Icon: FaDumbbell,
      description:
        "• Provided fitness training to youth and professional athletes\n• Large group class fitness\n• Individual Sport-Specific Professional Training",
      achievements: [],
    },
    {
      period: "2005 - 2010",
      title: "Corporate Media Design and Services",
      company: "Design Agency",
      location: "UAE",
      Icon: FaPalette,
      description:
        "• Created digital designs and visual identities\n• Designed 200+ digital assets\n• Worked with large brands and startups\n• Various industries and sectors",
      achievements: [],
    },
    {
      period: "2011-2017",
      title: "Youth Athletics Academy Trainer",
      company: "Athletics Academy",
      location: "UAE",
      Icon: FaRunning,
      description:
        "• Provided coaching to youth and professional athletes\n• Large group classes and events\n• Individual coaching professional athletes",
      achievements: [],
    },
    {
      period: "May 2021",
      title: "Meta Social Media Marketing Certificate",
      company: "Meta",
      image: "/media/Meta-Social-Media-Marketing-JY7ANRL9MXP4.png",
      description:
        "Completed the Meta Social Media Marketing Certificate, consisting of 6 courses.",
      achievements: [],
    },
    {
      period: "2021-2022",
      title: "Introduction to Intellectual Property",
      image: "/media/Introduction-to-Intellectual-Property-9J28V5QFZJVD.png",
      description: "Foundation course in intellectual property fundamentals.",
      achievements: [],
    },
    {
      period: "2021-2022",
      title: "Copyright Law",
      image: "/media/Copyright-Law-PBM9KWDYVQBS.png",
      description: "Understanding copyright law principles and applications.",
      achievements: [],
    },
    {
      period: "2021-2022",
      title: "Patent Law",
      image: "/media/Patent-Law-TLAMXN9739GY.png",
      description: "Patent law fundamentals and practical applications.",
      achievements: [],
    },
    {
      period: "2021-2022",
      title: "Trademark Law",
      image: "/media/Trademark-Law-QE76LA26BZSW.png",
      description: "Trademark law principles and brand protection.",
      achievements: [],
    },
    {
      period: "2021-2022",
      title: "Brand Management",
      image: "/media/Brand-Management---Aligning-Business-Brand-and-Behaviour-59GB94DMXHQT.png",
      description: "Aligning business brand and behaviour strategies.",
      achievements: [],
    },
    {
      period: "2021-2022",
      title: "Bookkeeping Basics",
      image: "/media/Bookkeeping-Basics-ULPP2KDXC9VG.png",
      description: "Fundamental bookkeeping principles and practices.",
      achievements: [],
    },
    {
      period: "March 2024",
      title: "IBM AI Engineering Professional Certificate",
      company: "IBM",
      image: "/media/IBM-AI-Engineering-.png",
      description:
        "• Machine Learning with Python\n• Deep Learning & Neural Networks\n• AI-Powered Chatbots\n• Computer Vision & Image Processing\n• PyTorch & TensorFlow Deep Learning\n• AI Capstone Project",
      achievements: [],
    },
    {
      period: "July 2024",
      title: "Bachelor of Arts (Honours) in English Literature and Creative Writing",
      company: "University",
      image: "/media/honsBAEngCrWr.png",
      description:
        "Completed Bachelor of Arts (Honours) in English Literature and Creative Writing, with a focus on business studies.",
      achievements: [],
    },
    {
      period: "August 2024",
      title: "IBM DevOps and Software Engineering Professional Certificate",
      company: "IBM",
      image: "/media/IBM-DevOps-and-Software-Engineering-4TC4UEGZSK8W.png",
      description:
        "Completed the IBM DevOps and Software Engineering Professional Certificate, a comprehensive program of 14 courses.",
      achievements: [],
    },
    {
      period: "January 2025",
      title: "Google Cloud Cybersecurity Professional Certificate",
      company: "Google",
      image: "/media/Google-Cloud-Cybersecurity-R7BXO2TQWXUF.png",
      description:
        "• Security Command Center (SCC)\n• Identity and Access Management (IAM)\n• Cloud Logging and Storage\n• Compute Engine\n• Google Compute Engine\n• Cloud Firewall and Shell\n• Generative AI in Cybersecurity",
      achievements: [],
    },
    {
      period: "2024 - Ongoing",
      title: "Master of Science in Computer Science & AI (MSCS)",
      company: "University",
      image: "brain-tekie-blue",
      description:
        "Currently pursuing a Master of Science in Computer Science & AI (MSCS).",
      achievements: [],
    },
  ];

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
                    src="/media/signature-webpagetopleft-logo.png"
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
        className="flex justify-center items-center pt-32 pb-16"
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
            Architecting Intelligent Futures at the intersection of cutting-edge technology,
            strategic vision, and human-centric innovation
          </h2>

          <div
            className={`text-gray-400 text-lg max-w-2xl mx-auto scroll-animate-right ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            Founder and Principal Consultant at AI Infrastructure & Integrations Consultancy (AIii), Abu Dhabi
          </div>
        </div>
      </div>

      {/* Profile Image Section */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className={`relative w-64 h-64 mx-auto mb-8 rounded-full overflow-hidden border-4 border-orange-200/20 scroll-animate ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "600ms" }}
          >
            <CloudflareImage
              src="profilepicjaison"
              alt="Jaison Li"
              width={400}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div ref={storyRef} className="py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className={`text-5xl font-extralight mb-8 tracking-wide text-white scroll-animate-left ${storyInView ? "fade-in" : ""}`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                My <span className="text-orange-200/90">Story</span>
              </h2>

              <div
                className={`space-y-6 text-gray-300 text-lg leading-relaxed scroll-animate-right ${storyInView ? "fade-in" : ""}`}
                style={{ transitionDelay: "200ms" }}
              >
                <p>
                  Welcome — I'm John Li, founder and principal consultant at AI Infrastructure & Integrations Consultancy (AIii), based in Abu Dhabi, UAE. My passion lies at the intersection of cutting-edge technology, strategic vision, and human-centric innovation. With a unique blend of deep technical expertise, creative insight, and robust interdisciplinary skills, my mission is to architect intelligent ecosystems that transform possibilities into impactful realities, particularly within educational and governmental sectors.
                </p>

                <p className="mt-6">
                  My journey bridges the technical and creative realms through a Bachelor of Arts (Honours) in English Literature and Creative Writing, combined with advanced certifications in AI Engineering, DevOps, and Cybersecurity from IBM and Google. I'm actively pursuing a Master of Science in Computer Science & AI, authoring evidence-based academic papers that directly inform practical AI implementations grounded in cognitive and pedagogical science.
                </p>

                <p className="mt-6">
                  Today, I specialize in end-to-end AI development, having created complex applications spanning computer vision systems, intelligent chatbots, and ML-driven web integrations. My expertise extends from custom AI data infrastructure and hybrid intelligence integrations to enterprise-grade security and compliance frameworks, ensuring every solution is not only sophisticated but operationally sound and strategically aligned.
                </p>

                <p className="mt-6">
                  What drives me is the vision of a future where advanced technology profoundly enhances human capabilities, particularly in education. My goal is to create adaptive, intelligent systems that empower learners, support educators, and revolutionize how educational content is delivered — making learning experiences accessible, intuitive, and inspiring.
                </p>
              </div>
            </div>

            <div
              className={`space-y-4 md:space-y-8 scroll-animate ${storyInView ? "fade-in" : ""}`}
              style={{ transitionDelay: "400ms" }}
            >
              {/* Philosophy Card */}
              <div className="bg-gray-800/40 py-12 px-10 md:py-16 md:px-12 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-800/60 hover:shadow-lg hover:shadow-orange-200/10 relative overflow-hidden min-h-[120px]"
                   style={{ 
                     backgroundImage: `radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.035) 0%, transparent 50%), 
                                      radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.035) 0%, transparent 50%),
                                      repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.008) 35px, rgba(255,255,255,0.008) 70px)` 
                   }}
                   onClick={() => setExpandedCard(expandedCard === 'philosophy' ? null : 'philosophy')}>
                <div className="flex items-center justify-center relative">
                  <h3 className="text-4xl font-extralight text-orange-200/90 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    PHILOSOPHY
                  </h3>
                  <div className="absolute right-0">
                    <IoMdArrowDropdown className={`text-orange-200 text-2xl transition-transform duration-300 ${expandedCard === 'philosophy' ? 'rotate-180' : ''}`} style={{ strokeWidth: '0.5' }} />
                  </div>
                </div>
                {expandedCard === 'philosophy' && (
                  <div className="mt-4 text-gray-300 animate-fadeIn">
                    <p className="text-xl font-light">Innovation Driven by Human-Centric Values</p>
                    <div className="mt-4 space-y-3 border-t border-gray-700/50 pt-4">
                      <p className="leading-relaxed">
                        My philosophy is deeply rooted in three core principles: innovation, user-centric design, and uncompromising integrity.
                      </p>
                      <p className="leading-relaxed">
                        I believe true technological progress emerges from creatively blending rigorous analytical thinking with imaginative problem-solving. My interdisciplinary background uniquely positions me to craft intelligent solutions that are intuitive, engaging, and deeply aligned with human needs, especially for younger learners.
                      </p>
                      <p className="leading-relaxed">
                        Ensuring technology resonates genuinely with its users is central to my approach. My expertise extends beyond mere technical implementation; I ensure intelligent systems are effectively communicated, widely adopted, and impactful. With specialized skills in social media marketing, brand management, and storytelling, I bring innovations to life in ways that connect meaningfully with diverse audiences.
                      </p>
                      <p className="leading-relaxed">
                        Integrity underpins all my work. My extensive qualifications in cybersecurity, compliance, and intellectual property law underscore my commitment to building robust, secure, and trustworthy digital environments.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Vision Card */}
              <div className="bg-gray-800/40 py-12 px-10 md:py-16 md:px-12 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-800/60 hover:shadow-lg hover:shadow-orange-200/10 relative overflow-hidden min-h-[120px]"
                   style={{ 
                     backgroundImage: `radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.035) 0%, transparent 50%), 
                                      radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.035) 0%, transparent 50%),
                                      repeating-linear-gradient(90deg, transparent, transparent 35px, rgba(255,255,255,0.008) 35px, rgba(255,255,255,0.008) 70px)` 
                   }}
                   onClick={() => setExpandedCard(expandedCard === 'vision' ? null : 'vision')}>
                <div className="flex items-center justify-center relative">
                  <h3 className="text-4xl font-extralight text-orange-200/90 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    VISION
                  </h3>
                  <div className="absolute right-0">
                    <IoMdArrowDropdown className={`text-orange-200 text-2xl transition-transform duration-300 ${expandedCard === 'vision' ? 'rotate-180' : ''}`} style={{ strokeWidth: '0.5' }} />
                  </div>
                </div>
                {expandedCard === 'vision' && (
                  <div className="mt-4 text-gray-300 animate-fadeIn">
                    <p className="text-xl font-light">Transforming Education and Digital Infrastructure</p>
                    <div className="mt-4 space-y-3 border-t border-gray-700/50 pt-4">
                      <p className="leading-relaxed">
                        I envision a future where advanced technology profoundly enhances human capabilities, particularly in education.
                      </p>
                      <p className="leading-relaxed">
                        My goal is to create adaptive, intelligent systems that empower learners, support educators, and revolutionize how educational content is delivered. By leveraging AI's transformative potential, my solutions seek to personalize and enrich learning experiences, making them accessible, intuitive, and inspiring.
                      </p>
                      <p className="leading-relaxed">
                        This vision extends beyond educational tools alone—I am equally committed to developing resilient digital infrastructures capable of securely supporting these innovations at scale. My expertise in DevOps, cloud technologies, and cybersecurity ensures these platforms are robust, scalable, and secure, capable of seamlessly integrating with existing legacy systems without disruption.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Mission Card */}
              <div className="bg-gray-800/40 py-12 px-10 md:py-16 md:px-12 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-800/60 hover:shadow-lg hover:shadow-orange-200/10 relative overflow-hidden min-h-[120px]"
                   style={{ 
                     backgroundImage: `radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.035) 0%, transparent 60%), 
                                      radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.035) 0%, transparent 50%),
                                      repeating-linear-gradient(-45deg, transparent, transparent 35px, rgba(255,255,255,0.008) 35px, rgba(255,255,255,0.008) 70px)` 
                   }}
                   onClick={() => setExpandedCard(expandedCard === 'mission' ? null : 'mission')}>
                <div className="flex items-center justify-center relative">
                  <h3 className="text-4xl font-extralight text-orange-200/90 text-center" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    MISSION
                  </h3>
                  <div className="absolute right-0">
                    <IoMdArrowDropdown className={`text-orange-200 text-2xl transition-transform duration-300 ${expandedCard === 'mission' ? 'rotate-180' : ''}`} style={{ strokeWidth: '0.5' }} />
                  </div>
                </div>
                {expandedCard === 'mission' && (
                  <div className="mt-4 text-gray-300 animate-fadeIn">
                    <p className="text-xl font-light">Delivering Secure, Scalable, and Impactful AI Solutions</p>
                    <div className="mt-4 space-y-3 border-t border-gray-700/50 pt-4">
                      <p className="leading-relaxed">
                        My mission is to leverage advanced technological capabilities and creative insights to develop intelligent, secure, and impactful solutions.
                      </p>
                      <p className="leading-relaxed">
                        By prioritizing user engagement, operational integrity, and strategic protection of innovations, I build intelligent ecosystems tailored to real-world needs. My comprehensive technical grounding in machine learning, deep learning, DevOps, and cybersecurity uniquely positions me to develop solutions that are not only sophisticated but also operationally sound and strategically aligned with organizational objectives.
                      </p>
                      <p className="leading-relaxed">
                        Each project I undertake is approached with a "Trust by Design" philosophy, integrating rigorous privacy measures, ethical AI frameworks, and operational integrity from the ground up. This ensures that every system I create remains secure, compliant, beneficial, and trustworthy at every level of operation.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Brain Section */}
      <div ref={brainRef} className="py-16 bg-slate-900">
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
                      <CloudflareImage
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
                      <CloudflareImage
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
              <div className="flex justify-between gap-3 mt-8 text-lg max-w-md mx-auto">
                <button
                  onClick={() => setSelectedBrainSide('left')}
                  className={`flex-1 text-center transition-all duration-300 group cursor-pointer px-4 py-3 rounded-lg relative overflow-hidden ${
                    selectedBrainSide === 'left' 
                      ? 'text-blue-400 scale-105 bg-blue-900/20 border border-blue-400/50 shadow-lg shadow-blue-400/20' 
                      : 'text-gray-400 hover:text-blue-300 border border-gray-600/30 hover:border-blue-400/30 hover:bg-blue-900/10'
                  }`}
                >
                  <TbCode className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-light">Tekkie</span>
                  {selectedBrainSide === 'left' && (
                    <div className="absolute inset-0 bg-blue-400/10 animate-pulse pointer-events-none rounded-lg"></div>
                  )}
                </button>
                <button
                  onClick={() => setSelectedBrainSide('right')}
                  className={`flex-1 text-center transition-all duration-300 group cursor-pointer px-4 py-3 rounded-lg relative overflow-hidden ${
                    selectedBrainSide === 'right' 
                      ? 'text-pink-400 scale-105 bg-pink-900/20 border border-pink-400/50 shadow-lg shadow-pink-400/20' 
                      : 'text-gray-400 hover:text-pink-300 border border-gray-600/30 hover:border-pink-400/30 hover:bg-pink-900/10'
                  }`}
                >
                  <TbPalette className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="font-light">Pantser</span>
                  {selectedBrainSide === 'right' && (
                    <div className="absolute inset-0 bg-pink-400/10 animate-pulse pointer-events-none rounded-lg"></div>
                  )}
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

      {/* Core Expertise Section */}
      <div ref={expertiseRef} className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-extralight mb-4 tracking-wide text-white scroll-animate ${expertiseInView ? "fade-in" : ""}`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Core <span className="text-orange-200/90">Expertise</span> & Technical Depth
            </h2>
            <p className={`text-gray-400 text-lg max-w-3xl mx-auto scroll-animate ${expertiseInView ? "fade-in" : ""}`}
               style={{ transitionDelay: "200ms" }}>
              Comprehensive technical grounding in machine learning, deep learning, DevOps, and cybersecurity,
              uniquely positioned to develop solutions that are sophisticated, operationally sound, and strategically aligned
            </p>
          </div>

          {/* Tab Navigation */}
          <div className={`flex flex-wrap justify-center gap-2 mb-8 md:mb-12 scroll-animate ${expertiseInView ? "fade-in" : ""}`}
               style={{ transitionDelay: "400ms" }}>
            <button
              onClick={() => setActiveExpertiseTab('ai')}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                activeExpertiseTab === 'ai'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-gray-800/40 text-gray-400 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <FaRobot className="w-4 h-4" />
              AI & Machine Learning
            </button>
            <button
              onClick={() => setActiveExpertiseTab('devops')}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                activeExpertiseTab === 'devops'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                  : 'bg-gray-800/40 text-gray-400 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <FaCloud className="w-4 h-4" />
              DevOps & Cloud
            </button>
            <button
              onClick={() => setActiveExpertiseTab('security')}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                activeExpertiseTab === 'security'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-gray-800/40 text-gray-400 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <FaShieldAlt className="w-4 h-4" />
              Security & Compliance
            </button>
            <button
              onClick={() => setActiveExpertiseTab('interdisciplinary')}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                activeExpertiseTab === 'interdisciplinary'
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30'
                  : 'bg-gray-800/40 text-gray-400 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <FaLightbulb className="w-4 h-4" />
              Interdisciplinary Insight
            </button>
            <button
              onClick={() => setActiveExpertiseTab('client')}
              className={`px-3 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg font-medium transition-all duration-300 flex items-center gap-2 transform hover:scale-105 ${
                activeExpertiseTab === 'client'
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                  : 'bg-gray-800/40 text-gray-400 hover:bg-gray-800/60 hover:text-white'
              }`}
            >
              <FaHandshake className="w-4 h-4" />
              Client-Focused Expertise
            </button>
          </div>

          {/* Tab Content */}
          <div className={`bg-gray-800/20 border border-gray-700/40 rounded-xl p-6 md:p-8 scroll-animate ${expertiseInView ? "fade-in" : ""} relative overflow-hidden`}
               style={{ 
                 transitionDelay: "600ms",
                 backgroundImage: `linear-gradient(135deg, rgba(59, 130, 246, 0.025) 0%, transparent 40%), 
                                  radial-gradient(circle at 90% 10%, rgba(249, 115, 22, 0.025) 0%, transparent 50%),
                                  repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.005) 10deg, transparent 20deg)`
               }}>
            {activeExpertiseTab === 'ai' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <FaRobot className="w-8 h-8 text-blue-400" />
                  <h3 className="text-2xl font-light text-blue-400">
                    End-to-End AI Development & Engineering Mastery
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaBrain className="w-5 h-5 text-blue-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Certified IBM AI Engineering Professional</span>, demonstrating comprehensive skills in Machine Learning (ML), Deep Learning (DL), and AI model deployment.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <FaCode className="w-5 h-5 text-blue-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Proven hands-on expertise</span> with PyTorch, TensorFlow, Keras, and Flask, developing complex applications like computer vision systems, intelligent chatbots, and ML-driven web integrations.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <FaServer className="w-5 h-5 text-blue-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Specialized in custom AI data infrastructure</span> including intelligent middleware, hybrid intelligence integrations, and optimized Big Data processing pipelines leveraging Apache Spark.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeExpertiseTab === 'devops' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <FaCloud className="w-8 h-8 text-green-400" />
                  <h3 className="text-xl sm:text-2xl font-light text-green-400">
                    DevOps, Cloud & Seamless AI Deployment
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaCogs className="w-5 h-5 text-green-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Certified in IBM DevOps & Software Engineering</span>, mastering Continuous Integration and Continuous Deployment (CI/CD), containerization technologies (Docker, Kubernetes), microservices architecture, and serverless implementations.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <FaNetworkWired className="w-5 h-5 text-green-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Extensive experience with leading cloud infrastructure providers</span> such as AWS, Google Cloud, Firebase, and Cloudflare, ensuring scalable, secure, and efficient production deployment.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeExpertiseTab === 'security' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <FaShieldAlt className="w-8 h-8 text-purple-400" />
                  <h3 className="text-xl sm:text-2xl font-light text-purple-400">
                    Robust Security & Compliance Integration
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaShieldAlt className="w-5 h-5 text-purple-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Google Cloud Cybersecurity Professional certification</span>, providing enterprise-grade capabilities in risk management, data protection, threat detection, and robust incident response.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <FaUserShield className="w-5 h-5 text-purple-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Expertise in adhering to rigorous compliance standards</span> (SOC 2 Type 2, HIPAA), and detailed understanding of Intellectual Property laws (copyright, patents, trademarks), safeguarding innovation.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeExpertiseTab === 'interdisciplinary' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <FaLightbulb className="w-8 h-8 text-orange-400" />
                  <h3 className="text-xl sm:text-2xl font-light text-orange-400">
                    Interdisciplinary Insight & Research-Driven AI
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaPencilAlt className="w-5 h-5 text-orange-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Bachelor of Arts (Honours) in English Literature and Creative Writing</span>, delivering unique capabilities in user-experience design, engaging content creation, and narrative-driven AI tools, particularly beneficial in educational contexts.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <FaGraduationCap className="w-5 h-5 text-orange-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Actively pursuing a Master of Science in Computer Science & AI</span>, authoring evidence-based academic papers such as "The Developing Reader" and "The Architecture of Learning," directly informing practical AI implementations grounded in cognitive and pedagogical science.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <FaMicroscope className="w-5 h-5 text-orange-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Notable research project "Behavioral Computer Vision for Child Health Monitoring"</span>, demonstrating validated, creative, behavioral AI innovations leveraging icon-based detection and synthetic data methodologies.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeExpertiseTab === 'client' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <FaHandshake className="w-8 h-8 text-pink-400" />
                  <h3 className="text-xl sm:text-2xl font-light text-pink-400">
                    Strategic Client Value & Sector-Focused Expertise
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaChartLine className="w-5 h-5 text-pink-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Based strategically in Abu Dhabi</span>, uniquely positioned to bridge innovative AI solutions with legacy governmental, educational, and enterprise infrastructures without disruption.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <FaCubes className="w-5 h-5 text-pink-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <div className="flex-1">
                      <p className="text-gray-300 leading-relaxed mb-3">
                        <span className="text-white font-medium">Specialized in:</span>
                      </p>
                      <ul className="space-y-2 ml-4">
                        <li className="text-gray-300">• AI-driven Business Process Automation</li>
                        <li className="text-gray-300">• Middleware for AI service orchestration</li>
                        <li className="text-gray-300">• Customized AI Data Infrastructure Systems</li>
                        <li className="text-gray-300">• Comprehensive Enterprise AI Integration Strategies</li>
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaHandshake className="w-5 h-5 text-pink-400 mr-4 mt-1 flex-shrink-0 opacity-20" />
                    <p className="text-gray-300 leading-relaxed">
                      <span className="text-white font-medium">Deep commitment to "Trust by Design"</span>, integrating rigorous privacy, ethical AI frameworks, and operational integrity, ensuring systems remain secure, compliant, beneficial, and trustworthy at every level of operation.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div ref={experienceRef} className="py-12 lg:py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl lg:text-5xl font-extralight mb-8 tracking-wide text-white`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              My <span className="text-orange-200/90">Journey</span>
            </h2>
          </div>

          <div className="relative">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-4 lg:gap-8 mb-8 lg:mb-16 group`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Mobile + Desktop - Image */}
                <div className="w-full lg:w-1/3 flex justify-center">
                  {exp.Icon && !exp.image && (
                    <div className="relative z-10 w-48 h-48 flex items-center justify-center">
                      <exp.Icon className={`${exp.Icon === FaBrain && exp.title.includes('MSCS') ? 'text-8xl animate-pulse' : 'text-6xl'} text-orange-200`} />
                    </div>
                  )}
                  {exp.image && (
                    <div className="relative z-10">
                      <CloudflareImage
                        src={exp.image}
                        alt={exp.title}
                        width={
                          exp.image === '/media/Google-Cloud-Cybersecurity-R7BXO2TQWXUF.png' ? 141 :  // 50% larger
                          exp.image === '/media/IBM-AI-Engineering-.png' ? 141 :  // 50% larger
                          exp.image === '/media/IBM-DevOps-and-Software-Engineering-4TC4UEGZSK8W.png' ? 141 :  // 50% larger
                          exp.image === '/media/Meta-Social-Media-Marketing-JY7ANRL9MXP4.png' ? 141 :  // 50% larger
                          exp.image === '/media/honsBAEngCrWr.png' ? 141 :  // 50% larger
                          exp.image === '/media/Introduction-to-Intellectual-Property-9J28V5QFZJVD.png' ? 106 :  // 25% smaller than certs
                          exp.image === '/media/Copyright-Law-PBM9KWDYVQBS.png' ? 106 :  // 25% smaller than certs
                          exp.image === '/media/Patent-Law-TLAMXN9739GY.png' ? 106 :  // 25% smaller than certs
                          exp.image === '/media/Trademark-Law-QE76LA26BZSW.png' ? 106 :  // 25% smaller than certs
                          exp.image === '/media/Brand-Management---Aligning-Business-Brand-and-Behaviour-59GB94DMXHQT.png' ? 106 :  // 25% smaller than certs
                          exp.image === '/media/Bookkeeping-Basics-ULPP2KDXC9VG.png' ? 106 :  // 25% smaller than certs
                          exp.image === 'brain-tekie-blue' ? 200 :  // Brain: bigger for MSCS
                          exp.image === 'vic20-computer' ? 225 :  // VIC-20: 20% bigger (225px)
                          exp.image === 'commodore64-setup' ? 225 :  // Commodore 64: 20% bigger (225px)
                          exp.image === 'desktop-computers' ? 225 :  // PC Towers: 20% bigger (225px)
                          exp.image === 'prowrite-document' ? 225 :  // ProWrite: 50% bigger (225px)
                          exp.imageOnly ? 75 :  // Other image-only: 50% smaller (75px)
                          exp.image === 'ethernet-wiring' ? 150 :  // Ethernet: keep as is (150px)
                          188  // All others: 25% larger (188px)
                        }
                        height={
                          exp.image === '/media/Google-Cloud-Cybersecurity-R7BXO2TQWXUF.png' ? 94 :  // 50% larger
                          exp.image === '/media/IBM-AI-Engineering-.png' ? 94 :  // 50% larger
                          exp.image === '/media/IBM-DevOps-and-Software-Engineering-4TC4UEGZSK8W.png' ? 94 :  // 50% larger
                          exp.image === '/media/Meta-Social-Media-Marketing-JY7ANRL9MXP4.png' ? 94 :  // 50% larger
                          exp.image === '/media/honsBAEngCrWr.png' ? 94 :  // 50% larger
                          exp.image === '/media/Introduction-to-Intellectual-Property-9J28V5QFZJVD.png' ? 71 :  // 25% smaller than certs
                          exp.image === '/media/Copyright-Law-PBM9KWDYVQBS.png' ? 71 :  // 25% smaller than certs
                          exp.image === '/media/Patent-Law-TLAMXN9739GY.png' ? 71 :  // 25% smaller than certs
                          exp.image === '/media/Trademark-Law-QE76LA26BZSW.png' ? 71 :  // 25% smaller than certs
                          exp.image === '/media/Brand-Management---Aligning-Business-Brand-and-Behaviour-59GB94DMXHQT.png' ? 71 :  // 25% smaller than certs
                          exp.image === '/media/Bookkeeping-Basics-ULPP2KDXC9VG.png' ? 71 :  // 25% smaller than certs
                          exp.image === 'brain-tekie-blue' ? 200 :  // Brain: bigger for MSCS
                          exp.image === 'vic20-computer' ? 150 :  // VIC-20: 20% bigger (150px)
                          exp.image === 'commodore64-setup' ? 150 :  // Commodore 64: 20% bigger (150px)
                          exp.image === 'desktop-computers' ? 150 :  // PC Towers: 20% bigger (150px)
                          exp.image === 'prowrite-document' ? 150:  // ProWrite: 50% bigger (75px)
                          exp.imageOnly ? 50 :  // Other image-only: 50% smaller (50px)
                          exp.image === 'ethernet-wiring' ? 100 :  // Ethernet: keep as is (100px)
                          125  // All others: 25% larger (125px)
                        }
                        className={`rounded-lg object-cover transition-all duration-300 hover:brightness-110 hover:shadow-2xl hover:shadow-orange-200/20 ${exp.image === 'brain-tekie-blue' ? 'animate-pulse drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]' : ''}`}
                      />
                    </div>
                  )}
                </div>

                {/* Timeline line - show for non-image-only entries on all screens */}
                {!exp.imageOnly && (
                  <div className="block w-px bg-gray-700 relative">
                    <div className="absolute -left-2 -top-2 w-5 h-5 bg-orange-200 rounded-full border-4 border-gray-900"></div>
                  </div>
                )}

                {/* Mobile + Desktop - Content */}
                <div className={`w-full ${exp.imageOnly ? 'lg:hidden' : 'lg:w-2/3 lg:pl-8'}`}>
                  {!exp.imageOnly && (
                    <>
                      <div className="text-orange-200 font-medium mb-2 text-center lg:text-left">
                        {exp.period}
                      </div>
                      
                      {exp.imageCaption && (
                        <div className="text-sm text-gray-400 whitespace-pre-line mb-4 text-center lg:text-left">
                          {exp.imageCaption}
                        </div>
                      )}
                      
                      <h3 className="text-xl lg:text-2xl font-medium text-white mb-2 text-center lg:text-left">
                        {exp.title}
                      </h3>
                      {exp.company && (
                        <div className="text-orange-200/80 mb-4 text-center lg:text-left">{exp.company}</div>
                      )}
                      {exp.location && (
                        <div className="text-gray-400 text-sm mb-4 text-center lg:text-left">{exp.location}</div>
                      )}
                      <p className="text-gray-300 mb-6 leading-relaxed text-center lg:text-left whitespace-pre-line">
                        {exp.description}
                      </p>

                      {exp.achievements.length > 0 && (
                        <div className="space-y-2">
                          {exp.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex items-start justify-center lg:justify-start">
                              <div className="w-1.5 h-1.5 bg-orange-200 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              <span className="text-gray-400 text-sm text-center lg:text-left">
                                {achievement}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
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

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        /* Enhanced hover transitions */
        .transition-all {
          transition-property: all;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}

export default AboutPage;
