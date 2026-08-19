import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("devflow-theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("devflow-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("devflow-theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((current) => !current);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
