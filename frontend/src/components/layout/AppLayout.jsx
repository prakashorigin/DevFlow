import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? "lg:pl-20" : "lg:pl-72"
        }`}
      >
        <Topbar onMenuClick={() => setMobileOpen(true)} />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
