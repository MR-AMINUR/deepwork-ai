import React, { useState } from "react";

function LoginModal({ onClose, onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleSubmit = () => {
    if (!form.username || !form.password) return;

    // fake auth (temporary)
    onLogin({ name: form.username });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-80 shadow-lg space-y-4">
        <h2 className="text-lg font-semibold text-center">
          {isRegister ? "Register" : "Login"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <p
          className="text-sm text-blue-600 text-center cursor-pointer"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account?" : "Create new account"}
        </p>

        <button
          onClick={onClose}
          className="text-xs text-gray-400 w-full"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default LoginModal;