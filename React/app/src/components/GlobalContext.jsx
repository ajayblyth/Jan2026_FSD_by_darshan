import React from "react";
import { useTheme } from "../context/ThemeContext";
const GlobalContext = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <h3 className="text-warning">GLobal Context</h3>
      <p>Theme: {theme}</p>
      <button className= {`btn btn-${theme} btm-sm`} onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
};

export default GlobalContext;
