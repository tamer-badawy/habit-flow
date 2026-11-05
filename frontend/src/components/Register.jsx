import React, { useState } from "react";
import api from "../services/api";
import {
  Mail,
  Lock,
  UserRoundPlus,
  ArrowLeft,
  UserRound,
  SquareExclamationPoint,
} from "lucide-react";
import logo from "../assets/logo.png";

export default function Register({ onSwitchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState([]);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Defensive client-side validation guard
    if (password !== confirmPassword) {
      return setError(["Passwords do not match. Please verify fields."]);
    }

    setIsSubmitting(true);

    try {
      await api.post("/auth/register", {
        email,
        password,
        password_confirm: confirmPassword,
        first_name: firstName,
        last_name: lastName,
      });
      setSuccess(true);
    } catch (err) {
      if (err.response) {
        let msg = [];
        if (typeof err.response.data?.detail == "array") {
          err.response.data?.detail.forEach((item) => {
            msg.push(item.msg);
          });
        } else {
          msg.push(err.response.data?.detail);
        }
        setError(msg);
      } else {
        setError(["Registration failed. Try again."]);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="w-1/2 max-w-md flex items-center justify-center flex-col bg-brand-dark border border-slate-800 p-8 rounded-2xl shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200">
        <div className="h-12 w-12 rounded-2xl border border-slate-700 flex items-center justify-center font-bold shadow-lg shadow-blue-900/30 text-2xl mb-3">
          <img src={logo} className="h-10 w-auto" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Account Created!
        </h2>
        <p className="text-slate-400 text-sm mt-2 mb-6">
          Your registration processed successfully. You can now log into your
          profile safely.
        </p>
        <button
          onClick={onSwitchToLogin}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2 mx-auto cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="w-1/2 bg-brand-dark border border-slate-800/80 p-8 rounded-2xl shadow-2xl  overflow-hidden animate-in fade-in zoom-in-95 duration-700">
      <div className="flex flex-col items-center mb-8">
        <div className="h-12 w-12 rounded-2xl border border-slate-700 flex items-center justify-center font-bold shadow-lg shadow-blue-900/30 text-2xl mb-3">
          <img src={logo} className="h-10 w-auto" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Join{" "}
          <span className="bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            HabitFlow
          </span>
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Start tracking your custom habits productively
        </p>
      </div>
      {error.length > 0 && (
        <div className="mb-5 p-3.5 bg-rose-950/40 border border-rose-500/30 rounded-xl text-xs font-semibold text-rose-400 animate-shake">
          <ul className="list-none pl-0 space-y-2">
            {error.map((e, i) => (
              <li className="flex flex-row items-start gap-2" key={i}>
                <SquareExclamationPoint className="shrink-0" size={16} />{" "}
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-row gap-2 mb-5">
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              First Name
            </label>
            <div className="relative">
              <UserRound
                className="absolute left-3.5 top-3.5 text-slate-500"
                size={18}
              />
              <input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-brand-card border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
                required
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Last Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Smith"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-brand-card border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
                required
              />
            </div>
          </div>
        </div>
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
              className="w-full pl-11 pr-4 py-3 bg-brand-card border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
              required
            />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Choose Password
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
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-brand-card border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-3.5 text-slate-500"
                size={18}
              />
              <input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                minLength={6}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-brand-card border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm font-medium"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:text-slate-400 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          {isSubmitting ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <UserRoundPlus size={16} /> Register New Profile
            </>
          )}
        </button>
      </form>
      <div className="mt-8 text-center pt-5 border-t border-slate-800/80">
        <p className="text-sm text-slate-400">
          Already have an account?
          <button
            onClick={onSwitchToLogin}
            className="text-blue-400 font-bold hover:underline focus:outline-none cursor-pointer"
          >
            Sign In instead
          </button>
        </p>
      </div>
    </div>
  );
}
