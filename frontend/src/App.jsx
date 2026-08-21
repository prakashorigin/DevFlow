import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { ProjectProvider } from "./context/ProjectContext";
import AppRoutes from "./routes/AppRoutes";
import SplashScreen from "./components/common/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(false);
  useEffect(() => { if (!sessionStorage.getItem("devflow-intro")) setShowSplash(true); }, []);
  const finishSplash = () => { sessionStorage.setItem("devflow-intro", "1"); setShowSplash(false); };
  return <ThemeProvider><AuthProvider><ProjectProvider><BrowserRouter><AnimatePresence>{showSplash && <SplashScreen onComplete={finishSplash} />}</AnimatePresence><AppRoutes /></BrowserRouter></ProjectProvider></AuthProvider></ThemeProvider>;
}
export default App;
