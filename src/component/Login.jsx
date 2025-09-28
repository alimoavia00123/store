import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === "admin") navigate("/admin");
      else navigate("/");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isLoggedIn", "true");
        setMessage("Login successful!");
        if (data.user.role === "admin") navigate("/admin");
        else navigate("/");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Error logging in");
      console.error(err);
    }
  };

  return (
    <div className="h-screen w-screen relative">
      {/* Body background blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Centered Login Card */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <div className="bg-white p-8 rounded-3xl w-96 shadow-2xl border border-gray-200">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Log In</h1>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <button
              onClick={handleLogin}
              className="w-full py-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold shadow-md transition"
            >
              Log In
            </button>
          </div>

          {message && (
            <p
              className={`text-center mt-4 font-medium ${
                message.includes("successful") ? " text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <div className="mt-6 text-center">
            <a href="#" className="text-blue-600 hover:underline mr-4">
              Forgot Password?
            </a>
            <a href="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
