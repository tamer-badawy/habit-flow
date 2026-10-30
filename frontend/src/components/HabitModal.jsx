import React, { useState, useEffect } from "react";
import { X, Sparkles, CheckSquare, Hash } from "lucide-react";
import { getHabitIcon } from "../utils/icons";

export default function HabitModal({ isOpen, onAddHabit, onClose }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Health");
  const [isNumeric, setIsNumeric] = useState(false);
  const [targetValue, setTargetValue] = useState(1);
  const [unit, setUnit] = useState("");

  //Mocking predefined suggestion that will return from Backend
  const predefinedSuggestions = {
    Health: [
      { name: "Go to the Gym", isNumeric: false },
      { name: "Drink Water", isNumeric: true, target: 8, unit: "glasses" },
      { name: "Stretch", isNumeric: false },
      { name: "Sleep 8 Hours", isNumeric: true, target: 8, unit: "hours" },
      { name: "Run", isNumeric: true, target: 5, unit: "km" },
    ],
    Mind: [
      { name: "Meditate", isNumeric: false },
      { name: "Read a Book", isNumeric: true, target: 20, unit: "pages" },
      { name: "Journal", isNumeric: false },
      { name: "No Screen Time", isNumeric: true, target: 4, unit: "hours" },
    ],
    Work: [
      { name: "Code Python", isNumeric: true, target: 2, unit: "hours" },
      { name: "Review PRs", isNumeric: false },
      { name: "Clear Inbox", isNumeric: false },
      {
        name: "Study System Design",
        isNumeric: true,
        target: 2,
        unit: "hours",
      },
    ],
    Lifestyle: [
      { name: "Water Plants", isNumeric: false },
      { name: "Practice Guitar", isNumeric: true, target: 30, unit: "mins" },
      { name: "Walk the Dog", isNumeric: true, target: 30, unit: "mins" },
      { name: "Cook a Meal", isNumeric: false },
    ],
  };

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setCategory("Health");
      setIsNumeric(false);
      setTargetValue(1);
      setUnit("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const LiveIconComponent = getHabitIcon(name, category);

  const handleSuggestion = (suggestion) => {
    setName(suggestion.name);
    setIsNumeric(suggestion.isNumeric);
    if (suggestion.isNumeric) {
      setTargetValue(suggestion.target);
      setUnit(suggestion.unit);
    } else {
      setTargetValue(1);
      setUnit("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim == "") return;
    onAddHabit({ name, category });
    onClose();
  };

  return (
    <div className="fixed inset-focus inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-xl bg-brand-dark border border-slate-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden transition-transform animate-in fade-in zoom-in-95 duration-700 ease-in-out">
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

          {/* Tracking Mode Toggle Grid (Simple vs Measurable) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Tracking Tracking Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsNumeric(false)}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  !isNumeric
                    ? "bg-blue-600/10 border-blue-500 text-blue-400"
                    : "bg-brand-card/40 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <CheckSquare size={20} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">
                    Simple Checkbox
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Just mark it as complete (e.g. Gym)
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setIsNumeric(true)}
                className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  isNumeric
                    ? "bg-blue-600/10 border-blue-500 text-blue-400"
                    : "bg-brand-card/40 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <Hash size={20} className="mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-white">
                    Measurable Goal
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Track sub-units daily (e.g. Water)
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Smooth Transition Box: Hidden unless "Measurable Goal" is selected */}
          {isNumeric && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 animate-in slide-in-from-top-2 duration-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Daily Target
                </label>
                <input
                  type="number"
                  min="1"
                  value={targetValue}
                  onChange={(e) => setTargetValue(e.target.value)}
                  className="w-full px-4 py-2.5 bg-brand-card border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500 text-sm font-medium"
                  required={isNumeric}
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Unit
                </label>
                <input
                  type="text"
                  placeholder="e.g. glasses, pages, km"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-4 py-2.5 bg-brand-card border border-slate-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500 text-sm font-medium"
                  required={isNumeric}
                />
              </div>
            </div>
          )}

          {/* Quick Start Suggestions Grid */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Quick Start Suggestions
            </label>
            <div className="flex flex-wrap gap-2">
              {predefinedSuggestions[category].map((suggestion) => (
                <button
                  key={suggestion.name}
                  type="button"
                  onClick={() => handleSuggestion(suggestion)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold tracking-wide transition-all duration-150 ${
                    name === suggestion.name
                      ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-sm"
                      : "bg-brand-card/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  }`}
                >
                  {suggestion.name}
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
