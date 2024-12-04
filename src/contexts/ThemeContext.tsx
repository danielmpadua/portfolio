import { ThemeProvider } from "@mui/material";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { DarkTheme, LightTheme } from "../themes";

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

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider = ({ children }: TThemeProvider) => {
  const [isLightMode, setIsLightMode] = useState<boolean>(
    localStorage.getItem("lightMode") === "true"
  );

  const changeThemeMode = useCallback(() => {
    setIsLightMode((prev) => {
      localStorage.setItem("lightMode", JSON.stringify(!prev));
      return !prev;
    });
  }, []);

  const theme = useCallback(() => {
    if (isLightMode) return LightTheme;
    return DarkTheme;
  }, [isLightMode]);

  return (
    <ThemeContext.Provider value={{ isLightMode, changeThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
