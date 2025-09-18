import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// axios.defaults.withCredentials = true;

export default function UserLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/user/login`,
        { email: form.email, password: form.password },
        { withCredentials: true }
      );
  //  console.log("Logged in:", response.data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      setError(null);
      navigate("/note");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center py-10">
      <div className="bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-8 w-full max-w-md border border-white/30">
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          🔑 Sign in to your account
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-200 bg-red-600/40 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            disabled={loading}
            type="submit"
            className="w-full cursor-pointer bg-indigo-600 text-white py-3 rounded-lg font-semibold text-lg shadow hover:bg-indigo-700 transition duration-300 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-sm text-center text-white">
          Don't have an account?{" "}
          <button
            className="text-yellow-300 underline hover:text-yellow-400 transition"
            onClick={() => navigate("/user/register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
