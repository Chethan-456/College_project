import React, { useState, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [error, setError] = useState("");

  // Generate Random Captcha
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (captcha !== generatedCaptcha) {
      setError("Captcha does not match!");
      generateCaptcha();
      return;
    }

    if (userId === "admin123" && password === "password123") {
      navigate("/principal");
    } else {
      setError("Invalid credentials!");
    }
  };

  const fillDemo = () => {
    setUserId("admin123");
    setPassword("password123");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 text-[14px] font-[Verdana]">

      {/* HEADER */}
      <div className="flex items-center px-6 py-4 text-white bg-white/10 backdrop-blur-md">
        <ArrowLeft
          className="cursor-pointer mr-3"
          onClick={() => navigate(-1)}
        />
        <div>
          <h1 className="text-[18px] font-semibold">Admin Login</h1>
          <p className="text-sm opacity-80">Principal Dashboard Access</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center justify-center mt-10 px-4 min-h-[calc(100vh-80px)] pb-16">

        {/* Icon */}
        <div className="bg-white/20 p-6 rounded-full mb-6">
          🏫
        </div>

        <h2 className="text-white text-[18px] font-semibold">
          Principal Access
        </h2>
        <p className="text-white/80 mb-6">
          Management System Login
        </p>

        {/* Demo Button */}
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="mb-6 px-6 py-3 rounded-xl bg-white/20 text-white backdrop-blur-md hover:bg-white/30 transition"
        >
          Show Demo Credentials
        </button>

        {showDemo && (
          <div className="bg-white/20 text-white px-6 py-3 rounded-lg mb-6">
            <p>User ID: <b>admin123</b></p>
            <p>Password: <b>password123</b></p>
            <button
              onClick={fillDemo}
              className="mt-2 text-sm underline"
            >
              Auto Fill
            </button>
          </div>
        )}

        {/* LOGIN CARD */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

          <h3 className="text-center text-gray-800 text-[18px] font-semibold">
            Welcome Back
          </h3>
          <p className="text-center text-gray-500 mb-6">
            Please sign in to access the dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-4">

            {/* USER ID */}
            <div>
              <label className="text-gray-700 font-medium">User ID</label>
              <input
                type="text"
                placeholder="Enter your user ID"
                className="w-full mt-1 p-3 rounded-lg bg-gray-100 outline-none"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-gray-700 font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full mt-1 p-3 rounded-lg bg-gray-100 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute right-3 top-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </div>
              </div>
            </div>

            {/* CAPTCHA */}
            <div>
              <label className="text-gray-700 font-medium">
                Security Verification
              </label>

              <div className="flex items-center justify-between border-dashed border-2 p-4 rounded-lg mt-2 bg-gray-50">
                <span className="text-xl font-bold tracking-widest text-purple-600">
                  {generatedCaptcha}
                </span>

                <RefreshCw
                  size={20}
                  className="cursor-pointer"
                  onClick={generateCaptcha}
                />
              </div>

              <input
                type="text"
                placeholder="Enter captcha code"
                className="w-full mt-3 p-3 rounded-lg bg-gray-100 outline-none"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold hover:scale-105 transition"
            >
              Sign In
            </button>
          </form>

          <div className="text-center mt-4 text-blue-600 cursor-pointer">
            Forgot Password?
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;