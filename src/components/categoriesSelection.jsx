import { useState ,useEffect } from "react";
import PropTypes from 'prop-types';
import axios  from "axios";

function CategoriesSelection({onCategorySelection}) {
    const[categories,setCategories] = useState([]);
    const[selectedCategories,setSelectedCategories] = useState('');

    const fetchcategories = async()=>{
        try {
            const response = await axios.get('https://opentdb.com/api_category.php');
            setCategories(response.data.trivia_categories || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    useEffect(()=>{
        fetchcategories();
    },[]);

       
       const handleCategoryChange = (event) => {
            const selected = event.target.value;
            setSelectedCategories(selected);
            onCategorySelection(selected); 
    };
}