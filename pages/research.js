import React from 'react';
import Link from 'next/link';

function ResearchPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
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
