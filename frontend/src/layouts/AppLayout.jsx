import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ToastProvider } from "../components/Toast";
import { AppProvider } from "../contexts/AppContext";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!sidebarOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [sidebarOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) setSidebarOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <ToastProvider>
      <AppProvider>
        <div className="app-shell">
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <div className="app-content">
            <Topbar onMenuClick={() => setSidebarOpen(true)} />

            <main className="page-content">
              <Outlet />
            </main>
          </div>
        </div>
      </AppProvider>
    </ToastProvider>
  );
}
