import React, { useState, useEffect } from "react";
import { ArrowLeft, Eye, EyeOff, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HODLogin = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [error, setError] = useState("");

  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = "";
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedCaptcha(code);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (captcha !== generatedCaptcha) {
      setError("Invalid captcha code");
      generateCaptcha();
      return;
    }

    if (userId === "hod123" && password === "password123") {
      alert("Login successful");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="max-h-screen bg-[#eaf7f5] flex flex-col items-center text-[14px]">
      {/* BACK BUTTON */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
        <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* TOP GREEN PANEL */}
      <div className="w-full max-w-md bg-linear-to-b from-green-600 to-teal-600 text-white flex flex-col items-center py-10 mt-8 rounded-t-3xl shadow-md">

        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl mb-3">
          🏛️
        </div>

        <h1 className="text-[18px] font-semibold">HOD Access</h1>
        <p className="text-sm opacity-90">
          Department Management Login
        </p>
      </div>

      {/* LOGIN CARD */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 ">

        {/* Demo Toggle */}
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="w-full border border-green-200 text-green-700 bg-green-50 py-3 rounded-xl text-sm mb-5 hover:bg-green-100 transition"
        >
          Show Demo Credentials
        </button>

        {showDemo && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm mb-4">
            <p>User ID: <b>hod123</b></p>
            <p>Password: <b>password123</b></p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          {/* USER ID */}
          <div>
            <label className="text-gray-700 text-sm">User ID</label>
            <input
              type="text"
              placeholder="Enter your user ID"
              className="w-full mt-1 px-3 py-2.5 rounded-lg bg-gray-100 outline-none"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-gray-700 text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full mt-1 px-3 py-2.5 rounded-lg bg-gray-100 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-3 top-3.5 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {/* CAPTCHA */}
          <div>
            <label className="text-gray-700 text-sm">
              Security Verification
            </label>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 border rounded-lg px-4 py-2 bg-gray-50 text-center text-lg tracking-widest font-semibold">
                {generatedCaptcha}
              </div>

              <RefreshCw
                size={20}
                className="cursor-pointer text-gray-600"
                onClick={generateCaptcha}
              />
            </div>

            <input
              type="text"
              placeholder="Enter the code above"
              className="w-full mt-3 px-3 py-2.5 rounded-lg bg-gray-100 outline-none"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-green-600 to-teal-600 text-white py-2.5 rounded-xl font-medium hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>
      </div>

      

      <div className="h-10" />
    </div>
  );
};

export default HODLogin;