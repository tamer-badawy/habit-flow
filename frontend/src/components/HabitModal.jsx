import React, { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { getHabitIcon } from "../utils/icons";

export default function HabitModal({ isOpen, onAddHabit, onClose }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Health");

  //Mocking predefined suggestion that will return from Backend
  const predefinedSuggestions = {
    Health: ["Go to the Gym", "Drink Water", "Stretch", "Sleep 8 Hours"],
    Mind: ["Meditate", "Read a Book", "Journal", "No Screen Time"],
    Work: ["Code Python", "Review PRs", "Clear Inbox", "Study System Design"],
    Lifestyle: [
      "Water Plants",
      "Practice Guitar",
      "Walk the Dog",
      "Cook a Meal",
    ],
  };

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setCategory("Health");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const LiveIconComponent = getHabitIcon(name, category);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim == "") return;
    onAddHabit({ name, category });
    onClose();
  };

  return (
    <div className="fixed inset-focus inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-brand-dark border border-slate-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-blue-400" size={24} /> Create New Habit
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Live Icon & Name Input Row */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Habit Name
            </label>
            <div className="flex gap-3">
              <div className="h-12 w-12 rounded-xl bg-brand-card border border-slate-700/50 flex items-center justify-center text-blue-400 shadow-inner shrink-0">
                <LiveIconComponent size={24} />
              </div>
              <input
                type="text"
                placeholder="e.g., Read 20 Pages or choose a suggestion below..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-3 bg-brand-card border border-slate-700/50 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm font-medium"
                required
              />
            </div>
          </div>

          {/* Category Dropdown Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Category Group
            </label>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setName(""); // Reset name when switching categories to cleanly showcase recommendations
              }}
              className="w-full px-4 py-3 bg-brand-card border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all text-sm font-medium appearance-none"
            >
              {Object.keys(predefinedSuggestions).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Start Suggestions Grid */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Quick Start Suggestions
            </label>
            <div className="flex flex-wrap gap-2">
              {predefinedSuggestions[category].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setName(suggestion)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold tracking-wide transition-all duration-150 ${
                    name === suggestion
                      ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-sm"
                      : "bg-brand-card/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="flex gap-3 justify-end pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-900/30 transition-all"
            >
              Save Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
