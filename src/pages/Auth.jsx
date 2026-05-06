import React, { useState } from 'react';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  // ✅ OTP states - Fully Preserved
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  // ✅ HANDLE SUBMIT - FULL LOGIC RESTORED
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && !otpVerified) {
      alert("Please verify OTP before creating account");
      return;
    }

    const formData = new FormData(e.target);

    const payload = {
      first_name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirm_password: formData.get("confirmPassword"),
    };

    const url = isLogin
      ? "http://127.0.0.1:8000/api/auth/login/"
      : "http://127.0.0.1:8000/api/auth/register/";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isLogin
            ? { email: payload.email, password: payload.password }
            : payload
        ),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access", data.tokens.access);
        localStorage.setItem("refresh", data.tokens.refresh);

        alert("Login Successful!");
        onLogin();
      } else {
        const errorMsg =
          data.non_field_errors?.[0] ||
          data.password?.[0] ||
          data.error ||
          "Something went wrong";

        alert(errorMsg);
      }
    } catch (err) {
      console.error(err);
      alert("Server error during authentication");
    }
  };

  // ✅ SEND OTP - FULL LOGIC RESTORED
  const sendOtp = async () => {
    if (!email) {
      alert("Enter email first");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/send-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP sent to your email");
        setOtpSent(true);
      } else {
        alert(data.error || "Failed to send OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while sending OTP");
    }
  };

  // ✅ VERIFY OTP - FULL LOGIC RESTORED
  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          otp: otp.trim(), // ✅ YOUR IMPORTANT FIX KEPT
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("OTP verified successfully");
        setOtpVerified(true);
      } else {
        alert(data.error || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("Server error during verification");
    }
  };

  // UI Styling Variable
  const inputStyle = "w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all";

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <div className="bento-card w-full max-w-md animate-fade-in backdrop-blur-2xl bg-black/20 border border-white/10">

        <h2 className="text-4xl font-black mb-2 text-white drop-shadow-md">
          {isLogin ? 'Welcome Back' : 'Join Us'}
        </h2>

        <p className="text-white/60 mb-8 font-medium">
          {isLogin ? 'Login to manage your trips' : 'Create an account to start planning'}
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className={inputStyle}
              required
            />
          )}

          {/* EMAIL */}
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className={inputStyle}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* OTP SECTION */}
          {!isLogin && (
            <div className="space-y-3">
              {!otpSent ? (
                <button
                  type="button"
                  onClick={sendOtp}
                  className="w-full bg-purple-500/80 hover:bg-purple-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-purple-500/20"
                >
                  Send OTP
                </button>
              ) : (
                <div className="space-y-3 animate-fade-in">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className={inputStyle}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="w-full bg-emerald-500/80 hover:bg-emerald-600 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Verify OTP
                  </button>

                  {otpVerified && (
                    <p className="text-emerald-400 text-sm font-bold text-center drop-shadow-sm">
                      ✅ OTP Verified
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <input
            name="password"
            type="password"
            placeholder="Password"
            className={inputStyle}
            required
          />

          {!isLogin && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className={inputStyle}
              required
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-2xl font-black shadow-2xl shadow-blue-500/30 transition-all mt-4 active:scale-95"
          >
            {isLogin ? 'LOGIN' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setOtpSent(false);
              setOtpVerified(false);
              setOtp("");
            }}
            className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
          >
            {isLogin
              ? "Don't have an account? Register here"
              : "Already have an account? Login here"}
          </button>
        </div>

      </div>
    </div>
  );
}