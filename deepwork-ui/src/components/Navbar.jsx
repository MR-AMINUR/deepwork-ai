import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Bot, Menu, X } from "lucide-react";
import LoginModal from "./LoginModal";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="glass border-b border-gray-200/50 px-6 h-16 flex items-center shadow-sm sticky top-0 z-50 backdrop-blur-md">

        {/* LEFT: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="gradient-text font-bold text-lg leading-none">
              DeepWork AI
            </div>
            <div className="text-gray-500 text-xs">
              Meeting Intelligence
            </div>
          </div>
        </div>

        {/* MIDDLE: Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-1 ml-auto mr-6">
          {[
            { name: "Dashboard", path: "/", icon: "🏠" },
            { name: "Meetings", path: "/meetings", icon: "📊" },
            { name: "Tasks", path: "/tasks", icon: "✅" },
            { name: "Reports", path: "/reports", icon: "📈" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <span className="mr-1.5">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* RIGHT: Auth Section */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-800 text-sm font-medium">{user.name}</span>
              </div>
              <button
                onClick={() => setUser(null)}
                className="px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden ml-auto p-2 hover:bg-gray-100 rounded-lg transition"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-b border-gray-200 p-4 space-y-2 fade-in">
          {[
            { name: "Dashboard", path: "/", icon: "🏠" },
            { name: "Meetings", path: "/meetings", icon: "📊" },
            { name: "Tasks", path: "/tasks", icon: "✅" },
            { name: "Reports", path: "/reports", icon: "📈" },
          ].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              <span>{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
          
          {!user && (
            <button
              onClick={() => {
                setShowLogin(true);
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-sm font-medium shadow-md"
            >
              Login
            </button>
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={(userData) => setUser(userData)}
        />
      )}
    </>
  );
}

export default Navbar;