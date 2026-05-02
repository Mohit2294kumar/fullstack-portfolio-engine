import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="btn btn-ghost" onClick={toggleTheme} type="button">
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
}