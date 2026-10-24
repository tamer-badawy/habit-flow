import React, { useState, useContext } from "react";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import HabitCard from "./components/HabitCard";
import HabitModal from "./components/HabitModal";
import { RouterProvider } from "react-router";
import { router } from "./router";

function DashboardShell() {
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Simulating an active state fetched from an API
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

  // Handler to toggle completeness and adjust the streak dynamically
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

  const handleAddHabit = (newHabitData) => {
    const newHabit = {
      id: habits.length + 1,
      name: newHabitData.name,
      category: newHabitData.category,
      streak: 0,
      isCompletedToday: false,
    };
    setHabits([...habits, newHabit]);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between  md:flex">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-white">
              ⚡
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              HabitFlow
            </h1>
          </div>
          <nav className="space-y-2">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800 text-white font-medium"
            >
              📋 Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors"
            >
              📊 Analytics
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition-colors"
            >
              ⚙️ Settings
            </a>
          </nav>
        </div>
        <div className="border-t border-slate-800 pt-4 flex items-center gap-3">
          <div className="h-10 w-10 bg-slate-700 rounded-full flex items-center justify-center font-bold">
            A
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Alex Johnson</p>
            <p className="text-xs text-slate-500">Premium User</p>
          </div>
        </div>
      </aside>

      {/* Main Dashboard Screen Container */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome back, Alex!
            </h1>
            <p className="text-slate-400 mt-1">
              Today's Focus: Friday, October 9, 2026
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-900/30 transition-all flex items-center gap-2"
          >
            <span>+</span> Add New Habit
          </button>
        </header>

        {/* Dashboard Grid Workspace */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Habits Container */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-300 mb-2">
              Today's Habits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={toggleHabit}
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
              <p className="text-sm text-slate-400 font-medium">
                Completion Rate
              </p>
              <p className="text-4xl font-black text-emerald-400 mt-1">75%</p>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-emerald-400 h-full w-[75%]" />
              </div>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6">
              <p className="text-sm text-slate-400 font-medium">
                Top Performer
              </p>
              <p className="text-xl font-bold text-white mt-2">
                💧 Drink Water
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Active streak of 22 consecutive days
              </p>
            </div>
          </div>
        </div>
      </main>
      {/* Embedded Component Modal Box Frame */}
      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddHabit={handleAddHabit}
      />
    </div>
  );
}

function AuthRouter() {
  const { user, loading } = useContext(AuthContext);
  const [isLoginScreen, setIsLoginScreen] = useState(true); // 'login' or 'register'

  // 1. App Startup Guard: Displays full-screen loading spinner while verifying HttpOnly cookies
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 2. Unauthenticated Gate: Show Login or Register screens if state user is null
  if (!user) {
    return (
      <div className="relative  min-h-screen w-full max-w-md mt-12  mx-auto overflow-hidden bg-brand-bg  ">
        <div
          className={`flex w-[200%] max-w-4xl h-full transition-transform ${isLoginScreen ? "translate-x-0" : "-translate-x-1/2"} duration-500 ease-in-out`}
        >
          <Login onSwitchToRegister={() => setIsLoginScreen(false)} />

          <Register onSwitchToLogin={() => setIsLoginScreen(true)} />
        </div>
      </div>
    );
  }

  // 3. Authenticated Gate: Serve the secure workspace dashboard dashboard shell
  return <DashboardShell />;
}

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
