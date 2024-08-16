import { createContext,useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider(){
    const[theme,setTheme] = useState('light');
}