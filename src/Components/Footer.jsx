import React from "react";
import { Link } from "react-router";
import { Facebook, Instagram, Linkedin, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-600 via-purple-700 to-blue-700 text-white py-10 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        {/* --- Column 1: Logo & About --- */}
        <div>
          <h2 className="text-2xl font-bold mb-3">
            Home<span className="text-yellow-300">Hero</span>
          </h2>
          <p className="text-sm leading-relaxed text-gray-100">
            HomeHero connects you with trusted local professionals — electricians, plumbers,
            cleaners, and more. Fast, reliable, and right at your doorstep.
          </p>
        </div>

        {/* --- Column 2: Quick Links --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-100">
            <li>
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-yellow-300 transition">
                Services
              </Link>
            </li>
            <li>
              <Link to="/add-service" className="hover:text-yellow-300 transition">
                Add Service
              </Link>
            </li>
            <li>
              <Link to="/my-bookings" className="hover:text-yellow-300 transition">
                My Bookings
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-yellow-300 transition">
                Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* --- Column 3: Contact Info --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-100 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +880 123 456 789
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@homehero.com
            </li>
          </ul>
        </div>

        {/* --- Column 4: Social Media --- */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
          <p className="text-sm text-gray-100 mt-4">
            Stay connected with our latest offers and updates.
          </p>
        </div>
      </div>

      {/* --- Bottom Footer --- */}
      <div className="border-t border-white/20 mt-10 pt-5 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} <span className="font-semibold">HomeHero</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
