import { useState ,useEffect } from "react";
import PropTypes from 'prop-types';
import axios  from "axios";

function CategoriesSelection({onCategorySelection}) {
    const[categories,setCategories] = useState([]);
    const[selectedCategories,setSelectedCategories] = useState('');
}