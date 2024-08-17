import PropTypes from 'prop-types';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function Search({ onSearch }) {
    const { theme } = useContext(ThemeContext);
    const [inputValue, setInputValue] = useState('react');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
    const [noResults, setNoResults] = useState(false); 

    useEffect(() => {
        if (inputValue.length > 0) {
            const fetchSuggestions = async () => {
                try {
                    const response = await axios.get(`https://api.github.com/search/users?q=${inputValue}`);
                    const users = response.data.items;
                    setSuggestions(users);
                    setShowSuggestions(true);
                    setNoResults(users.length === 0); // Update noResults based on the response
                } catch (error) {
                    console.error('Error fetching GitHub user suggestions:', error);
                }
            };
            const debounceTimeout = setTimeout(fetchSuggestions, 300);

            return () => clearTimeout(debounceTimeout);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setNoResults(false); // Reset noResults when input is cleared
        }
    }, [inputValue]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        setActiveSuggestionIndex(-1);
    };

    const handleSuggestionClick = (username) => {
        setInputValue(username);
        setShowSuggestions(false);
        onSearch(username);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setActiveSuggestionIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp') {
            setActiveSuggestionIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : prevIndex
            );
        } else if (e.key === 'Enter') {
            if (activeSuggestionIndex >= 0) {
                handleSuggestionClick(suggestions[activeSuggestionIndex].login);
            }
        }
    };

    return (
        <div className="relative">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} 
                placeholder="Enter GitHub Username"
                className={`w-full p-2 border rounded-md focus:outline-none ${theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-gray-800 text-white border-gray-700'}`}
            />
            {showSuggestions && (
                <ul className={`absolute z-10 w-full max-h-60 overflow-y-auto rounded-md shadow-lg ${theme === 'light' ? 'bg-white border-gray-300' : 'bg-gray-800 border-gray-700'}`}>
                    {noResults ? (
                        <li className="p-2 text-center text-gray-500">No users found</li> // Display no results message
                    ) : (
                        suggestions.map((user, index) => (
                            <li
                                key={user.id}
                                className={`p-2 cursor-pointer ${theme === 'light' ? 'hover:bg-gray-200' : 'hover:bg-gray-700'} ${activeSuggestionIndex === index ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => handleSuggestionClick(user.login)}
                            >
                                {user.login}
                            </li>
                        ))
                    )}
                </ul>
            )}
        </div>
    );
};

Search.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default Search;
