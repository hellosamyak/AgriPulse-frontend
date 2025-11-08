import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Sprout,
  Bot,
  BarChart3,
  ScanSearch,
  TrendingUp,
  CloudSun,
  Activity,
  ArrowRight,
  Home,
  Sparkles,
  CheckCircle2,
  Zap,
  Shield,
  Globe2,
} from "lucide-react";

// --- Configuration Data ---
const features = [
  {
    title: "AI Chatbot",
    description:
      "Get instant answers to all your agricultural queries powered by Google Gemini. From soil pH to best practices, your smart farming assistant is always ready.",
    icon: Bot,
    gradient: "from-emerald-500 to-teal-600",
    path: "/chat",
  },
  {
    title: "Market Terminal",
    description:
      "Real-time market intelligence with buy/sell recommendations, price forecasts, and sentiment analysis to maximize your profits.",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-600",
    path: "/terminal",
  },
  {
    title: "Dashboard",
    description:
      "Comprehensive analytics on weather, crop recommendations, market prices, and agriculture news tailored to your location.",
    icon: CloudSun,
    gradient: "from-sky-500 to-blue-600",
    path: "/dashboard",
  },
  {
    title: "Disease Detection",
    description:
      "Upload crop images for instant AI-powered diagnosis of pests and diseases with recommended treatment protocols using Gemini Vision.",
    icon: Activity,
    gradient: "from-rose-500 to-pink-600",
    path: "/detect",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant AI-powered insights in seconds",
  },
  {
    icon: Shield,
    title: "Reliable & Accurate",
    description: "Powered by Google's latest Gemini AI technology",
  },
  {
    icon: Globe2,
    title: "Always Available",
    description: "24/7 access to agricultural intelligence",
  },
];

// --- Shared Utility Components ---

/**
 * FeatureCard component with hover effects
 */
