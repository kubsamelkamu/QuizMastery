import PropTypes from 'prop-types';

function DifficultySelection({ onDifficultySelect }) {
    const difficulties = ['easy', 'medium', 'hard']; 

    const handleDifficultyChange = (event) => {
        onDifficultySelect(event.target.value); 
    };

    return (
        <div className="mt-4">
            <label htmlFor="difficulty" className="block mb-2 text-lg font-semibold">Select Difficulty</label>
            <select
                id="difficulty"
                onChange={handleDifficultyChange}
                className="p-2 border border-gray-300 rounded-md"
            >
                <option value="">Choose difficulty</option>
                {difficulties.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}


DifficultySelection.propTypes = {
    onDifficultySelect: PropTypes.func.isRequired, 
};

export default DifficultySelection;
