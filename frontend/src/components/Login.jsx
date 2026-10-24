import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Mail, Lock, LogIn, Sparkles } from "lucide-react";

export default function Login({ onSwitchToRegister }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(email, password);
    } catch (err) {
      setError("Invalid email or password credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" w-1/2  bg-brand-dark border border-slate-800/80 p-8 rounded-2xl shadow-2xl  overflow-hidden animate-in fade-in zoom-in-95 duration-700">
      {/* Visual Identity Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/30 text-2xl mb-3">
          ⚡
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-1.5">
          Welcome back to{" "}
          <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            HabitFlow
          </span>
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Enter your credentials to manage your streaks
        </p>
      </div>
      {/* Error Callout Panel */}
      {error && (
        <div className="mb-5 p-3.5 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs font-semibold text-rose-400 animate-shake">
          ⚠️ {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field Group */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail
              className="absolute left-3.5 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-brand-card border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium"
              required
            />
          </div>
        </div>

        {/* Password Field Group */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-3.5 top-3.5 text-slate-500"
              size={18}
            />
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-brand-card border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium"
              required
            />
          </div>
        </div>

        {/* Submit Execution Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:text-slate-400 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          {isSubmitting ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <LogIn size={16} /> Sign In to Dashboard
            </>
          )}
        </button>
      </form>
      {/* Switch Form Redirection Link */}
      <div className="mt-8 text-center pt-5 border-t border-slate-800/80">
        <p className="text-sm text-slate-400">
          New to the platform?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-blue-400 font-bold hover:underline focus:outline-none cursor-pointer"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}
