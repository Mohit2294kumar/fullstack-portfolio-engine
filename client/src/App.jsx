import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/ui/CustomCursor";
import Loader from "./components/ui/Loader";

const Home = lazy(() => import("./pages/Home"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CustomCursor />
        <div className="app-shell">
          <Navbar />
          <main>
            <Suspense fallback={<Loader fullScreen />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}