import { useState } from 'react';
import Link from 'next/link';
import Header from "../components/Header";

function ResearchPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("research");

  const menuItems = [
    { id: "home", label: "HOME", href: "/", subItems: [] },
    { id: "about", label: "ABOUT", href: "/about", subItems: [] },
    { id: "portfolio", label: "PORTFOLIO", href: "/portfolio", subItems: [] },
    { id: "projects", label: "PROJECTS", href: "/projects", subItems: [] },
    { id: "articles", label: "ARTICLES", href: "/articles", subItems: [] },
    { id: "research", label: "RESEARCH", href: "/research", subItems: [] },
    { id: "resources", label: "RESOURCES", href: "/resources", subItems: [] },
    { id: "contact", label: "CONTACT", href: "/contact", subItems: [] },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        menuItems={menuItems}
      />
      
      <div className="container mx-auto px-4 py-16 pt-32">
        <h1 className="text-5xl font-bold mb-8">Research</h1>
        <p className="text-xl text-gray-400 mb-8">
          This page is under construction. Please check back later for updates on research projects and findings.
        </p>
        <Link href="/">
          <span className="text-orange-200 hover:underline">Go back to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default ResearchPage;
