import PropTypes from 'prop-types';
import { useContext,useState,useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

function Search({onSearch}){
    const{theme} = useContext(ThemeContext);
    const[inputValue,setInputValue] = useState('');
    const[suggestions,setSuggestions] = useState([]);
    const[showSuggestions,setShowSuggestions] = useState(false);
    const[activesuggestionIndex,setActivesuggestionIndex] = useState(-1);

    const handleInputChange=(e)=>{
        setInputValue(e.target.value);
        showSuggestions(-1); // reset active suggestion
    }

}