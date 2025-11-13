import React from 'react';
import { Link } from 'react-router'; // যদি react-router ব্যবহার করো
import { Home, AlertCircle, RefreshCw } from 'lucide-react'; // lucide-react আইকন (অপশনাল)

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center">
          {/* Big 404 Text with Animation */}
          <h1 className="text-9xl font-black text-white opacity-20 select-none animate-pulse">
            404
          </h1>

          {/* Floating Error Icon */}
          <div className="relative -mt-16 mb-8">
            <div className="animate-bounce">
              <AlertCircle className="w-24 h-24 mx-auto text-purple-400" />
            </div>
          </div>

          {/* Main Message */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ওহ না! পাতা পাওয়া যায়নি
          </h2>
          
          <p className="text-lg text-purple-200 mb-8 leading-relaxed">
            তুমি যে পাতাটি খুঁজছো সেটা হয়তো মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে, অথবা সাময়িকভাবে অনুপলব্ধ।
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              <Home className="w-5 h-5" />
              হোমে ফিরে যান
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-purple-400 hover:bg-purple-400 hover:text-white text-purple-300 font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              পেজ রিফ্রেশ করুন
            </button>
          </div>

          {/* Fun Little Message */}
          <p className="text-sm text-purple-300 mt-12 opacity-70">
            কোডারের জীবনেও 404 আসে 😅
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-20 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default ErrorPage;