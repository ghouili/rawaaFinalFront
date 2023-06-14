import React, { createContext, useEffect, useState } from "react";

const GeneralContext = createContext();

const ProvideContext = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const HandleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <GeneralContext.Provider value={{ menuOpen, setMenuOpen, HandleThemeSwitch, theme }}>
      {children}
    </GeneralContext.Provider>
  );
};

export { ProvideContext, GeneralContext };
