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

    return (
        <div className="mt-4">
            <label htmlFor="categories" className="block mb-2 text-lg font-semibold">Select Category</label>
            <select
                id="categories"
                value={selectedCategories}
                onChange={handleCategoryChange}
                className="p-2 border border-gray-300 rounded-md"
            >
                <option value="">Choose a category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

CategoriesSelection.propTypes = {
    onCategorySelection: PropTypes.func.isRequired, 
};

export default CategoriesSelection;