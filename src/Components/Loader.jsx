import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 z-50 font-['Poppins','Segoe_UI',sans-serif]">
      {/* Dual Orbit Spinner */}
      <div className="relative w-24 h-24">
        {/* Outer Ring */}
        <div
          className="absolute inset-0 rounded-full border-8 border-transparent border-t-cyan-400 border-r-purple-500 animate-spin"
          style={{ animationDuration: "2s" }}
        />
        {/* Inner Ring (reverse direction) */}
        <div
          className="absolute inset-4 rounded-full border-8 border-transparent border-t-pink-500 border-l-yellow-400 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        />
        {/* Center Glow */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 blur-xl opacity-70 animate-pulse" />
      </div>

      {/* Bouncing Text + Dots */}
      <div className="mt-10 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white tracking-wider animate-bounce drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
          Loading
        </h2>

        <div className="flex space-x-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-4 h-4 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.8)] animate-bounce"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.4s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Bengali Text */}
      <p className="mt-6 text-lg text-gray-300 font-medium animate-pulse">
        দয়া করে অপেক্ষা করুন...
      </p>
    </div>
  );
};

export default Loader;
