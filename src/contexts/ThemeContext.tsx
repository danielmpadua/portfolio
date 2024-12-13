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

  return (
    <ThemeContext.Provider value={{ isLightMode, changeThemeMode }}>
      <ThemeProvider theme={isLightMode ? LightTheme : DarkTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
