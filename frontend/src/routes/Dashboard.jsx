import { useState, useEffect } from "react";
import HabitCard from "../components/HabitCard";
import HabitModal from "../components/HabitModal";

import NumPadModel from "../components/NumPadModal";
import { useLoaderData } from "react-router";
import { PlusIcon } from "lucide-react";
import api from "../services/api";

export default function Dashboard() {
  const [isNumPadModalOpen, setIsNumPadModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(null);
  const { initialHabits } = useLoaderData();

  const [habits, setHabits] = useState(initialHabits);

  const handleAddHabit = async (newHabitData) => {
    const newHabit = {
      name: newHabitData.name,
      category: newHabitData.category,
      is_numeric: newHabitData.isNumeric,
      target_value: newHabitData.targetValue,
      unit: newHabitData.unit,
    };
    try {
      const response = await api.post("/habits", newHabit);
      setHabits(response.data);
    } catch {}
  };

  const toggleHabit = (id) => {
    /* setHabits(
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
    );*/
  };

  const handleLogProgress = (value) => {
    console.log(value);

    /*setHabits(
      habits.map((habit) => {
        if (habit.id === id && habit.isNumeric) {
          const nextValue = habit.currentValue + 1;
          const reachedGoal = nextValue === habit.targetValue;
          return {
            ...habit,
            currentValue: nextValue,
            // Increment streak only at the exact moment they hit their numeric target threshold
            streak: reachedGoal ? habit.streak + 1 : habit.streak,
          };
        }
        return habit;
      }),
    );*/
  };

  const handleToggleLogProgress = (habit) => {
    setCurrentHabit(habit);
    setIsNumPadModalOpen(true);
  };

  useEffect(() => {
    setHabits(initialHabits);
  }, [initialHabits]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Main Habits Container */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-300 mb-2">
            Today's Habits
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-sm text-white px-2 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-900/30 transition-all flex items-center gap-1"
          >
            <PlusIcon /> Add New Habit
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {habits &&
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onToggle={toggleHabit}
                onToggleLogProgress={() => handleToggleLogProgress(habit)}
              />
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
      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddHabit={handleAddHabit}
      />
      <NumPadModel
        isOpen={isNumPadModalOpen}
        onClose={() => setIsNumPadModalOpen(false)}
        habit={currentHabit}
        onLogProgress={handleLogProgress}
      />
    </div>
  );
}
