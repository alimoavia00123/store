import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Alert() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setOpen(false);
    }
  }, []);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-white/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
       
        <button
          className="absolute right-4 top-4 text-2xl text-red-500 hover:text-red-700"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-xl font-semibold">Welcome</h2>
          <p className="text-sm text-gray-500">Sign up or login to continue</p>

          <div className="mt-4 flex w-full flex-col gap-3">
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="w-full rounded-lg border border-transparent px-4 py-3 text-sm font-medium transition-shadow hover:shadow-md bg-blue-500 text-white"
            >
              Sign Up
            </Link>
          </div>

          <div className="mt-4 flex w-full flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setOpen(false)} // ✅ Close alert on navigation
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium bg-gray-50 hover:bg-gray-100"
            >
              Login
            </Link>
          </div>

          <small className="mt-2 text-xs text-gray-400">
            You can close this and browse without logging in.
          </small>
        </div>
      </div>
    </div>
  );
}

export default Alert;
