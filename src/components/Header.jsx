import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { auth } from '../firebase';
import { FaSun, FaMoon } from 'react-icons/fa';

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Check if the user's display name exists
        if (user.displayName) {
          setUsername(user.displayName);
        } else {
          setUsername(null);
        }
      } else {
        setUsername(null);
      }
    });

    return () => unsubscribe();  
  }, []); 

  return (
    <header className={`p-4 flex justify-between items-center ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}>
      <div className="flex items-center space-x-2">
        <h3 className="text-2xl font-bold">QuizMastery</h3>
      </div>
      <div className="flex items-center space-y-4">
        {username &&  <div> <span className="mr-4">Welcome, {username}!</span> </div>}
       
        <button 
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          className={`px-4 py-2 rounded-full focus:outline-none transition duration-300 ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
        >
          {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
