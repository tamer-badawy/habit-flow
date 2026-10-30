import {
  createBrowserRouter,
  Navigate,
  Link,
  useRouteError,
  isRouteErrorResponse,
} from "react-router";
import Auth from "./routes/Auth";
import Dashboard from "./routes/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import logo from "./assets/logo.png";

export const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: RootErrorBoundary,
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    element: <ProtectedRoute />,

    children: [
      {
        element: <DashboardLayout />,
        ErrorBoundary: RootErrorBoundary,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
        ],
      },
    ],
  },
]);

function RootErrorBoundary() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <img src={logo} className="h-32 w-auto" />
        <span className="text-xl font-bold tracking-wide">HabitFlow</span>
        <h1 className="text-4xl p-6">
          {error.status} {error.statusText}
        </h1>
        <Link to="/dashboard">Back to Home</Link>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
