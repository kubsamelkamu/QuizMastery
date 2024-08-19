import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { FaGithub, FaSun, FaMoon } from 'react-icons/fa'; 

function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <header className={`p-4 flex justify-between items-center ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
            <div className="flex items-center space-x-2">
                <FaGithub size={28} />
                <h1 className="text-2xl font-bold">GitHub User Search</h1>
            </div>
            <button 
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                className={`px-4 py-2 rounded-full focus:outline-none transition duration-300 ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
            >
                {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
            </button>
        </header>
    );
}

export default Header;
