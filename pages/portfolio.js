import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useInView } from "../hooks/useInView";
import { motion, AnimatePresence } from "framer-motion";

import CloudflareImage from "../components/CloudflareImage";
import Header from "../components/Header";


function PortfolioPage() {
  const router = useRouter();

  // State declarations
  const [showHeader, setShowHeader] = useState(false);
  const [showSubheader, setShowSubheader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("portfolio");
  const [showImage, setShowImage] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  // InView hooks
  const [heroRef, heroInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [galleryRef, galleryInView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [newsletterRef, newsletterInView] = useInView({ threshold: 0.2, triggerOnce: true });

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

  // State for view mode
  const [viewMode, setViewMode] = useState('grid'); // grid, masonry, infinite
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [likedItems, setLikedItems] = useState(new Set());

  // Handle like functionality
  const handleLike = (itemId) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      // Store in localStorage
      localStorage.setItem('likedItems', JSON.stringify([...newSet]));
      return newSet;
    });
  };

  // Load liked items from localStorage on component mount
  useEffect(() => {
    const stored = localStorage.getItem('likedItems');
    if (stored) {
      setLikedItems(new Set(JSON.parse(stored)));
    }
  }, []);


  // Image portfolio data with classifications and tags
  const portfolioItems = [
    // Fantasy & Mythical Art / Character Design
    { id: 1, title: "Misty Witch", category: "fantasy", image: "mistywitch", description: "Mystical witch character with ethereal atmosphere", tags: ["Witch", "Mystic", "Magic", "Fantasy Art", "Character Design", "Dark Fantasy", "Woman", "Portrait"], gridSize: "medium" },
    { id: 2, title: "Model Witch", category: "fantasy", image: "modelwitch", description: "Dark art witch character study", tags: ["Witch", "Dark Art", "Fantasy", "Character Study", "Mysterious", "Woman", "Portrait"], gridSize: "medium" },
    { id: 3, title: "Pretty Witch", category: "fantasy", image: "prettywitch", description: "Elegant witch character design", tags: ["Witch", "Fantasy Portrait", "Character Design", "Abstract", "Female"], gridSize: "medium" },
    { id: 4, title: "Witch Princess", category: "fantasy", image: "witchprincess", description: "Royal witch character with magical elements", tags: ["Witch", "Princess", "Fantasy", "Character Design", "Magic", "Royal"], gridSize: "large" },
    { id: 5, title: "Sea Demon", category: "fantasy", image: "seademon", description: "Aquatic creature from the depths", tags: ["Sea Monster", "Demon", "Aquatic Creature", "Tentacles", "Underwater Art", "Dark Fantasy"], gridSize: "large" },
    { id: 6, title: "The Wraith", category: "fantasy", image: "thewraith", description: "Ethereal spirit character", tags: ["Spirit", "Wraith", "Fantasy", "Dark Art", "Ethereal", "Character Design"], gridSize: "medium" },
    { id: 7, title: "Doll Portrait", category: "fantasy", image: "dollyparts", description: "Stylized doll character with unique features", tags: ["Doll", "Stylized", "Character Design", "Fantasy Art", "Illustrative", "Female Portrait"], gridSize: "medium" },
    { id: 8, title: "Model Doll", category: "fantasy", image: "modeldoll", description: "Fashion doll character concept", tags: ["Doll", "Model", "Fashion", "Character Design", "Stylized", "Portrait"], gridSize: "medium" },
    { id: 9, title: "Model Princess", category: "fantasy", image: "modelprincess", description: "Royal character design with modern twist", tags: ["Princess", "Model", "Character Design", "Fantasy", "Royal", "Fashion"], gridSize: "large" },
    { id: 10, title: "Plastic Doll", category: "fantasy", image: "plasticdoll", description: "Synthetic beauty character concept", tags: ["Doll", "Plastic", "Synthetic", "Character Design", "Stylized", "Futuristic"], gridSize: "medium" },
    { id: 11, title: "Art of Girl", category: "fantasy", image: "artofgirl", description: "Artistic female character interpretation", tags: ["Art", "Girl", "Character Design", "Stylized", "Portrait", "Fantasy"], gridSize: "medium" },
    { id: 12, title: "Stallion", category: "fantasy", image: "stallion", description: "Majestic horse in fantasy style", tags: ["Horse", "Stallion", "Fantasy", "Animal Art", "Majestic", "Digital Art"], gridSize: "large" },
    { id: 13, title: "Figure Skater", category: "fantasy", image: "figureskater", description: "Graceful character in motion", tags: ["Figure Skater", "Character Design", "Movement", "Grace", "Fantasy", "Sport"], gridSize: "medium" },
    
    // Portrait & Expression Art
    { id: 14, title: "Mouthy", category: "portrait", image: "mouthy", description: "Expressive mouth study", tags: ["Abstract Body Art", "Expressive Art", "Pop Art", "Graphic Illustration", "Stylized Anatomy", "Surreal Art", "Vibrant Colors"], gridSize: "small" },
    { id: 15, title: "Bright Eyes", category: "portrait", image: "brighteyes", description: "Luminous eye study", tags: ["Eyes", "Portrait", "Light Study", "Expression", "Digital Art"], gridSize: "small" },
    { id: 16, title: "Eye Balling", category: "portrait", image: "eyeballing", description: "Intense gaze portrait", tags: ["Eye Study", "Portrait", "Expression", "Intense", "Digital Art"], gridSize: "small" },
    { id: 17, title: "Green Closeup", category: "portrait", image: "greencloseup", description: "Detailed portrait with green tones", tags: ["Portrait", "Closeup", "Green", "Detail", "Character Study"], gridSize: "medium" },
    { id: 18, title: "No Freckles", category: "portrait", image: "nofreckles", description: "Clean portrait study", tags: ["Portrait", "Clean", "Character Study", "Digital Art", "Face"], gridSize: "medium" },
    { id: 19, title: "Pencil Hair", category: "portrait", image: "pencilhair", description: "Artistic hair study in pencil style", tags: ["Hair Study", "Pencil Art", "Portrait", "Artistic", "Drawing Style"], gridSize: "medium" },
    { id: 20, title: "Pencil Portrait", category: "portrait", image: "pencilportrait", description: "Classic pencil portrait technique", tags: ["Pencil Art", "Portrait", "Classic", "Drawing", "Traditional Style"], gridSize: "medium" },
    { id: 21, title: "Photogenia", category: "portrait", image: "photogenia", description: "Photogenic portrait study", tags: ["Portrait", "Photogenic", "Beauty", "Digital Art", "Character Study"], gridSize: "medium" },
    { id: 22, title: "Senorita 3", category: "portrait", image: "senorita3", description: "Elegant female portrait", tags: ["Portrait", "Senorita", "Elegant", "Female", "Character Study"], gridSize: "medium" },
    { id: 23, title: "Thoughts", category: "portrait", image: "thoughts", description: "Contemplative portrait", tags: ["Portrait", "Contemplative", "Thoughts", "Expression", "Mood"], gridSize: "medium" },
    
    // Emotional & Expressive Art
    { id: 24, title: "Cry", category: "emotional", image: "cry", description: "Emotional expression of sadness", tags: ["Emotion", "Cry", "Sadness", "Expression", "Digital Art"], gridSize: "small" },
    { id: 25, title: "Fright", category: "emotional", image: "fright", description: "Expression of fear and surprise", tags: ["Emotion", "Fear", "Fright", "Expression", "Digital Art"], gridSize: "small" },
    { id: 26, title: "Fuming", category: "emotional", image: "fuming", description: "Anger and frustration expression", tags: ["Emotion", "Anger", "Fuming", "Expression", "Digital Art"], gridSize: "small" },
    { id: 27, title: "Broken", category: "emotional", image: "broken", description: "Emotional fragmentation concept", tags: ["Emotion", "Broken", "Conceptual", "Abstract", "Expression"], gridSize: "medium" },
    { id: 28, title: "Stanky", category: "emotional", image: "stanky", description: "Disgust expression study", tags: ["Emotion", "Disgust", "Expression", "Digital Art", "Character Study"], gridSize: "small" },
    
    // Nature & Animal Art
    { id: 29, title: "Bee", category: "nature", image: "bee", description: "Detailed bee illustration", tags: ["Bee", "Insect", "Nature", "Wildlife", "Digital Art"], gridSize: "small" },
    { id: 30, title: "Batty", category: "nature", image: "batty", description: "Whimsical bat character", tags: ["Bat", "Animal", "Wildlife", "Character Design", "Whimsical"], gridSize: "small" },
    { id: 31, title: "Spider's Cousin", category: "nature", image: "spiderscousin", description: "Arachnid-inspired creature", tags: ["Spider", "Arachnid", "Creature Design", "Nature", "Fantasy"], gridSize: "medium" },
    { id: 32, title: "Tigger", category: "nature", image: "tigger", description: "Tiger character design", tags: ["Tiger", "Animal", "Character Design", "Wildlife", "Playful"], gridSize: "medium" },
    { id: 33, title: "Beethoven's Flower", category: "nature", image: "BeethovensFlower", description: "Artistic floral interpretation", tags: ["Flower", "Beethoven", "Art", "Nature", "Abstract", "Musical Theme"], gridSize: "large" },
    
    // Abstract & Conceptual
    { id: 34, title: "Simple Chaos", category: "abstract", image: "simplechaos", description: "Organized disorder concept", tags: ["Abstract", "Chaos", "Conceptual", "Modern Art", "Digital"], gridSize: "large" },
    { id: 35, title: "Virtually Nothing", category: "abstract", image: "virtuallynothing", description: "Minimalist virtual concept", tags: ["Abstract", "Virtual", "Minimalist", "Conceptual", "Digital Art"], gridSize: "medium" },
    { id: 36, title: "Colorful Drawing", category: "abstract", image: "colorfuldrawing", description: "Vibrant abstract composition", tags: ["Abstract", "Colorful", "Drawing", "Vibrant", "Art"], gridSize: "large" },
    { id: 37, title: "Canvas", category: "abstract", image: "canvas", description: "Raw artistic expression", tags: ["Canvas", "Abstract", "Art", "Raw", "Expression"], gridSize: "medium" },
    { id: 38, title: "Lava Splash", category: "abstract", image: "lavasplash", description: "Dynamic molten art", tags: ["Lava", "Abstract", "Dynamic", "Hot", "Movement"], gridSize: "large" },
    { id: 39, title: "Influence", category: "abstract", image: "influence", description: "Abstract concept of influence", tags: ["Abstract", "Influence", "Conceptual", "Modern Art", "Digital"], gridSize: "medium" },
    { id: 40, title: "Zero Naps", category: "abstract", image: "zeronaps", description: "Sleepless concept art", tags: ["Abstract", "Concept", "Sleepless", "Modern", "Digital Art"], gridSize: "small" },
    
    // Landscape & Environmental
    { id: 41, title: "Mountain Path", category: "landscape", image: "mountainpath", description: "Surreal mountain landscape", tags: ["Mountain", "Landscape", "Path", "Surreal", "Nature"], gridSize: "large" },
    { id: 42, title: "Cliff Hanger", category: "landscape", image: "cliffhanger", description: "Dramatic cliff scene", tags: ["Cliff", "Landscape", "Dramatic", "Nature", "Adventure"], gridSize: "large" },
    { id: 43, title: "Sky", category: "landscape", image: "sky", description: "Ethereal sky study", tags: ["Sky", "Landscape", "Ethereal", "Nature", "Atmospheric"], gridSize: "medium" },
    { id: 44, title: "Green Sun", category: "landscape", image: "greensun", description: "Surreal sun landscape", tags: ["Sun", "Landscape", "Surreal", "Green", "Fantasy"], gridSize: "medium" },
    { id: 45, title: "Sun Gaze", category: "landscape", image: "sungaze", description: "Solar observation art", tags: ["Sun", "Gaze", "Landscape", "Light", "Atmospheric"], gridSize: "medium" },
    { id: 46, title: "Lonely Moon", category: "landscape", image: "lonelymoon", description: "Solitary lunar scene", tags: ["Moon", "Lonely", "Night", "Landscape", "Atmospheric"], gridSize: "large" },
    { id: 47, title: "Gold Moon", category: "landscape", image: "goldmoon", description: "Golden lunar artwork", tags: ["Moon", "Gold", "Night", "Landscape", "Fantasy"], gridSize: "medium" },
    { id: 48, title: "Western Scenery", category: "landscape", image: "westernscenery", description: "Western landscape vista", tags: ["Western", "Landscape", "Scenery", "Desert", "Nature"], gridSize: "large" },
    { id: 49, title: "Street Scene", category: "landscape", image: "streetscene", description: "Urban street perspective", tags: ["Street", "Urban", "Scene", "City", "Architecture"], gridSize: "medium" },
    { id: 50, title: "Window Shopping", category: "landscape", image: "windowshopping", description: "Urban retail scene", tags: ["Urban", "Shopping", "Window", "City", "Street"], gridSize: "medium" },
    
    // Character Studies
    { id: 51, title: "Mystique", category: "character", image: "mystique", description: "Mysterious character portrait", tags: ["Mystique", "Character", "Mystery", "Portrait", "Fantasy"], gridSize: "medium" },
    { id: 52, title: "Akkiro", category: "character", image: "akkiro", description: "Unique character design", tags: ["Character", "Akkiro", "Design", "Fantasy", "Original"], gridSize: "medium" },
    { id: 53, title: "Blue Mystic", category: "character", image: "bluemystic", description: "Blue-themed mystical character", tags: ["Mystic", "Blue", "Character", "Fantasy", "Magic"], gridSize: "medium" },
    { id: 54, title: "Doli", category: "character", image: "doli", description: "Charming character portrait", tags: ["Character", "Doli", "Portrait", "Cute", "Design"], gridSize: "small" },
    { id: 55, title: "Luminous", category: "character", image: "luminous", description: "Glowing character concept", tags: ["Luminous", "Character", "Glow", "Light", "Fantasy"], gridSize: "medium" },
    { id: 56, title: "Little Watercolor", category: "character", image: "littlewatercolor", description: "Watercolor style character", tags: ["Watercolor", "Character", "Art Style", "Soft", "Portrait"], gridSize: "small" },
    { id: 57, title: "Lost Count", category: "character", image: "lostcount", description: "Confused character expression", tags: ["Character", "Expression", "Confused", "Portrait", "Emotion"], gridSize: "small" },
    { id: 58, title: "Maitre D", category: "character", image: "maitred", description: "Sophisticated character design", tags: ["Character", "Maitre D", "Sophisticated", "Service", "Portrait"], gridSize: "medium" },
    { id: 59, title: "No Mas", category: "character", image: "nomas", description: "Exhausted character study", tags: ["Character", "Exhausted", "Expression", "No Mas", "Emotion"], gridSize: "small" },
    { id: 60, title: "Parade", category: "character", image: "parade", description: "Festive character scene", tags: ["Character", "Parade", "Festive", "Celebration", "Scene"], gridSize: "large" },
    { id: 61, title: "The Orient", category: "character", image: "theorient", description: "Eastern-inspired character", tags: ["Character", "Orient", "Eastern", "Cultural", "Design"], gridSize: "medium" },
    { id: 62, title: "Surreal Product Photoshoot", category: "character", image: "surrealproductphotoshoot", description: "Surreal character in product context", tags: ["Surreal", "Product", "Photoshoot", "Character", "Commercial"], gridSize: "large" },
    
    // Tech & Retro

    // Note: Removed website assets (logos, profile pics, signatures) from gallery
    // These are used for site branding and navigation, not portfolio pieces
  ];

  // Get unique categories from portfolio items
  const categories = ["all", ...new Set(portfolioItems.map(item => item.category))];
  
  // Get all unique tags
  const allTags = [...new Set(portfolioItems.flatMap(item => item.tags))];
  
  // Filter images by category, search term, and tags
  const filteredItems = portfolioItems.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => item.tags.includes(tag));
    
    return matchesCategory && matchesSearch && matchesTags;
  });

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Lightbox functions
  const openLightbox = (item) => {
    setSelectedImage(item);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  // Close lightbox on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isLightboxOpen) {
        closeLightbox();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isLightboxOpen]);

  // Shuffle function for better visual mixing
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Create stable shuffled arrays that don't change on re-render
  const [shuffledGridItems, setShuffledGridItems] = useState([]);
  const [shuffledMasonryItems, setShuffledMasonryItems] = useState([]);
  const [col1Items, setCol1Items] = useState([]);
  const [col2Items, setCol2Items] = useState([]);
  const [col3Items, setCol3Items] = useState([]);

  // Initialize shuffled arrays only once when filteredItems changes
  useEffect(() => {
    if (filteredItems.length > 0) {
      setShuffledGridItems(shuffleArray(filteredItems));
      setShuffledMasonryItems(shuffleArray(filteredItems));
      setCol1Items(shuffleArray(filteredItems));
      setCol2Items(shuffleArray(filteredItems));
      setCol3Items(shuffleArray(filteredItems));
    }
  }, [filteredItems.length, selectedCategory, searchTerm]);

  // For pagination
  const itemsPerPage = viewMode === 'infinite' ? filteredItems.length : 15;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Use appropriate shuffled array based on view mode
  const getItemsForView = () => {
    if (viewMode === 'grid') return shuffledGridItems;
    if (viewMode === 'masonry') return shuffledMasonryItems;
    return filteredItems; // infinite scroll uses col arrays directly
  };
  
  const itemsToShow = getItemsForView();
  const currentItems = viewMode === 'infinite' ? itemsToShow : itemsToShow.slice(indexOfFirstItem, indexOfLastItem);

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
      {/* Header */}
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        menuItems={menuItems}
      />

      {/* Hero Section with Video */}
      <div
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsHoveringHero(true)}
        onMouseLeave={() => setIsHoveringHero(false)}
      >
        {/* Background - either image or video */}
        <div className="absolute inset-0 bg-black">
          {isHoveringHero ? (
            <video
              src="/media/dist-op.mp4"
              className="absolute inset-0 w-full h-full object-contain"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <CloudflareImage
              src="dist-op"
              alt="Hero background"
              width={1920}
              height={1080}
              className="absolute inset-0 w-full h-full object-contain"
            />
          )}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto text-center px-4">
          <h1
            className={`text-7xl md:text-8xl font-extralight tracking-wide text-white mb-6 scroll-animate ${heroInView ? "fade-in" : ""}`}
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <span className="text-orange-200/90">Creative</span> Gallery
          </h1>

          <h2
            className={`text-gray-200 text-xl md:text-2xl font-light mb-8 leading-relaxed max-w-3xl mx-auto scroll-animate-left ${heroInView ? "fade-in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            Explore my collection of AI art, character designs, digital creations,
            and creative experiments across various themes and styles
          </h2>

        </div>
      </div>

      {/* Controls Section */}
      <div className="max-w-6xl mx-auto px-4 py-8">
          {/* View Mode Toggle */}
          <div
            className={`flex justify-center gap-2 mb-8`}
            style={{ transitionDelay: "300ms" }}
          >
            {['grid', 'masonry', 'infinite'].map(mode => (
              <button
                key={mode}
                onClick={() => {
                  setViewMode(mode);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  viewMode === mode 
                    ? 'bg-orange-200 text-gray-900' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div
            className={`max-w-2xl mx-auto mb-8`}
          >
            <input
              type="text"
              placeholder="Search by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-6 py-3 bg-gray-800/50 text-gray-300 placeholder-gray-500
                       border border-gray-700 rounded-full focus:border-orange-200 focus:outline-none
                       transition-colors"
            />
          </div>

          {/* Category Filters */}
          <div
            className={`flex flex-wrap justify-center gap-3 mb-4`}
          >
            {categories.map(category => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-orange-200 to-pink-200 text-gray-900'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 backdrop-blur-sm'
                }`}
              >
                {category === 'all' ? 'All Works' : category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-gray-500 text-sm text-center">
            Showing {filteredItems.length} {filteredItems.length === 1 ? 'work' : 'works'} | Category: {selectedCategory} | View: {viewMode}
          </div>
      </div>

      {/* Gallery Section */}
      <div ref={galleryRef} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            {/* Grid View */}
            {viewMode === 'grid' && (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              >
                {currentItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => openLightbox(item)}
                  >
                    <div className="aspect-square relative">
                      <CloudflareImage
                        src={item.image}
                        alt={item.title}
                        width={400}
                        height={400}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                      >
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="text-xs px-2 py-1 bg-white/20 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* Interactive Elements */}
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2"
                        >
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLike(item.id);
                            }}
                            className={`w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg ${
                              likedItems.has(item.id) ? 'text-red-500' : 'text-gray-700'
                            }`}
                            title={likedItems.has(item.id) ? "Remove from favorites" : "Add to favorites"}
                          >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill={likedItems.has(item.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              // Navigate to shop page with this item
                              router.push(`/shop?item=${item.id}`);
                            }}
                            className="w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg text-gray-700"
                            title="View in shop"
                          >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Masonry View */}
            {viewMode === 'masonry' && (
              <motion.div
                key="masonry"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4"
              >
                {currentItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className={`break-inside-avoid mb-4 relative group cursor-pointer overflow-hidden rounded-lg`}
                    onClick={() => openLightbox(item)}
                  >
                    <CloudflareImage
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={item.gridSize === 'large' ? 600 : item.gridSize === 'medium' ? 400 : 300}
                      className="w-full h-auto transition-all duration-500 group-hover:brightness-110"
                    />
                    
                    {/* Distortion Effect on Hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/20 mix-blend-overlay"></div>
                    </div>
                    
                    {/* Interactive Elements for Masonry */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(item.id);
                        }}
                        className={`w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg ${
                          likedItems.has(item.id) ? 'text-red-500' : 'text-gray-700'
                        }`}
                        title={likedItems.has(item.id) ? "Remove from favorites" : "Add to favorites"}
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill={likedItems.has(item.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Navigate to shop page with this item
                          router.push(`/shop?item=${item.id}`);
                        }}
                        className="w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg text-gray-700"
                        title="View in shop"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Title overlay on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white text-lg font-medium">{item.title}</h3>
                      <p className="text-gray-300 text-sm">{item.category}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Infinite Scroll View */}
            {viewMode === 'infinite' && (
              <motion.div
                key="infinite"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative h-[2400px] overflow-hidden"
              >
                <div className="absolute inset-0">
                  {/* Column 1 - Scrolls Up */}
                  <div className="absolute left-0 w-1/3 animate-scroll-up">
                    <div className="space-y-4">
                      {[...col1Items, ...col1Items].map((item, index) => (
                        <div 
                          key={`col1-${index}`} 
                          className="rounded-lg overflow-hidden cursor-pointer relative group"
                          onClick={() => openLightbox(item)}
                        >
                          <CloudflareImage 
                            src={item.image} 
                            alt={item.title} 
                            width={300}
                            height={300}
                            className="w-full hover:scale-105 transition-transform duration-300" 
                          />
                          {/* Icons for infinite scroll */}
                          <div className="absolute top-2 right-2 md:top-3 md:right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(item.id);
                              }}
                              className={`w-6 h-6 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg ${
                                likedItems.has(item.id) ? 'text-red-500' : 'text-gray-700'
                              }`}
                              title={likedItems.has(item.id) ? "Remove from favorites" : "Add to favorites"}
                            >
                              <svg className="w-3 h-3 md:w-4 md:h-4" fill={likedItems.has(item.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/shop?item=${item.id}`);
                              }}
                              className="w-6 h-6 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg text-gray-700"
                              title="View in shop"
                            >
                              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Column 2 - Scrolls Down */}
                  <div className="absolute left-1/3 w-1/3 animate-scroll-down">
                    <div className="space-y-4">
                      {[...col2Items, ...col2Items].map((item, index) => (
                        <div 
                          key={`col2-${index}`} 
                          className="rounded-lg overflow-hidden cursor-pointer relative group"
                          onClick={() => openLightbox(item)}
                        >
                          <CloudflareImage 
                            src={item.image} 
                            alt={item.title} 
                            width={300}
                            height={300}
                            className="w-full hover:scale-105 transition-transform duration-300" 
                          />
                          {/* Icons for infinite scroll */}
                          <div className="absolute top-2 right-2 md:top-3 md:right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(item.id);
                              }}
                              className={`w-6 h-6 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg ${
                                likedItems.has(item.id) ? 'text-red-500' : 'text-gray-700'
                              }`}
                              title={likedItems.has(item.id) ? "Remove from favorites" : "Add to favorites"}
                            >
                              <svg className="w-3 h-3 md:w-4 md:h-4" fill={likedItems.has(item.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/shop?item=${item.id}`);
                              }}
                              className="w-6 h-6 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg text-gray-700"
                              title="View in shop"
                            >
                              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Column 3 - Scrolls Up */}
                  <div className="absolute left-2/3 w-1/3 animate-scroll-up">
                    <div className="space-y-4">
                      {[...col3Items, ...col3Items].map((item, index) => (
                        <div 
                          key={`col3-${index}`} 
                          className="rounded-lg overflow-hidden cursor-pointer relative group"
                          onClick={() => openLightbox(item)}
                        >
                          <CloudflareImage 
                            src={item.image} 
                            alt={item.title} 
                            width={300}
                            height={300}
                            className="w-full hover:scale-105 transition-transform duration-300" 
                          />
                          {/* Icons for infinite scroll */}
                          <div className="absolute top-2 right-2 md:top-3 md:right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLike(item.id);
                              }}
                              className={`w-6 h-6 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg ${
                                likedItems.has(item.id) ? 'text-red-500' : 'text-gray-700'
                              }`}
                              title={likedItems.has(item.id) ? "Remove from favorites" : "Add to favorites"}
                            >
                              <svg className="w-3 h-3 md:w-4 md:h-4" fill={likedItems.has(item.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/shop?item=${item.id}`);
                              }}
                              className="w-6 h-6 md:w-8 md:h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg text-gray-700"
                              title="View in shop"
                            >
                              <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination for Grid/Masonry Views */}
          {viewMode !== 'infinite' && totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  &lt;
                </button>

                {totalPages <= 7 ? (
                  [...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                        ${currentPage === index + 1 ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-white hover:bg-gray-700"}`}
                    >
                      {index + 1}
                    </button>
                  ))
                ) : (
                  <>
                    {currentPage > 3 && (
                      <>
                        <button
                          onClick={() => setCurrentPage(1)}
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                        >
                          1
                        </button>
                        <span className="text-gray-500 px-2">...</span>
                      </>
                    )}
                    
                    {[...Array(5)].map((_, idx) => {
                      const pageNumber = currentPage - 2 + idx;
                      if (pageNumber < 1 || pageNumber > totalPages) return null;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
                            ${currentPage === pageNumber ? "bg-orange-200 text-gray-900" : "bg-gray-800 text-white hover:bg-gray-700"}`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    
                    {currentPage < totalPages - 2 && (
                      <>
                        <span className="text-gray-500 px-2">...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </>
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}

          {/* Load More for Infinite Scroll Alternative */}
          {viewMode !== 'infinite' && currentPage < totalPages && (
            <div className="text-center mt-8">
              <button 
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="group inline-flex items-center gap-2 text-white text-lg border-b-2 border-orange-200 pb-1 hover:border-white transition-colors"
              >
                Load More
                <svg className="w-4 h-4 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
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

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 text-white hover:text-orange-200 transition-colors"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image container */}
            <div
              className="relative bg-gray-800 rounded-lg overflow-hidden max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <CloudflareImage
                src={selectedImage.image}
                alt={selectedImage.title}
                width={1200}
                height={800}
                className="w-full max-h-[80vh] object-contain"
              />

              {/* Image details overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-medium text-white">
                    {selectedImage.title}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full">
                    {selectedImage.category}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">
                  {selectedImage.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.slice(0, 5).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-gray-700/50 text-orange-200 rounded-full cursor-pointer hover:bg-gray-600/50 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeLightbox();
                        setSelectedTags([tag]);
                        setCurrentPage(1);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {selectedImage.tags.length > 5 && (
                    <span className="text-xs px-2 py-1 text-gray-400">
                      +{selectedImage.tags.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation hint */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm">
              Press ESC or click outside to close
            </div>
          </div>
        </div>
      )}

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

        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        
        @keyframes scroll-down {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }

        .animate-scroll-left {
          animation: scrollLeft 20s linear infinite;
        }

        .animate-scroll-right {
          animation: scrollRight 20s linear infinite;
        }
        
        .animate-scroll-up {
          animation: scroll-up 120s linear infinite;
        }
        
        .animate-scroll-down {
          animation: scroll-down 120s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover,
        .animate-scroll-up:hover,
        .animate-scroll-down:hover {
          animation-play-state: paused;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default PortfolioPage;
