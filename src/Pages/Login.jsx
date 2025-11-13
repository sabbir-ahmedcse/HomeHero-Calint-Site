import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, Sparkles, Shield, Rocket, Zap, ArrowLeft, Key } from 'lucide-react';

const Login = () => {
    const { signInWithGoogle, signInUser, createUser, resetPassword } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });
    
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            if (isLogin) {
                await signInUser(formData.email, formData.password);
                setSuccess('Welcome back! Signing you in...');
            } else {
                await createUser(formData.email, formData.password, formData.name);
                setSuccess('Account created successfully! Welcome aboard!');
            }
        } catch (err) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError('');
        setSuccess('');
        try {
            await signInWithGoogle();
            setSuccess('Successfully signed in with Google!');
        } catch (err) {
            setError(err.message || 'Google sign-in failed');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        if (!forgotPasswordEmail) {
            setError('Please enter your email address');
            setLoading(false);
            return;
        }

        try {
            await resetPassword(forgotPasswordEmail);
            setSuccess('Password reset email sent! Check your inbox.');
            setForgotPasswordEmail('');
            setTimeout(() => {
                setShowForgotPassword(false);
            }, 3000);
        } catch (err) {
            setError(err.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    // Forget Password Form
    if (showForgotPassword) {
        return (
            <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-10 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-10"></div>
                </div>

                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8 w-full max-w-md transform hover:scale-105 transition-all duration-500">
                    {/* Back Button */}
                    <button
                        onClick={() => setShowForgotPassword(false)}
                        className="flex items-center gap-2 text-purple-200 hover:text-white mb-6 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Login
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4 shadow-lg">
                            <Key className="text-white" size={28} />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                            Reset Password
                        </h1>
                        <p className="text-purple-200 mt-2">
                            Enter your email to receive a reset link
                        </p>
                    </div>

                    {/* Success Message */}
                    {success && (
                        <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 backdrop-blur-sm">
                            <Shield size={20} />
                            <span className="text-sm">{success}</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 backdrop-blur-sm">
                            <Shield size={20} />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    {/* Forgot Password Form */}
                    <form onSubmit={handleForgotPassword} className="space-y-6">
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
                                    value={forgotPasswordEmail}
                                    onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-white/5 border border-purple-500/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-purple-300 focus:bg-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300"
                                    required
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Sending Reset Link...
                                </>
                            ) : (
                                <>
                                    <Key className="text-yellow-300" size={20} />
                                    Send Reset Link
                                    <Key className="text-yellow-300" size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Help Text */}
                    <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-purple-200 text-sm text-center">
                            We'll send you a link to reset your password. Check your spam folder if you don't see it.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Main Login/Signup Form
    return (
        <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-10 overflow-hidden">
            {/* Animated Background */}
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
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
                        <Rocket className="text-white" size={28} />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        {isLogin ? 'Welcome Back' : 'Join Us'}
                    </h1>
                    <p className="text-purple-200 mt-2">
                        {isLogin ? 'Sign in to your account' : 'Create your account in seconds'}
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 backdrop-blur-sm">
                        <Shield size={20} />
                        <span className="text-sm">{success}</span>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6 flex items-center gap-3 backdrop-blur-sm">
                        <Shield size={20} />
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
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
                                    required={!isLogin}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    )}

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
                                placeholder="Enter your password"
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

                    {!isLogin && (
                        <div className="group">
                            <label className="block text-purple-200 font-semibold mb-3 text-sm uppercase tracking-wide">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="text-purple-400 group-focus-within:text-purple-300 transition-colors" size={20} />
                                </div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    className="w-full bg-white/5 border border-purple-500/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-purple-300 focus:bg-white/10 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 outline-none transition-all duration-300"
                                    required={!isLogin}
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    )}

                    {/* Password Match Indicator */}
                    {!isLogin && formData.confirmPassword && (
                        <div className={`text-sm font-semibold text-center p-2 rounded-lg ${
                            formData.password === formData.confirmPassword 
                                ? 'text-green-400 bg-green-500/20' 
                                : 'text-red-400 bg-red-500/20'
                        }`}>
                            {formData.password === formData.confirmPassword 
                                ? '✓ Passwords match' 
                                : '✗ Passwords do not match'
                            }
                        </div>
                    )}

                    {/* Forgot Password Link (Only for Login) */}
                    {isLogin && (
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() => setShowForgotPassword(true)}
                                className="text-purple-300 hover:text-white text-sm font-medium transition-colors hover:underline"
                            >
                                Forgot your password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <>
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {isLogin ? 'Signing In...' : 'Creating Account...'}
                            </>
                        ) : (
                            <>
                                <Zap className="text-yellow-300" size={20} />
                                {isLogin ? 'Sign In' : 'Create Account'}
                                <Zap className="text-yellow-300" size={20} />
                            </>
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-500/50"></div>
                    <div className="px-4 text-sm text-purple-300 font-semibold">OR CONTINUE WITH</div>
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

                {/* Toggle Auth */}
                <div className="text-center mt-8 pt-6 border-t border-purple-500/30">
                    <p className="text-purple-300">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-white font-bold hover:text-yellow-300 underline underline-offset-4 transition-colors bg-gradient-to-r from-white to-white bg-clip-text text-transparent hover:from-yellow-300 hover:to-yellow-200"
                        >
                            {isLogin ? 'Sign Up Now' : 'Sign In Here'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;