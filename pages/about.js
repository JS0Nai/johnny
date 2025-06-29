import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import CloudflareImage from "../components/CloudflareImage";
import {
  SiAdobe,
  SiGoogle,
  SiOpenai,
  SiIbm,
  SiMeta,
  SiApple,
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
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiJavascript,
} from "react-icons/si";

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

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2 });
  const [storyRef, storyInView] = useInView({ threshold: 0.2 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.2 });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.2 });
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
      items: ["AWS", "Firebase", "Docker", "Git", "CI/CD", "Cloudflare"],
    },
    {
      category: "Databases",
      items: ["MongoDB", "MySQL", "PostgreSQL", "Redis"],
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

  const experiences = [
    {
      period: "2020 - Present",
      title: "Creative Technologist & AI Specialist",
      company: "Freelance / Monarkh",
      location: "Abu Dhabi, UAE",
      description:
        "Leading creative projects combining AI technology with traditional design. Specializing in generative AI, custom development, and innovative digital solutions.",
      achievements: [
        "Generated 13K+ AI images using various platforms",
        "Built 100+ commercial projects with custom coding",
        "Licensed 10K+ image assets for commercial use",
        "Developed 50K+ photography collection",
      ],
    },
    {
      period: "2018 - 2020",
      title: "Full Stack Developer",
      company: "Previous Company",
      location: "Remote",
      description:
        "Developed web applications and digital solutions with focus on user experience and performance optimization.",
      achievements: [
        "Built scalable web applications",
        "Optimized performance by 40%",
        "Led team of 5 developers",
        "Implemented DevOps practices",
      ],
    },
    {
      period: "2016 - 2018",
      title: "Digital Designer",
      company: "Design Agency",
      location: "UAE",
      description:
        "Created digital designs and visual identities for various clients across different industries.",
      achievements: [
        "Designed 200+ digital assets",
        "Worked with Fortune 500 companies",
        "Increased client satisfaction by 35%",
        "Mentored junior designers",
      ],
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
            ABOUT ME
          </h1>

          <h2
            className={`text-white text-xl md:text-2xl font-light mb-8 leading-relaxed max-w-3xl mx-auto scroll-animate-left ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            Creative technologist passionate about the intersection of AI,
            design, and development
          </h2>

          <div
            className={`text-gray-400 text-lg max-w-2xl mx-auto scroll-animate-right ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "400ms" }}
          >
            Crafting digital experiences through innovative technology and
            artistic vision
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
              src="jli-signature1000"
              alt="John Li"
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
                  I'm a creative technologist based in Abu Dhabi, UAE, where I
                  blend the worlds of artificial intelligence, design, and
                  development to create innovative digital experiences.
                </p>

                <p>
                  My journey began with traditional design and photography, but
                  I quickly became fascinated by the potential of emerging
                  technologies. Today, I specialize in generative AI, having
                  created over 13,000 AI-generated images and licensed more than
                  10,000 assets for commercial use.
                </p>

                <p>
                  What drives me is the pursuit of creative freedom and the
                  challenge of improving how things work. Whether I'm developing
                  custom applications, creating visual content, or exploring new
                  AI tools, I approach each project with curiosity and a
                  commitment to pushing boundaries.
                </p>

                <p>
                  When I'm not coding or creating, you'll find me exploring the
                  intersection of technology and art, always looking for the
                  next breakthrough that will transform how we interact with
                  digital experiences.
                </p>
              </div>
            </div>

            <div
              className={`space-y-8 scroll-animate ${storyInView ? "fade-in" : ""}`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="bg-gray-800/40 p-8 rounded-lg">
                <h3 className="text-2xl font-light text-white mb-4">
                  Philosophy
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  "Creative freedom and the pursuit of improving how things
                  work" - this drives everything I do. I believe technology
                  should enhance human creativity, not replace it.
                </p>
              </div>

              <div className="bg-gray-800/40 p-8 rounded-lg">
                <h3 className="text-2xl font-light text-white mb-4">Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To bridge the gap between cutting-edge technology and
                  practical applications, creating solutions that are both
                  innovative and accessible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div ref={skillsRef} className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-5xl font-extralight mb-8 tracking-wide text-white scroll-animate ${skillsInView ? "fade-in" : ""}`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Skills & <span className="text-orange-200/90">Expertise</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <div
                key={index}
                className={`bg-gray-800/40 p-6 rounded-lg scroll-animate ${skillsInView ? "fade-in" : ""}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <h3 className="text-xl font-medium text-white mb-4">
                  {skillGroup.category}
                </h3>
                <div className="space-y-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-orange-200 rounded-full mr-3"></div>
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div ref={experienceRef} className="py-24 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2
              className={`text-5xl font-extralight mb-8 tracking-wide text-white scroll-animate ${experienceInView ? "fade-in" : ""}`}
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Professional <span className="text-orange-200/90">Journey</span>
            </h2>
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-8 border-l-2 border-gray-700 pl-8 scroll-animate ${experienceInView ? "fade-in" : ""}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="lg:w-1/4">
                  <div className="text-orange-200 font-medium mb-2">
                    {exp.period}
                  </div>
                  <div className="text-gray-400 text-sm">{exp.location}</div>
                </div>

                <div className="lg:w-3/4">
                  <h3 className="text-2xl font-medium text-white mb-2">
                    {exp.title}
                  </h3>
                  <div className="text-orange-200/80 mb-4">{exp.company}</div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-orange-200 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-400 text-sm">
                          {achievement}
                        </span>
                      </div>
                    ))}
                  </div>
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

export default AboutPage;
