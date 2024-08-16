import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Header(){
    const{theme,toggleTheme} = useContext(ThemeContext);
}