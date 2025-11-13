import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Star, Clock, Users } from "lucide-react";

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const slides = [
    {
      id: 1,
      title: "Sparkling Clean Homes, Every Time ✨",
      desc: "Our eco-friendly cleaning experts turn messy into magical. Because a clean home means a happy heart.",
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2070&q=80",
      tag: "Cleaning",
      rating: 4.9,
      duration: "2-4 hours",
      reviews: 1247,
    },
    {
      id: 2,
      title: "Plumbing Done Right 💧",
      desc: "Certified plumbers fixing leaks, pipes, and peace of mind. Quick response and lasting results.",
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&w=2070&q=80",
      tag: "Plumbing",
      rating: 4.8,
      duration: "1-3 hours",
      reviews: 892,
    },
    {
      id: 3,
      title: "Your Home, Electrified ⚡",
      desc: "From fans to full rewiring — trusted electricians who power your comfort and safety.",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=2070&q=80",
      tag: "Electrical",
      rating: 4.9,
      duration: "2-5 hours",
      reviews: 756,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative h-[75vh] md:h-[80vh] overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white rounded-xl">
  {/* Slide Background */}
  <AnimatePresence mode="wait">
    <motion.div
      key={slides[current].id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${slides[current].image})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
    </motion.div>
  </AnimatePresence>

  {/* Content */}
  <div className="relative z-10 flex items-center h-full px-6 lg:px-16">
    <motion.div
      key={slides[current].id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl border border-white/20"
    >
      <div className="mb-3 inline-block px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/40 to-pink-500/40 border border-white/30 text-sm font-semibold uppercase tracking-widest">
        {slides[current].tag}
      </div>

      <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight drop-shadow-md">
        {slides[current].title}
      </h1>

      <p className="text-base md:text-lg text-purple-100 mb-6 leading-relaxed">
        {slides[current].desc}
      </p>

      <div className="flex flex-wrap gap-4 mb-6 text-sm md:text-base">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" size={18} />
          <span>{slides[current].rating}</span>
          <span className="text-purple-300">
            ({slides[current].reviews}+ reviews)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="text-cyan-400" size={18} />
          <span>{slides[current].duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="text-green-400" size={18} />
          <span>Certified Experts</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/services"
          className="inline-flex items-center justify-center px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl shadow-lg hover:shadow-pink-500/30 transition-transform hover:scale-105"
        >
          <Play size={16} className="mr-2" /> Explore Services
        </Link>
        <button
          onClick={next}
          className="px-5 py-2 md:px-6 md:py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all"
        >
          Next Slide →
        </button>
      </div>
    </motion.div>
  </div>

  {/* Arrows */}
  <button
    onClick={prev}
    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full p-2 md:p-3 backdrop-blur-md transition-all hover:scale-110"
  >
    <ChevronLeft />
  </button>
  <button
    onClick={next}
    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full p-2 md:p-3 backdrop-blur-md transition-all hover:scale-110"
  >
    <ChevronRight />
  </button>

  {/* Indicators */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
    {slides.map((_, i) => (
      <motion.div
        key={i}
        onClick={() => setCurrent(i)}
        whileHover={{ scale: 1.2 }}
        className={`w-2 h-2 md:w-3 md:h-3 rounded-full cursor-pointer transition-all ${
          i === current ? "bg-pink-500 scale-125" : "bg-white/40 hover:bg-white/70"
        }`}
      />
    ))}
  </div>

  {/* Glow Background */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl"></div>
    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
  </div>
</div>

  );
};

export default HeroSection;
