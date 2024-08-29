import { useState,useContext } from 'react';
import CategoriesSelection from '../components/categoriesSelection';
import DifficultySelection from '../components/DifficulttSelection';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function Home() {
    const { theme } = useContext(ThemeContext);
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const navigate = useNavigate();

    const handleStartQuiz = () => {
        if (category && difficulty) {
            navigate('/quiz', { state: { category, difficulty } });
        } else {
            alert('Please select both category and difficulty!');
        }
    };

    return (
        <div 
            className={`flex flex-col items-center justify-center min-h-screen ${
                theme === 'light' 
                    ? 'bg-gradient-to-r from-blue-400 to-blue-600 text-white' 
                    : 'bg-gradient-to-r from-gray-700 to-gray-900 text-gray-200'
            }`}
        >
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold mb-4">Welcome to QuizMastery!</h1>
                <p className="text-lg mb-6">Select your preferred category and difficulty level, then start the quiz to test your knowledge!</p>
            </div>

            <div className=" max-w-md bg-white text-black p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Get Started</h2>
                <CategoriesSelection onCategorySelect={setCategory} />
                <DifficultySelection onDifficultySelect={setDifficulty} />
                <button
                    onClick={handleStartQuiz}
                    className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Start Quiz
                </button>
            </div>
        </div>
    );
}

export default Home;