const FeatureCard = ({ title, description, icon: Icon, gradient, path }) => (
  <motion.div
    className="group relative p-6 sm:p-8 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden cursor-pointer h-full flex flex-col hover:border-slate-600/50 transition-all duration-300"
    whileHover={{ y: -8, scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Link
      to={path}
      className="absolute inset-0 z-10"
      aria-label={`Go to ${title}`}
    />

    {/* Glow effect */}
    <div
      className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}
    />

    <div
      className={`w-14 h-14 sm:w-16 sm:h-16 bg-linear-to-br ${gradient} rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
    >
      <Icon size={28} className="text-white" strokeWidth={2.5} />
    </div>

    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors">
      {title}
    </h3>
    <p className="text-slate-400 text-sm sm:text-base leading-relaxed flex-1 group-hover:text-slate-300 transition-colors">
      {description}
    </p>

    <div className="mt-6 flex items-center text-emerald-400 font-medium text-sm sm:text-base group-hover:gap-3 gap-2 transition-all duration-300">
      Explore{" "}
      <ArrowRight
        size={18}
        className="group-hover:translate-x-1 transition-transform"
      />
    </div>
  </motion.div>
);

/**
 * Collapsible Sidebar component
 */
const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />

          {/* Sidebar content */}
          <motion.div
            className="fixed top-0 left-0 h-screen w-72 bg-slate-800/90 backdrop-blur-xl border-r border-slate-700/50 p-6 z-50 shadow-2xl flex flex-col overflow-y-auto"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <div className="flex justify-between items-center mb-10">
              <Link
                to="/"
                className="text-2xl font-bold flex items-center bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
                onClick={toggleSidebar}
              >
                <Sprout size={28} className="mr-2 text-emerald-400" />
                AgriPulse
              </Link>
              <button
                onClick={toggleSidebar}
                className="text-slate-400 hover:text-white p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-2 flex-1">
              <Link
                to="/"
                className="flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:bg-slate-700/30 hover:text-white transition-all duration-300"
                onClick={toggleSidebar}
              >
                <Home size={20} />
                Home
              </Link>
              {features.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="flex items-center gap-3 p-3 rounded-xl text-slate-300 hover:bg-slate-700/30 hover:text-white transition-all duration-300"
                  onClick={toggleSidebar}
                >
                  <item.icon size={20} />
                  {item.title}
                </Link>
              ))}
            </nav>

            <Link
              to="/chat"
              className="flex items-center justify-center gap-2 p-3 rounded-xl text-white font-semibold bg-linear-to-r from-emerald-500 to-teal-600 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 mt-6"
              onClick={toggleSidebar}
            >
              <Sparkles size={20} />
              Start Analyzing
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

/**
 * Top Navbar component
 */
const Navbar = ({ toggleSidebar }) => (
  <header className="sticky top-0 z-30 w-full bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50 px-4 sm:px-6 lg:px-8 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      {/* Logo/Title */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img
            src="/logo.png"
            alt="AgriPulse Logo"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-lg shadow-emerald-500/30 object-contain"
          />
          <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            AgriPulse
          </span>
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex space-x-8">
        {features.map((item) => (
          <Link
            key={item.title}
            to={item.path}
            className="text-slate-400 hover:text-emerald-400 transition-colors font-medium"
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* CTA Button */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        className="hidden sm:block"
      >
        <Link
          to="/chat"
          className="px-4 sm:px-6 py-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 text-sm sm:text-base"
        >
          Start Analyzing
        </Link>
      </motion.div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="text-slate-300 hover:text-white lg:hidden p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
      >
        <Menu size={24} />
      </button>
    </div>
  </header>
);

// --- Landing Page Content Components ---

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-32 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-emerald-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Sparkles size={16} className="text-emerald-400" />
            <span className="text-emerald-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              AI-Powered Precision Agriculture
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="block mb-2">Farming Smarter,</span>
            <span className="block bg-linear-to-r from-emerald-400 via-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Not Harder
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-3xl mx-auto mb-8 sm:mb-12 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Empowering Smart Agriculture with AI-Driven Market Insights and
            Trade Intelligence — bridging data, weather, and prices to help
            farmers, traders, and policymakers make profitable, sustainable, and
            globally connected crop decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4"
          >
            <Link
              to="/chat"
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-base sm:text-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Bot size={20} />
              Start Chatting
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              to="/detect"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-200 font-bold rounded-xl text-base sm:text-lg hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <ScanSearch size={20} />
              Try Disease Detection
            </Link>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-16 sm:mt-24"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-linear-to-br from-emerald-500/20 to-teal-600/20 rounded-xl flex items-center justify-center mb-4 border border-emerald-500/30">
                <benefit.icon size={24} className="text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-400">{benefit.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const FeaturesSection = () => (
  <section id="features" className="py-16 sm:py-20 lg:py-24 bg-slate-950">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles size={16} className="text-emerald-400" />
          <span className="text-emerald-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Powerful Features
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Complete Agricultural Intelligence
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Four powerful AI-driven modules working together to revolutionize your
          farming experience
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ScreenshotsSection = () => {
  const screenshots = [
    {
      title: "AI Chatbot",
      description: "Get instant answers powered by Google Gemini",
      path: "/chat",
      gradient: "from-emerald-500 to-teal-600",
      image: "/chatbot.png",
    },
    {
      title: "Dashboard",
      description: "Weather, crops, market prices & news",
      path: "/dashboard",
      gradient: "from-sky-500 to-blue-600",
      image: "/dashboard.png",
    },
    {
      title: "Market Terminal",
      description: "Real-time market intelligence & trading",
      path: "/terminal",
      gradient: "from-emerald-500 to-teal-600",
      image: "/terminal.png",
    },
    {
      title: "Disease Detection",
      description: "AI-powered crop disease diagnosis",
      path: "/detect",
      gradient: "from-rose-500 to-pink-600",
      image: "/detection.png",
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <BarChart3 size={16} className="text-emerald-400" />
            <span className="text-emerald-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
              See It In Action
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Experience AgriPulse
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore our powerful modules designed to transform your agricultural
            operations
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {screenshots.map((screen, index) => (
            <motion.div
              key={screen.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link to={screen.path} className="block">
                <div className="relative bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02]">
                  {/* Image placeholder with gradient overlay */}
                  <div className="relative h-48 sm:h-64 bg-slate-900/50 overflow-hidden">
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${screen.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-48 sm:h-64">
                        <img
                          src={screen.image}
                          alt={screen.title}
                          className="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    {/* "Screenshot" badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-full text-xs font-medium text-slate-300">
                      Preview
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                        {screen.title}
                      </h3>
                      <CheckCircle2
                        size={24}
                        className="text-emerald-400 shrink-0"
                      />
                    </div>
                    <p className="text-slate-400 text-sm sm:text-base mb-4 group-hover:text-slate-300 transition-colors">
                      {screen.description}
                    </p>
                    <div className="flex items-center text-emerald-400 font-medium text-sm sm:text-base group-hover:gap-3 gap-2 transition-all duration-300">
                      Try it now{" "}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-16 sm:py-20 lg:py-24 bg-slate-950 relative overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 z-0">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl" />
    </div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
          <Sparkles size={16} className="text-emerald-400" />
          <span className="text-emerald-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
            Get Started Today
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Farm?
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-8 sm:mb-10 max-w-2xl mx-auto">
          Join thousands of farmers using AI to make smarter decisions, increase
          yields, and maximize profits.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/chat"
            className="group px-8 py-4 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            Start Free Now
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-200 font-bold rounded-xl text-lg hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
          >
            <CloudSun size={20} />
            View Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 border-t border-slate-800 py-8 sm:py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 overflow-hidden">
            <img
              src="/logo.png"
              alt="AgriPulse Logo"
              className="w-9 h-9 object-contain rounded-md"
            />
          </div>

          <span className="text-xl font-bold bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            AgriPulse
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          <Link to="/chat" className="hover:text-emerald-400 transition-colors">
            Chatbot
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-emerald-400 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/terminal"
            className="hover:text-emerald-400 transition-colors"
          >
            Terminal
          </Link>
          <Link
            to="/detect"
            className="hover:text-emerald-400 transition-colors"
          >
            Disease Detection
          </Link>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-800 text-center">
        <p className="text-slate-500 text-sm mb-2">
          &copy; {new Date().getFullYear()} AgriPulse AI. All rights reserved.
        </p>
        <p className="text-slate-600 text-xs flex items-center justify-center gap-2">
          Powered by{" "}
          <span className="inline-flex items-center gap-1 text-emerald-400">
            <Sparkles size={12} />
            Google Gemini AI
          </span>
        </p>
      </div>
    </div>
  </footer>
);

// --- Main Exported Landing Page Component ---
const LandingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 font-sans">
      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.64, 0.57, 0.67, 1.53);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: rgb(15 23 42);
        }
        ::-webkit-scrollbar-thumb {
          background: rgb(51 65 85);
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgb(71 85 105);
        }
      `}</style>

      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <main>
        <HeroSection />
        <FeaturesSection />
        <ScreenshotsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
