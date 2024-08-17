import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer(){
    const{theme} = useContext(ThemeContext);

    return(
        <footer className={`p-4 ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-gray-200'}`}>

        </footer>
    )
}