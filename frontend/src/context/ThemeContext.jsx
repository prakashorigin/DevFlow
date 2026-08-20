import { useEffect, useState } from "react";
import { ThemeContext } from "./theme";

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("devflow-theme");
    return savedTheme ? savedTheme === "dark" : true;
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
