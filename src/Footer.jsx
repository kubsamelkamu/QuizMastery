import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer(){
    const{theme} = useContext(ThemeContext);

    return(
        <footer className={`p-4 ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-gray-200'}`}>
            <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row">
                <div className="mb-4 sm:mb-0">
                    <p className="text-sm">© 2024 Github user search. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub className="text-2xl hover:text-blue-500 transition-colors duration-200" />
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin className="text-2xl hover:text-blue-500 transition-colors duration-200" />
                    </a>
                    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <FaInstagram className="text-2xl hover:text-blue-500 transition-colors duration-200" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

