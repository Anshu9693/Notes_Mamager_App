import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// axios.defaults.withCredentials = true;

export default function Signup() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fname = e.target.fname.value;
    const lname = e.target.lname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/user/register`,
        { fname, lname, email, password },
        { withCredentials: true }
      );
      
      // console.log("Registered:", response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/note");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md border border-white/30">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-white mb-6">
          ✨ Create an account
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-200 bg-red-600/40 p-2 rounded">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First and Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              name="fname"
              placeholder="First name"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              name="lname"
              placeholder="Last name"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />

          {/* Button */}
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-indigo-700 transition duration-300 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-white">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/user/login")}
            className="text-yellow-300 underline hover:text-yellow-400 transition"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
