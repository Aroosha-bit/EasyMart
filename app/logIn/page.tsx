"use client";

import { useState, useEffect } from "react";
import icon from "../../public/assets/google.png";
import Image from "next/image";
import { useAuth } from "../lib/contexts/AuthContext";
import { Header } from "../components/Header";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    user,
    error,
    handleSignInWithGoogle,
    handleSignUpWithGoogle,
    handleSignInWithEmail,
    handleSignUpWithEmail,
  } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    if (mode === "login") {
      const success = await handleSignInWithEmail(email, password);

      if (success) {
        router.push("/");
      }
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const result = await handleSignUpWithEmail(email, password, name);

      if (result?.success) {
        alert("Verification email sent! Please check your inbox.");

        setMode("login");
      }
    }
  };

  useEffect(() => {
    if (user?.emailVerified == true) {
      router.push("/");
    }
  }, [router, user]);
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex min-h-[calc(100vh-70px)]">
        <div
          className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #B6349A 0%, #8B1A7A 60%, #5C0F52 100%)",
          }}
        >
          <div
            className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full opacity-20"
            style={{ background: "#FEF5FD" }}
          />
          <div
            className="absolute bottom-[-60px] left-[-60px] w-[250px] h-[250px] rounded-full opacity-10"
            style={{ background: "#FEF5FD" }}
          />
          <div
            className="absolute top-[40%] left-[30%] w-[120px] h-[120px] rounded-full opacity-10"
            style={{ background: "#FEF5FD" }}
          />

          <div className="relative z-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: "rgba(254,245,253,0.2)",
                color: "#FEF5FD",
                backdropFilter: "blur(8px)",
              }}
            >
              <Sparkles size={14} />
              Fresh Picks Daily
            </div>
          </div>

          <div className="relative z-10 space-y-6">
            <h2
              className="text-5xl font-black leading-tight"
              style={{ color: "#FEF5FD", fontFamily: "'Georgia', serif" }}
            >
              Your local
              <br />
              market,
              <br />
              <span
                className="italic"
                style={{ color: "rgba(254,245,253,0.75)" }}
              >
                delivered.
              </span>
            </h2>
            <p
              className="text-base leading-relaxed max-w-xs"
              style={{ color: "rgba(254,245,253,0.7)" }}
            >
              Join thousands of happy customers who shop fresh produce, artisan
              goods, and more — right from their neighbourhood.
            </p>

            <div className="flex gap-8 pt-4">
              {[
                ["10k+", "Happy Customers"],
                ["500+", "Local Vendors"],
                ["4.9★", "App Rating"],
              ].map(([val, label]) => (
                <div key={label}>
                  <div
                    className="text-2xl font-black"
                    style={{ color: "#FEF5FD" }}
                  >
                    {val}
                  </div>
                  <div
                    className="text-xs mt-1"
                    style={{ color: "rgba(254,245,253,0.6)" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 flex gap-3">
            {["🔒 Secure Checkout", "🚚 Fast Delivery", "♻️ Eco Friendly"].map(
              (badge) => (
                <span
                  key={badge}
                  className="text-xs px-3 py-1.5 rounded-full font-medium"
                  style={{
                    background: "rgba(254,245,253,0.15)",
                    color: "rgba(254,245,253,0.85)",
                  }}
                >
                  {badge}
                </span>
              ),
            )}
          </div>
        </div>

        <div
          className="flex-1 flex items-center justify-center px-6 py-12"
          style={{ background: "#FAFAFA" }}
        >
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-xl shadow-pink-100/60 overflow-hidden">
              <div className="flex" style={{ background: "#FEF5FD" }}>
                {(["login", "signup"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setMode(tab)}
                    className="flex-1 cursor-pointer py-4 text-sm font-bold tracking-wide transition-all duration-300 relative"
                    style={{
                      color: mode === tab ? "#B6349A" : "#9E8F9C",
                      background: mode === tab ? "#FFFFFF" : "transparent",
                      borderRadius:
                        tab === "login" ? "24px 0 0 0" : "0 24px 0 0",
                    }}
                  >
                    {tab === "login" ? "Sign In" : "Create Account"}
                    {mode === tab && (
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                        style={{ background: "#B6349A" }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-8 space-y-5">
                <div className="mb-6">
                  <h1 className="text-2xl font-black text-[#3E3B3F]">
                    {mode === "login" ? "Welcome back 👋" : "Join us today 🎉"}
                  </h1>
                  <p className="text-sm text-[#9E8F9C] mt-1">
                    {mode === "login"
                      ? "Sign in to continue shopping fresh."
                      : "Create your account and start exploring."}
                  </p>
                </div>

                {mode === "signup" && (
                  <div className="relative group">
                    <label className="text-xs font-semibold text-[#3E3B3F] mb-1.5 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C0BACF] group-focus-within:text-[#B6349A] transition-colors"
                      />
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-12 pl-11 pr-4 rounded-xl text-sm text-[#3E3B3F] outline-none border transition-all duration-200"
                        style={{
                          borderColor: "#E8E0EB",
                          background: "#FDFAFD",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#B6349A";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(182,52,154,0.08)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#E8E0EB";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-[#3E3B3F] mb-1.5 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C0BACF]"
                    />
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-12 pl-11 pr-4 rounded-xl text-sm text-[#3E3B3F] outline-none border transition-all duration-200"
                      style={{ borderColor: "#E8E0EB", background: "#FDFAFD" }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#B6349A";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 3px rgba(182,52,154,0.08)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#E8E0EB";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#3E3B3F] mb-1.5 block">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C0BACF]"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-12 pl-11 pr-12 rounded-xl text-sm text-[#3E3B3F] outline-none border transition-all duration-200"
                      style={{ borderColor: "#E8E0EB", background: "#FDFAFD" }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#B6349A";
                        e.currentTarget.style.boxShadow =
                          "0 0 0 3px rgba(182,52,154,0.08)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#E8E0EB";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C0BACF] hover:text-[#B6349A] transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {mode === "signup" && (
                  <div>
                    <label className="text-xs font-semibold text-[#3E3B3F] mb-1.5 block">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C0BACF]"
                      />
                      <input
                        type={showConfirm ? "text" : "password"}
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full h-12 pl-11 pr-12 rounded-xl text-sm text-[#3E3B3F] outline-none border transition-all duration-200"
                        style={{
                          borderColor: "#E8E0EB",
                          background: "#FDFAFD",
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = "#B6349A";
                          e.currentTarget.style.boxShadow =
                            "0 0 0 3px rgba(182,52,154,0.08)";
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = "#E8E0EB";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C0BACF] hover:text-[#B6349A] transition-colors"
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

                {mode === "login" && (
                  <div className="flex justify-end">
                    <button
                      className="text-xs font-semibold"
                      style={{ color: "#B6349A" }}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {error && (
                  <div
                    className="p-3 rounded-lg text-sm font-medium"
                    style={{
                      background: "#FEF2F2",
                      color: "#991B1B",
                      border: "1px solid #FCA5A5",
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  className="w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #B6349A, #8B1A7A)",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 20px rgba(182,52,154,0.35)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 6px 28px rgba(182,52,154,0.5)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(182,52,154,0.35)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight size={16} />
                </button>

                <div className="flex items-center gap-4">
                  <div
                    className="flex-1 h-px"
                    style={{ background: "#F0E8F0" }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#C0BACF" }}
                  >
                    or continue with
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: "#F0E8F0" }}
                  />
                </div>

                <button
                  onClick={
                    mode === "login"
                      ? handleSignInWithGoogle
                      : handleSignUpWithGoogle
                  }
                  className="w-full h-12 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 border transition-all duration-200 active:scale-[0.98]"
                  style={{
                    borderColor: "#E8E0EB",
                    color: "#3E3B3F",
                    background: "#FFFFFF",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#B6349A";
                    e.currentTarget.style.background = "#FEF5FD";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#E8E0EB";
                    e.currentTarget.style.background = "#FFFFFF";
                  }}
                >
                  <Image src={icon} alt="Google" className="w-5 h-5" />
                  Continue with Google
                </button>

                <p className="text-center text-xs" style={{ color: "#9E8F9C" }}>
                  {mode === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    onClick={() =>
                      setMode(mode === "login" ? "signup" : "login")
                    }
                    className="font-bold transition-colors"
                    style={{ color: "#B6349A" }}
                  >
                    {mode === "login" ? "Sign up free" : "Sign in"}
                  </button>
                </p>
              </div>
            </div>

            <p
              className="text-center text-xs mt-6"
              style={{ color: "#C0BACF" }}
            >
              By continuing, you agree to our{" "}
              <span
                className="underline cursor-pointer"
                style={{ color: "#B6349A" }}
              >
                Terms
              </span>{" "}
              &{" "}
              <span
                className="underline cursor-pointer"
                style={{ color: "#B6349A" }}
              >
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
