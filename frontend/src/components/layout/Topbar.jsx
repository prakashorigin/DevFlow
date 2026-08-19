import { Menu, Search, Bell, Sun, Moon, ChevronDown } from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

function Topbar({ onMenuClick }) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-6 dark:border-slate-800 dark:bg-slate-950/95">
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <Menu size={21} />
        </button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:bg-slate-900"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          title="Toggle theme"
        >
          {darkMode ? <Sun size={19} /> : <Moon size={19} />}
        </button>

        {/* Notifications */}
        <button className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          <Bell size={19} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <button className="ml-1 flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            P
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-slate-800 dark:text-white">
              Prakash
            </p>

            <p className="text-xs text-slate-400">Developer</p>
          </div>

          <ChevronDown size={16} className="hidden text-slate-400 md:block" />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
