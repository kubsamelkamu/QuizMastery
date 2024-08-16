import { createContext,useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider(){
    const[theme,setTheme] = useState('light');

    const toggleTheme =()=>{
        setTheme((prevTheme)=>(prevTheme==='light'?'dark':'light'));
    }
}