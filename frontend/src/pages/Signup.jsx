import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        const data = await response.json();
        setError(data.message || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6DED8] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#B82132] mb-6">
          Create Your Account
        </h1>
        <form onSubmit={handleSignUp} className="space-y-6">
          {error && (
            <div className="p-3 bg-[#F2B28C] text-[#B82132] rounded-lg text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="p-3 bg-green-100 text-green-700 rounded-lg text-center">
              Registration successful! Redirecting to login...
            </div>
          )}
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-[#B82132] mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#F2B28C] rounded-lg focus:outline-none focus:border-[#D2665A] focus:ring-2 focus:ring-[#D2665A] transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-[#B82132] mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#F2B28C] rounded-lg focus:outline-none focus:border-[#D2665A] focus:ring-2 focus:ring-[#D2665A] transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-lg font-medium text-[#B82132] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#F2B28C] rounded-lg focus:outline-none focus:border-[#D2665A] focus:ring-2 focus:ring-[#D2665A] transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-lg font-medium text-[#B82132] mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#F2B28C] rounded-lg focus:outline-none focus:border-[#D2665A] focus:ring-2 focus:ring-[#D2665A] transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 bg-[#B82132] hover:bg-[#D2665A] text-white font-bold rounded-lg transition-colors duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#B82132] hover:underline font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;