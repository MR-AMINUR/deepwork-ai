import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoginModal from "./LoginModal";

function Navbar() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-500 border-b border-blue-400/30 px-6 h-14 flex items-center shadow-sm">

      {/* LEFT: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
          <span className="text-white text-sm">🎧</span>
        </div>
        <div>
          <div className="text-white font-semibold text-sm leading-none">
            DeepWork AI
          </div>
          <div className="text-blue-200 text-xs">
            Meeting Productivity Assistant
          </div>
        </div>
      </div>

      {/* RIGHT: Nav Links + Auth */}
      <div className="flex items-center gap-6 ml-auto mr-6">

        {/* Nav Links */}
        {[
          { name: "Dashboard", path: "/" },
          { name: "Meetings", path: "/meetings" },
          { name: "Tasks", path: "/tasks" },
          { name: "Reports", path: "/reports" },
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `text-sm pb-1 ${
                isActive
                  ? "text-white border-b-2 border-white font-medium"
                  : "text-blue-100 hover:text-white"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}

        {/* Auth Section */}
        {user ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white text-xs font-medium">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-white text-sm">{user.name}</span>
            <button
              onClick={() => setUser(null)}
              className="bg-white/10 px-3 py-1 rounded-md hover:bg-white/20 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="text-white text-sm border px-3 py-1 rounded hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </div>

      {/* Login Modal */}
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={(userData) => setUser(userData)}
        />
      )}
    </nav>
  );
}

export default Navbar;