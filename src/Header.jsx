import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FaGithub } from 'react-icons/fa'; 

function Header(){
    const{theme,toggleTheme} = useContext(ThemeContext);

    return(
        <header className={`p-4 flex justify-between items-center ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
            
            <div className="flex items-center space-x-2">
                <FaGithub size={28} />
                <h1 className="text-2xl font-bold">GitHub User Search</h1>
            </div>
            <button 
                onClick={toggleTheme}
                className={`px-4 py-2 rounded aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            >
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button>
        </header>
    );
}

export default Header;