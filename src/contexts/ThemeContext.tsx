import { ReactNode, createContext, useEffect, useState } from "react";

type TThemeContext = {
  isLightMode: boolean;
  changeThemeMode: () => void;
};

type TThemeProvider = {
  children: ReactNode;
};

const defaultState: TThemeContext = {
  isLightMode: true,
  changeThemeMode: () => {},
};

export const ThemeContext = createContext(defaultState);

export const ThemeProvider = ({ children }: TThemeProvider) => {
  const [isLightMode, setIsLightMode] = useState<boolean>(false);

  const changeThemeMode = () => {
    setIsLightMode((prev) => {
      localStorage.setItem("lightMode", JSON.stringify(!prev));
      return !prev;
    });
  };

  useEffect(() => {
    if (!localStorage?.getItem("lightMode")) setIsLightMode(true);
    else setIsLightMode(localStorage.getItem("lightMode") === "true");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage?.getItem("lightMode")]);

  return (
    <ThemeContext.Provider value={{ isLightMode, changeThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
