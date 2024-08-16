import PropTypes from 'prop-types';
import { useContext,useState,useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

function Search({onSearch}){
    const{theme} = useContext(ThemeContext);
    const[inputValue,setInputValue] = useState('');
    const[suggestions,setSuggestions] = useState([]);
    const[showSuggestions,setShowSuggestions] = useState(false);
    const[activesuggestionIndex,setActivesuggestionIndex] = useState(-1);


    useEffect(()=>{
        if (inputValue.length > 0) {
            const fetchSuggestions = async()=>{
                try {
                    const response = await axios.get(`https://api.github.com/search/users?q=${inputValue}`);
                    setShowSuggestions(response.data.items);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error('Error Fetching Github User Suggestion:' + error);
                }
            };

            const debounceTime = setTimeout(fetchSuggestions,300)
            return ()=>clearTimeout(debounceTime);
        }else{
            setSuggestions([]);
            setShowSuggestions(false);
        }

    },[inputValue])

    const handleInputChange=(e)=>{
        setInputValue(e.target.value);
        showSuggestions(-1); // reset active suggestion
    }

}