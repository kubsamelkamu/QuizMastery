import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Header(){
    const{theme,toggleTheme} = useContext(ThemeContext);

    return(
        <header className={`p-4 flex justify-between items-center ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>

            <button 
                onClick={toggleTheme}
                className={`px-4 py-2 rounded ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                
            </button>
        </header>
    )
}