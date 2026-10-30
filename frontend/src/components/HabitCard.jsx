import { getHabitIcon } from "../utils/icons";
import { Flame, Plus, CheckCircle2 } from "lucide-react";

export default function HabitCard({ habit, onToggle, onToggleLogProgress }) {
  const IconComponent = getHabitIcon(habit.name, habit.category);

  const isCompleted = habit.isNumeric
    ? habit.currentValue >= habit.targetValue
    : habit.isCompletedToday;

  const progressPercentage = habit.isNumeric
    ? Math.min(100, (habit.currentValue / habit.targetValue) * 100) || 0
    : habit.isCompletedToday
      ? 100
      : 0;

  return (
    <div
      className={`p-6 rounded-2xl border transition-all duration-300
            ${
              habit.isCompletedToday
                ? "bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-950/50"
                : "bg-slate-800/60 border-slate-700/50 hover:border-slate-500"
            }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-700 text-slate-300">
            {habit.category}
          </span>
          {/* Visual Row containing our custom icon and title layout */}
          <div className="flex items-center gap-3 mt-3">
            <div
              className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                isCompleted
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-slate-700/50 text-slate-300"
              }`}
            >
              <IconComponent size={22} strokeWidth={2} />
            </div>
            <h3 className="text-lg font-bold text-white">{habit.name}</h3>
          </div>
        </div>
        <div className="text-right">
          <Flame
            size={16}
            className={
              habit.streak > 0
                ? "text-amber-500 fill-amber-500"
                : "text-slate-500"
            }
          />
          <span className="text-xs font-bold text-slate-300">
            {habit.streak}d
          </span>
        </div>
      </div>
      {/* Center Numeric Metadata Fractions Tracker (Only shows if item is numeric) */}
      <div className="flex justify-between items-end mb-2 mt-6">
        <p className="text-xs text-slate-400 font-medium">
          Daily Target Progress
        </p>
        <p className="text-sm font-bold text-white">
          {habit.isNumeric ? (
            <>
              <span
                className={isCompleted ? "text-emerald-400" : "text-blue-400"}
              >
                {habit.currentValue}
              </span>
              <span className="text-slate-500">
                {" "}
                / {habit.targetValue} {habit.unit}
              </span>
            </>
          ) : isCompleted ? (
            "Completed"
          ) : (
            "Not Done"
          )}
        </p>
      </div>

      {/* Progressbar */}
      <div className="w-full bg-slate-700 h-2 rounded-full mb-6 overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ${habit.isCompletedToday ? "bg-emerald-400" : "bg-blue-400"}`}
          style={{ width: progressPercentage + "%" }}
        ></div>
      </div>
      {/* ============================================================
          3. CONDITIONAL INTERACTION CONTROLLERS WORKSPACE
         ============================================================ */}
      {habit.isNumeric ? (
        /* STYLE A: QUANTITATIVE STEPPER WIDGET CONTROLLER BUTTON GRID */
        <div className="flex gap-3">
          <button
            onClick={() => onToggleLogProgress(habit)}
            className={`flex-2 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isCompleted
                ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-950/20"
                : "bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-950/20"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 size={16} /> Added Log ({habit.currentValue})
              </>
            ) : (
              <>
                <Plus size={16} /> Log Progress
              </>
            )}
          </button>
        </div>
      ) : (
        /* STYLE B: STANDARD BINARY TRUE/FALSE CHECKBOX TOGGLE CONTAINER */
        <div className="flex gap-3">
          <button
            onClick={() => onToggle(habit.id)}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isCompleted
                ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md shadow-emerald-950/20"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 size={16} /> Done For Today!
              </>
            ) : (
              "Mark Completed"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
