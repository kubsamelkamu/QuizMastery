import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Header(){
    const{theme,toggleTheme} = useContext(ThemeContext);

    return(
        <header className={`p-4 flex justify-between items-center ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>

        </header>
    )
}