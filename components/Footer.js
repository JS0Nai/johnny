import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
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
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Email Me
              </Link>
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
              AI Infrastructure & Integrations Consultancy
            </a>
            , Powered by{" "}
            <a
              href="#"
              className="text-white hover:text-orange-200 transition-colors"
            >
              AIii
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
  );
};

export default Footer;