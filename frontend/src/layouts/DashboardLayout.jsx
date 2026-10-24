import { useState, useContext, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate } from "react-router";
import HabitModal from "../components/HabitModal";
import { AuthContext } from "../context/AuthContext";
import {
  LayoutDashboardIcon,
  ChartNetworkIcon,
  SettingsIcon,
  LogOutIcon,
} from "lucide-react";
import { useOutsideClick } from "../utils/useOutsideClick";
import logo from "../assets/logo.png";

export default function DashboardLayout() {
  const { logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sidebarRef = useRef(null);
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);

  const toggleSidebar = (e) => {
    setIsOpenSidebar(!isOpenSidebar);
  };
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    await logout();
    navigate("/login");
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

  useEffect(() => {
    console.log(window.innerWidth);
    setIsOpenSidebar(window.innerWidth >= 768);
  }, []);

  useOutsideClick(sidebarRef, () => {
    if (isOpenSidebar && window.innerWidth < 768) setIsOpenSidebar(false);
  });

  return (
    <div className="grid grid-cols-[70px_1fr] grid-rows-[60px_1fr]  h-screen w-screen bg-slate-900 text-slate-100 ">
      {/* Top Bar */}
      <nav className="row-start-1 col-span-full grid grid-cols-[60px_1fr_60px] items-center border-b bg-slate-800/70 border-slate-700/50 z-50">
        <button
          onClick={toggleSidebar}
          className="flex justify-center cursor-pointer transition-transform duration-200 ease-in-out hover:rotate-45"
        >
          <img src={logo} className="h-10 w-auto" />
        </button>
        <span className="text-center text-xl font-bold tracking-tight">
          HabitFlow
        </span>
        <div className="w-15"></div>
      </nav>
      {/* Sidebar Navigation */}
      <aside
        ref={sidebarRef}
        className={`fixed md:relative top-15 md:top-0 h-[calc(100vh-60px)] md:h-full left-0 transition-transform duration-200 ease-in-out ${isOpenSidebar ? "translate-x-0" : "-translate-x-full"} row-start-2 col-start-1  bg-slate-800/60 border-r max-md:bg-slate-800 border-slate-700/50  z-40`}
      >
        <nav className="flex flex-col h-full justify-start items-center gap-8 p-4">
          <Link
            to="/dashboard"
            className="flex flex-col gap-2 justify-center items-center group"
          >
            <LayoutDashboardIcon
              size={48}
              className="transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:rotate-45 group-active:scale-110 group-active:rotate-45"
            />
            <span className="text-white text-xs font-semibold text-center tracking-tight">
              Dashboard
            </span>
          </Link>
          <Link
            to="/analysis"
            className="group flex flex-col gap-2 justify-center items-center"
          >
            <ChartNetworkIcon
              size={48}
              className="transition-transform duration-200 ease-in-out  group-hover:scale-110 group-hover:rotate-45 group-active:scale-110 group-active:rotate-45"
            />
            <span className="text-white text-xs font-semibold text-center tracking-tight">
              Analysis
            </span>
          </Link>
          <Link
            to="/settings"
            className="group flex flex-col gap-2 justify-center items-center"
          >
            <SettingsIcon
              size={48}
              className="transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:rotate-45 group-active:scale-110 group-active:rotate-45"
            />
            <span className="text-white text-xs font-semibold text-center tracking-tight">
              Settings
            </span>
          </Link>
          <button
            className="group flex flex-col gap-2 justify-center items-center md:mt-auto cursor-pointer"
            onClick={handleLogout}
          >
            <LogOutIcon
              size={48}
              className="transition-transform duration-200 ease-in-out group-hover:scale-110 group-hover:rotate-45 group-active:scale-110 group-active:rotate-45"
            />
            <span className="text-white text-xs font-semibold text-center tracking-tight">
              Logout
            </span>
          </button>
        </nav>
      </aside>
      <div className="col-start-2 max-md:col-start-1 max-md:col-span-2 row-start-2 flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <header className="flex justify-between items-center mb-8 p-6 md:p-10">
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

        {/* Main Dashboard Screen Container */}
        <main className="flex-1 p-6 md:p-10  mx-auto">
          <Outlet />
        </main>
      </div>
      {/* Embedded Component Modal Box Frame */}
      <HabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddHabit={handleAddHabit}
      />
    </div>
  );
}
