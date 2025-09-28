import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (form.password !== form.confirmPassword) {
      return setMessage("❌ Passwords do not match!");
    }

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Signup successful!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(`❌ ${data.error || "Signup failed"}`);
      }
    } catch (err) {
      setMessage("❌ Server error, please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Full-screen background blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>

      <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>

        <div className="flex gap-3 mb-4">
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            className="flex px-2 py-2 border rounded-2xl w-46 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            className="flex px-2 py-2 border rounded-2xl w-46 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        />


        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        />

 
        <input
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          type={confirmPasswordVisible ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border rounded-2xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        />


        {message && (
          <p
            className={`text-center mb-4 font-medium ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleSignup}
          className="w-full py-2 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition mb-4"
        >
          Sign Up
        </button>


        <div className="text-center">
          <Link
            to="/login"
            className="text-sm text-blue-600 hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
