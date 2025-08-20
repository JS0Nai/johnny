import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useInView } from "../hooks/useInView";
import Header from "../components/Header";
import Footer from "../components/Footer";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import CloudflareImage from "../components/CloudflareImage";
import { menuItems } from "../config/menuItems";

// Environment detection
const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined;
const cloudflareAccountHash = 'afekpjgU7bwy8XYMt0lA2Q';
const variant = 'public';

// Helper function to get proper image URL
function getImageUrl(imageName) {
  if (isDevelopment) {
    return `/media/${imageName}.png`;
  } else {
    // In production, use Cloudflare CDN
    return `https://imagedelivery.net/${cloudflareAccountHash}/${imageName}/${variant}`;
  }
}

// Logo Configuration - separate for animation and portfolio
const ANIMATION_LOGO_NAMES = [
  'fctnlle',
  'bA', // was ezrsvplogosngl
  'p-icon',
  'logo_800-200',
  'monarkh', // was icogo150
  'signature-logo-wht',
  'lo-faa',
  'book-logo-2',
  'lo-fareve', // was feve
  'lo-fas', // was ffash
  'jaison',
  'ab-8',
  'ag-b', // was agb
  'Bb_logo', // new addition
  'ffashEm', // new addition
];

// Portfolio specific logos (some are different from animation)
const PORTFOLIO_LOGO_NAMES = [
  'log-fasb',
  'bA', // was ezrsvplogosngl
  'p-icon',
  'monarkh', // was logo_800-200
  'wck', // was icogo150
  'ab-8', // was signature-logo-wht
  'Bb_logo',
  'ag-b', // was agb
];

// Get full URLs for Three.js animation
const LOGO_URLS = ANIMATION_LOGO_NAMES.map(name => getImageUrl(name));

