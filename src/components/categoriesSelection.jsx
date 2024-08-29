import { useState ,useEffect } from "react";
import PropTypes from 'prop-types';
import axios  from "axios";

function CategoriesSelection({ onCategorySelect }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api_category.php');
                setCategories(response.data.trivia_categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
        onCategorySelect(selectedValue);  
    };

    return (
        <div className="mb-4">
            <label htmlFor="category" className="block text-lg font-medium mb-2">Select Category:</label>
            <select
                id="category"
                value={selectedCategory}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
            >
                <option value="">-- Select Category --</option>
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
    onCategorySelect: PropTypes.func.isRequired, 
};

export default CategoriesSelection;