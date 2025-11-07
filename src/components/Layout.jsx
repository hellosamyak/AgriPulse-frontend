import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Activity, CloudSun, TrendingUp, Menu, X } from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const navItems = [
    { name: "Chatbot", path: "/chat", icon: <Sprout size={20} /> },
    { name: "Disease", path: "/detect", icon: <Activity size={20} /> },
    { name: "Dashboard", path: "/dashboard", icon: <CloudSun size={20} /> },
    { name: "Terminal", path: "/terminal", icon: <TrendingUp size={20} /> },
  ];

  const activeClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium shadow-lg shadow-emerald-500/25 transition-all duration-300";
  const inactiveClass =
    "flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700/30 text-slate-300 hover:text-white transition-all duration-300 group";

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key="sidebar"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800/40 backdrop-blur-xl border-r border-slate-700/50 p-6 flex flex-col justify-between shadow-2xl"
          >
            <div>
              {/* Logo/Brand */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <Sprout size={22} className="text-white" />
                  </div>
                  <h1 className="text-2xl font-bold bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    AgriPulse
                  </h1>
                </div>
                <p className="text-slate-400 text-sm ml-1">
                  Smart Agriculture Platform
                </p>
              </div>

              {/* Navigation */}
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? activeClass : inactiveClass
                    }
                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </span>
                    {item.name}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Footer Info */}
            <div className="mt-8 p-4 bg-slate-900/50 rounded-xl border border-slate-700/30">
              <p className="text-xs text-slate-400 mb-1">Platform Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-slate-300 font-medium">
                  All Systems Operational
                </p>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto relative">
        {/* Toggle button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-6 left-6 bg-linear-to-r from-emerald-500 to-teal-600 text-white p-3 rounded-xl z-50 hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 group"
        >
          {isOpen ? (
            <X
              size={20}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
          ) : (
            <Menu
              size={20}
              className="group-hover:scale-110 transition-transform duration-300"
            />
          )}
        </button>

        {/* Framer Motion Page Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="pt-12 md:pt-0"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