function BrandingPage() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const frameRef = useRef(null);

  // State declarations
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("branding");

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [portfolioRef, portfolioInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [designRef, designInView] = useInView({ threshold: 0.1, triggerOnce: true });


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

    const textureLoader = new THREE.TextureLoader();
    const logoMeshes = [];
    const clock = new THREE.Clock();

    // Create Logos
    LOGO_URLS.forEach((url, index) => {
      textureLoader.load(url, (texture) => {
        // Calculate aspect ratio to preserve original dimensions
        const imageAspect = texture.image.width / texture.image.height;
        const planeWidth = 1.5;
        const planeHeight = planeWidth / imageAspect;
        
        const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
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
        
        // Make Bb_logo larger to match other round logos
        let scale = 0.8 + Math.random() * 0.8;
        if (url.includes('Bb_logo')) {
          scale = 1.5 + Math.random() * 0.3; // Larger scale for Bb_logo
        }
        mesh.scale.set(scale, scale, scale);

        logoMeshes.push(mesh);
        scene.add(mesh);
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
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 text-center text-white bg-black bg-opacity-5 pointer-events-none">
          <div className={`pointer-events-auto scroll-animate ${heroInView ? "fade-in" : ""}`}>
            <h1 className="text-5xl font-light tracking-tight text-white md:text-7xl lg:text-8xl mb-4">
              Branding <span className="text-orange-200">& Design</span>
            </h1>
            <p className="max-w-2xl mt-6 text-lg text-gray-300 md:text-xl">
              Promotional content and innovative design.
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
            A selection of brand identities.
          </p>

          {/* Portfolio grid with actual logos */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {PORTFOLIO_LOGO_NAMES.map((logoName, index) => (
              <div
                key={index}
                className={`bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 scroll-animate ${portfolioInView ? "fade-in" : ""}`}
                style={{ transitionDelay: `${(index + 2) * 50}ms` }}
              >
                <div className="bg-gray-800 flex items-center justify-center p-6" style={{ minHeight: '200px' }}>
                  <CloudflareImage 
                    src={logoName} 
                    alt={`Brand ${index + 1}`}
                    width={400}
                    height={400}
                    className="max-w-full max-h-full object-contain"
                    style={{ maxHeight: '180px', width: 'auto' }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Design Section */}
      <div ref={designRef} className="py-24 bg-slate-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-5xl font-light text-white mb-4 text-center scroll-animate ${designInView ? "fade-in" : ""}`}>
            Design <span className="text-orange-200">Portfolio</span>
          </h2>
          <p className={`text-center text-gray-400 mb-12 text-lg max-w-3xl mx-auto scroll-animate ${designInView ? "fade-in" : ""}`} style={{ transitionDelay: '200ms' }}>
            Apparel, merchandise, websites, web and mobile apps, social media, advertising, custom and conceptual art.
          </p>

          {/* Design showcase grid - responsive with varied sizes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
            {[
              { name: '404-page', ext: 'png' },
              { name: 'apparel-creepy', ext: 'PNG' },
              { name: 'apparel-hollow', ext: 'PNG' },
              { name: 'apparel-shoes', ext: 'PNG' },
              { name: 'art-print', ext: 'png' },
              { name: 'bdaybkcvr', ext: 'jpeg' },
              { name: 'blngstobk', ext: 'png' },
              { name: 'halloscene', ext: 'png' },
              { name: 'IG-Ad-Creative_', ext: 'png' },
              { name: 'lo-fareve', ext: 'png' },
              { name: 'Oil-Painting-Portrait-Realistic-Abstract', ext: 'jpg' },
              { name: 'pbwsh', ext: 'png' },
              { name: 'phoneback', ext: 'png' },
              { name: 'pillows', ext: 'png' },
              { name: 'portalpage_blnk_ht-i', ext: 'jpg' },
              { name: 'strybook', ext: 'png' },
              { name: 'sweetsplash', ext: 'png' },
              { name: 'toonify', ext: 'jpg' },
              { name: 'Tote-bag', ext: 'png' },
              { name: 'trcktrt', ext: 'jpg' },
              { name: 'tshirt-daisy-Beethvn-black', ext: 'jpg' },
              { name: 'virtual-webpage', ext: 'jpg' },
              { name: 'vnstbks', ext: 'jpg' },
              { name: 'genexpan', ext: 'png' },
              { name: 'pbwhappscrn', ext: 'png' },
              { name: 'lo-fifi', ext: 'png' },
              { name: 'notebook', ext: 'png' },
              { name: 'book-page', ext: 'png' },
              { name: 'night-sky', ext: 'png' },
              { name: 'blackwolf-forest', ext: 'png' },
              { name: 'leggings', ext: 'png', fullWidth: true },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.fullWidth ? 'col-span-full flex justify-center' : ''} bg-gray-800 rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer group opacity-100`}
                style={{ minHeight: '150px' }}
              >
                <div className={`relative w-full ${item.fullWidth ? 'aspect-[8/3] max-w-4xl mx-auto' : 'aspect-[4/3]'}`}>
                  {isDevelopment ? (
                    <img 
                      src={`/media/${item.name}.${item.ext}`}
                      alt={`Design ${index + 1}`}
                      className={`w-full h-full ${item.fullWidth ? 'object-cover' : 'object-contain'}`}
                      loading="lazy"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  ) : (
                    <img 
                      src={`https://imagedelivery.net/${cloudflareAccountHash}/${item.name}/${variant}`}
                      alt={`Design ${index + 1}`}
                      className={`w-full h-full ${item.fullWidth ? 'object-cover' : 'object-contain'}`}
                      loading="lazy"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="bg-slate-900 py-24 text-center relative z-20 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-light text-white mb-12">
            Ready to <span className="text-orange-200">Build</span>?
          </h2>
          <Link href="/contact">
            <span className="inline-block bg-orange-200 hover:bg-orange-300 text-gray-900 px-8 py-4 rounded-lg text-lg font-medium transition-colors cursor-pointer">
              Start A Project
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