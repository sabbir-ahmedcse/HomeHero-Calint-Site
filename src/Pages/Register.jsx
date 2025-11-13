import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, User, Image as ImageIcon, Sparkles, Shield, Zap } from "lucide-react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAxios from "../Hooks/useAxios";


const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  // const axiosSecure = useAxiosSecure();

  const axiosInstance = useAxios()
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to save user data to MongoDB
  const saveUserToDB = async (userData) => {
    try {
      const response = await axiosInstance.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error saving user to DB:', error);
      throw error;
    }
  };

 const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);

  const { name, email, photo, password } = formData;

  if (password.length < 6) {
    setLoading(false);
    return toast.error("Password must be at least 6 characters!");
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    setLoading(false);
    return toast.error("Password must contain both uppercase and lowercase letters!");
  }

  try {
    //  Create user in Firebase
    const userCredential = await createUser(email, password, name, photo);
    const user = userCredential.user;

    //  Prepare user data for MongoDB
    const userData = {
      name,
      email,
      photo: photo || "",
      role: "user",
      createdAt: new Date(),
      uid: user.uid,
      emailVerified: user.emailVerified,
      lastLoginAt: new Date(),
    };

    //  Save user to MongoDB
    await saveUserToDB(userData);

    toast.success("🎉 Registration Successful! Redirecting...");

    // Wait 1.5 seconds then redirect
    setTimeout(() => {
      navigate("/");
    }, 1000);
  } catch (err) {
    console.error("Registration error:", err);
    toast.error(err.message || "Registration failed!");
  } finally {
    setLoading(false);
  }
};


  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      
      // Prepare user data for MongoDB
      const userData = {
        name: user.displayName || "",
        email: user.email,
        photo: user.photoURL || "",
        role: "user",
        createdAt: new Date(),
        uid: user.uid,
        emailVerified: user.emailVerified,
        lastLoginAt: new Date()
      };

      // Save/update user in MongoDB
      await saveUserToDB(userData);
      
      toast.success("🚀 Logged in with Google!");
      navigate("/");
    } catch (err) {
      console.error("Google sign-in error:", err);
      toast.error(err.message || "Google sign-in failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-10 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-10 animate-bounce"></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-20 left-10 animate-bounce">
        <Sparkles className="text-yellow-400" size={24} />
      </div>
      <div className="absolute bottom-20 right-10 animate-bounce delay-300">
        <Shield className="text-green-400" size={24} />
      </div>
      <div className="absolute top-1/3 right-20 animate-pulse">
        <Zap className="text-orange-400" size={20} />
      </div>

      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md transform hover:scale-105 transition-all duration-500">
        {/* Header with Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
            <User className="text-white" size={28} />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Join Us
          </h2>
          <p className="text-purple-200 mt-2">Create your account in seconds</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Field */}
          <div className="group">
            <label className="block text-purple-200 font-semibold mb-3 text-sm uppercase tracking-wide">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="text-purple-400 group-focus-within:text-purple-300 transition-colors" size={20} />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-white/5 border border-purple-500/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-purple-300 focus:bg-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="group">
            <label className="block text-purple-200 font-semibold mb-3 text-sm uppercase tracking-wide">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="text-purple-400 group-focus-within:text-purple-300 transition-colors" size={20} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full bg-white/5 border border-purple-500/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-purple-300 focus:bg-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Photo URL Field */}
          <div className="group">
            <label className="block text-purple-200 font-semibold mb-3 text-sm uppercase tracking-wide">
              Profile Photo <span className="text-purple-400 text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImageIcon className="text-purple-400 group-focus-within:text-purple-300 transition-colors" size={20} />
              </div>
              <input
                type="url"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                className="w-full bg-white/5 border border-purple-500/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-purple-300 focus:bg-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="group">
            <label className="block text-purple-200 font-semibold mb-3 text-sm uppercase tracking-wide">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="text-purple-400 group-focus-within:text-purple-300 transition-colors" size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full bg-white/5 border border-purple-500/30 rounded-xl pl-12 pr-12 py-4 text-white placeholder-purple-300 focus:bg-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300"
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                disabled={loading}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-white/5 rounded-xl p-4 border border-purple-500/20">
            <h4 className="text-purple-200 font-semibold text-sm mb-2">Password Requirements:</h4>
            <ul className="text-xs text-purple-300 space-y-1">
              <li className={`flex items-center ${formData.password.length >= 6 ? 'text-green-400' : ''}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${formData.password.length >= 6 ? 'bg-green-400' : 'bg-purple-500'}`}></div>
                At least 6 characters
              </li>
              <li className={`flex items-center ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'text-green-400' : ''}`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${/[A-Z]/.test(formData.password) && /[a-z]/.test(formData.password) ? 'bg-green-400' : 'bg-purple-500'}`}></div>
                Uppercase & lowercase letters
              </li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Creating Your Account...
              </>
            ) : (
              <>
                <Zap className="text-yellow-300" size={20} />
                Get Started Now
                <Zap className="text-yellow-300" size={20} />
              </>
            )}
          </button>
        </form>

        {/* OR Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-500/50"></div>
          <div className="px-4 text-sm text-purple-300 font-semibold">OR</div>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-purple-500/50"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-white/10 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-6 h-6"
          />
          Continue with Google
        </button>

        {/* Login Link */}
        <div className="text-center mt-8 pt-6 border-t border-purple-500/30">
          <p className="text-purple-300">
            Already part of our community?{" "}
            <Link 
              to="/login" 
              className="text-white font-bold hover:text-yellow-300 underline underline-offset-4 transition-colors"
            >
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;