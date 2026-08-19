import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Bug,
  Code2,
  Bot,
  BarChart3,
  Users,
  Bell,
  Settings,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const mainNavigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    name: "Tasks",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Issues",
    path: "/issues",
    icon: Bug,
  },
];

const aiNavigation = [
  {
    name: "Code Review",
    path: "/ai/code-review",
    icon: Code2,
  },
  {
    name: "Bug Analyzer",
    path: "/ai/bug-analyzer",
    icon: Bot,
  },
];

const managementNavigation = [
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Team",
    path: "/team",
    icon: Users,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
];

function NavigationItem({ item, collapsed, onNavigate }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onNavigate}
      title={collapsed ? item.name : undefined}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
          isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        } ${collapsed ? "justify-center" : ""}`
      }
    >
      <Icon size={19} />

      {!collapsed && <span>{item.name}</span>}
    </NavLink>
  );
}

function NavigationSection({ title, items, collapsed, onNavigate }) {
  return (
    <div className="mb-6">
      {!collapsed && (
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          {title}
        </p>
      )}

      <div className="space-y-1">
        {items.map((item) => (
          <NavigationItem
            key={item.path}
            item={item}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
}

function Sidebar({ mobileOpen, setMobileOpen, collapsed, setCollapsed }) {
  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950
        ${collapsed ? "w-20" : "w-72"}
        ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4 dark:border-slate-800">
          <div
            className={`flex items-center gap-3 ${collapsed ? "mx-auto" : ""}`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
              D
            </div>

            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  DevFlow
                </h1>

                <p className="text-xs text-slate-400">Developer Platform</p>
              </div>
            )}
          </div>

          <button
            onClick={closeMobileSidebar}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden dark:hover:bg-slate-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-6">
          <NavigationSection
            title="Workspace"
            items={mainNavigation}
            collapsed={collapsed}
            onNavigate={closeMobileSidebar}
          />

          <NavigationSection
            title="AI Tools"
            items={aiNavigation}
            collapsed={collapsed}
            onNavigate={closeMobileSidebar}
          />

          <NavigationSection
            title="Management"
            items={managementNavigation}
            collapsed={collapsed}
            onNavigate={closeMobileSidebar}
          />

          <NavigationSection
            title="System"
            items={[
              {
                name: "Settings",
                path: "/settings",
                icon: Settings,
              },
            ]}
            collapsed={collapsed}
            onNavigate={closeMobileSidebar}
          />
        </div>

        {/* Collapse button */}
        <div className="hidden border-t border-slate-200 p-3 lg:block dark:border-slate-800">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <>
                <ChevronLeft size={18} />
                Collapse
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
