import { useState, useEffect } from "react";

export default function NumPadModel({ isOpen, onClose, onLogProgress, habit }) {
  const [inputValue, setInputValue] = useState("");

  // Handle custom numpad typing
  const handleKeyPress = (num) => {
    if (inputValue.length > 4) return;
    setInputValue((prev) => prev + num);
  };

  const handleClear = () => setInputValue("");

  const handleLogProgress = () => {
    if (inputValue.trim == "") return;
    onLogProgress(inputValue);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setInputValue("");
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-focus inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="bg-brand-dark w-full max-w-sm rounded-2xl  border border-slate-800 p-6 shadow-2xl transition-transform animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center mb-4">
          <h4 className="font-bold text-white text-lg">
            Update Progress for {habit.name}
          </h4>
          <p className="text-sm text-slate-400">
            Target: {habit.targetValue ?? 1} {habit.unit ?? ""}
          </p>
        </div>

        {/* Display Screen */}
        <div className="bg-brand-card border border-slate-700/50 rounded-2xl py-4 px-6 text-center mb-6">
          <span className="text-2xl font-black text-white">
            {inputValue || "0"}
          </span>
          <span className="text-sm font-semibold text-slate-500 ml-2">
            {habit.unit ?? ""}
          </span>
        </div>

        {/* Grid Numpad Layout */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-rose-500 font-semibold rounded-xl text-sm transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => handleKeyPress("0")}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition-colors"
          >
            0
          </button>
          <button
            onClick={() => setInputValue(habit.targetValue.toString())}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-semibold rounded-xl text-sm transition-colors"
          >
            Max
          </button>
        </div>

        {/* Modal Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-900/30 transition-all"
          >
            Save Progress
          </button>
        </div>
      </div>
    </div>
  );
}
