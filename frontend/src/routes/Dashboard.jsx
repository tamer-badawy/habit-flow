import { useState } from "react";
import HabitCard from "../components/HabitCard";

export default function Dashboard() {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "Morning Exercise",
      category: "Health",
      icon: "🏃‍♂️",
      streak: 17,
      isCompletedToday: false,
    },
    {
      id: 2,
      name: "Read 20 Pages",
      category: "Mind",
      icon: "📚",
      streak: 4,
      isCompletedToday: false,
    },
    {
      id: 3,
      name: "Drink 8 Glasses of Water",
      category: "Health",
      icon: "💧",
      streak: 22,
      isCompletedToday: true,
    },
    {
      id: 4,
      name: "Meditation",
      category: "Mind",
      icon: "🧘‍♂️",
      streak: 0,
      isCompletedToday: false,
    },
  ]);

  const toggleHabit = (id) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const nextState = !habit.isCompletedToday;
          return {
            ...habit,
            isCompletedToday: nextState,
            streak: nextState
              ? habit.streak + 1
              : Math.max(0, habit.streak - 1),
          };
        }
        return habit;
      }),
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Main Habits Container */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-lg font-bold text-slate-300 mb-2">
          Today's Habits
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onToggle={toggleHabit} />
          ))}
        </div>
      </div>

      {/* Quick Metrics Panel */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-300 mb-2">
          Weekly Summary
        </h2>
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
          <p className="text-sm text-slate-400 font-medium">Completion Rate</p>
          <p className="text-4xl font-black text-emerald-400 mt-1">75%</p>
          <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
            <div className="bg-emerald-400 h-full w-[75%]" />
          </div>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
          <p className="text-sm text-slate-400 font-medium">Top Performer</p>
          <p className="text-xl font-bold text-white mt-2">💧 Drink Water</p>
          <p className="text-xs text-slate-500 mt-1">
            Active streak of 22 consecutive days
          </p>
        </div>
      </div>
    </div>
  );
}
