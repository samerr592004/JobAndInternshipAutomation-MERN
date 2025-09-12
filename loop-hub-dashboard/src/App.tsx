import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Overview from "./pages/Overview";
import MyLoops from "./pages/MyLoops";
import Board from "./pages/Board";
import AllMatches from "./pages/AllMatches";
import MyApplications from "./pages/MyApplications";
import CVChecker from "./pages/CVChecker";
import Inbox from "./pages/Inbox";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

// Layout wrapper components for different route groups
const PublicRoutes = () => (
  <PublicLayout>
    <Outlet />
  </PublicLayout>
);

const AuthRoutes = () => (
  <AuthLayout>
    <Outlet />
  </AuthLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes without sidebar */}
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Add more public routes here if needed */}
          </Route>
          
          {/* Protected/Dashboard routes with sidebar */}
          <Route element={
            <ProtectedRoute>
              <AuthRoutes />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Overview />} />
            <Route path="/my-loops" element={<MyLoops />} />
            <Route path="/board" element={<Board />} />
            <Route path="/all-matches" element={<AllMatches />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/cv-checker" element={<CVChecker />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          
          {/* 404 route - using public layout */}
          <Route path="*" element={
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;