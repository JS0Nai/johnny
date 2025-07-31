import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function BrandingPage() {
  const router = useRouter();
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);

  // State declarations
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("branding");
  const [brandsLoaded, setBrandsLoaded] = useState(false);

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [portfolioRef, portfolioInView] = useInView({ threshold: 0.2, triggerOnce: true });

  const menuItems = [
    { id: "home", label: "HOME", href: "/", subItems: [] },
    { id: "about", label: "ABOUT", href: "/about", subItems: [] },
    { id: "portfolio", label: "PORTFOLIO", href: "/portfolio", subItems: [] },
    { id: "projects", label: "PROJECTS", href: "/projects", subItems: [] },
    { id: "articles", label: "ARTICLES", href: "/articles", subItems: [] },
    { id: "resources", label: "RESOURCES", href: "/resources", subItems: [] },
    { id: "contact", label: "CONTACT", href: "/contact", subItems: [] },
  ];

  // Three.js brand animation setup
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 18);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = (Math.PI * 2) / 3;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Logo Configuration - placeholder URLs for now
    const LOGO_URLS = [
      'https://placehold.co/300x300/1a1a1a/ffffff?text=Brand+1',
      'https://placehold.co/300x300/3a3a3a/ffffff?text=Brand+2',
      'https://placehold.co/300x300/5a5a5a/ffffff?text=Brand+3',
      'https://placehold.co/300x300/7a7a7a/ffffff?text=Brand+4',
      'https://placehold.co/300x300/9a9a9a/000000?text=Brand+5',
      'https://placehold.co/300x300/bababa/000000?text=Brand+6',
      'https://placehold.co/300x300/dadada/000000?text=Brand+7',
      'https://placehold.co/300x300/fafafa/000000?text=Brand+8',
      'https://placehold.co/300x300/1a1a1a/ffffff?text=Brand+9',
      'https://placehold.co/300x300/3a3a3a/ffffff?text=Brand+10',
      'https://placehold.co/300x300/5a5a5a/ffffff?text=Brand+11',
      'https://placehold.co/300x300/7a7a7a/ffffff?text=Brand+12',
    ];

    const textureLoader = new THREE.TextureLoader();
    const logoMeshes = [];
    const clock = new THREE.Clock();

    // Create Logos
    LOGO_URLS.forEach((url, index) => {
      textureLoader.load(url, (texture) => {
        const geometry = new THREE.PlaneGeometry(1.5, 1.5);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.5,
        });
        const mesh = new THREE.Mesh(geometry, material);

        // Store animation properties
        mesh.userData.radius = 4 + Math.random() * 8;
        mesh.userData.speed = 0.05 + Math.random() * 0.15;
        mesh.userData.initialAngle = (index / LOGO_URLS.length) * Math.PI * 2;
        mesh.userData.yPosition = (Math.random() - 0.5) * 8;
        const scale = 0.8 + Math.random() * 0.8;
        mesh.scale.set(scale, scale, scale);

        logoMeshes.push(mesh);
        scene.add(mesh);
        
        if (logoMeshes.length === LOGO_URLS.length) {
          setBrandsLoaded(true);
        }
      });
    });

    // Animation Loop
    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      logoMeshes.forEach((mesh) => {
        const { radius, speed, initialAngle, yPosition } = mesh.userData;
        const angle = initialAngle + elapsedTime * speed;

        mesh.position.x = radius * Math.cos(angle);
        mesh.position.z = radius * Math.sin(angle);
        mesh.position.y = yPosition + Math.sin(elapsedTime * speed * 0.5) * 2;

        mesh.lookAt(camera.position);
      });

      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      renderer.dispose();
      controls.dispose();
    };
  }, []);

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

      {/* Hero Section with 3D Brand Animation */}
      <div ref={heroRef} className="relative h-screen">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }}
        />

        {/* Hero Text Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 text-center text-white bg-black bg-opacity-30 pointer-events-none">
          <div className={`pointer-events-auto scroll-animate ${heroInView ? "fade-in" : ""}`}>
            <h1 className="text-5xl font-light tracking-tight text-white md:text-7xl lg:text-8xl mb-4">
              Our Brand <span className="text-orange-200">Universe</span>
            </h1>
            <p className="max-w-2xl mt-6 text-lg text-gray-300 md:text-xl">
              We partner with a diverse galaxy of innovative brands, each a star in its own right. 
              Explore the ecosystem of excellence we've built together.
            </p>
            <div className="mt-10">
              <Link href="#services">
                <span className="inline-block px-8 py-4 text-lg font-light text-black bg-white rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-300 cursor-pointer">
                  Explore Services
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div ref={servicesRef} id="services" className="py-24 bg-slate-900 relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-5xl font-light text-white mb-4 text-center scroll-animate ${servicesInView ? "fade-in" : ""}`}>
            Branding <span className="text-orange-200">Services</span>
          </h2>
          <p className={`text-center text-gray-400 mb-12 text-lg scroll-animate ${servicesInView ? "fade-in" : ""}`} style={{ transitionDelay: '200ms' }}>
            Comprehensive brand development and visual identity solutions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "Visual Identity",
                description: "Logo design, color palettes, typography systems, and brand guidelines",
              },
              {
                icon: "📱",
                title: "Digital Branding",
                description: "Web presence, social media assets, and digital marketing materials",
              },
              {
                icon: "📊",
                title: "Brand Strategy",
                description: "Market positioning, brand messaging, and competitive analysis",
              },
              {
                icon: "🎯",
                title: "Brand Guidelines",
                description: "Comprehensive style guides and usage documentation",
              },
              {
                icon: "🚀",
                title: "Launch Campaigns",
                description: "Strategic rollout plans and marketing collateral",
              },
              {
                icon: "💡",
                title: "Creative Direction",
                description: "Ongoing brand evolution and creative consultation",
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`bg-gray-800/40 rounded-2xl p-8 border border-gray-700/50 hover:border-orange-200/50 transition-all duration-300 scroll-animate ${servicesInView ? "fade-in" : ""}`}
                style={{ transitionDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-light text-white mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div ref={portfolioRef} className="py-24 bg-gray-900 relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className={`text-5xl font-light text-white mb-4 text-center scroll-animate ${portfolioInView ? "fade-in" : ""}`}>
            Brand <span className="text-orange-200">Portfolio</span>
          </h2>
          <p className={`text-center text-gray-400 mb-12 text-lg scroll-animate ${portfolioInView ? "fade-in" : ""}`} style={{ transitionDelay: '200ms' }}>
            A selection of brand identities we've crafted
          </p>

          {/* Portfolio grid placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className={`bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 scroll-animate ${portfolioInView ? "fade-in" : ""}`}
                style={{ transitionDelay: `${(index + 2) * 50}ms` }}
              >
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Brand {item}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio">
              <span className="group inline-flex items-center gap-2 text-gray-400 text-lg tracking-widest hover:text-orange-200 transition-colors cursor-pointer">
                View Full Portfolio
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
      </div>

      {/* Contact CTA Section */}
      <div className="bg-slate-900 py-24 text-center relative z-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-8">
            Ready to build your <span className="text-orange-200">brand</span>?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Let's create something extraordinary together. Your brand deserves to shine.
          </p>
          <Link href="/contact">
            <span className="inline-block bg-orange-200 hover:bg-orange-300 text-gray-900 px-8 py-4 rounded-lg text-lg font-medium transition-colors cursor-pointer">
              Start Your Project
            </span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .scroll-animate.fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

export default BrandingPage;