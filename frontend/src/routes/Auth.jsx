import { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function Auth() {
  const [isLoginScreen, setIsLoginScreen] = useState(true);

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
