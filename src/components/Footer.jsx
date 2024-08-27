import { useContext ,useState} from 'react';
import { ThemeContext } from './context/ThemeContext';
//import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const  FeedbackSection = () => {
    const { theme } = useContext(ThemeContext);
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (feedback.trim() === '') {
            setMessage('Please provide your feedback before submitting.');
            return;
        }
        
        setMessage('Thank you for your feedback!');
        setFeedback(''); 
    };

    return (
        <div className={`p-4 mt-8 ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'} rounded-t-lg`}>
            <h2 className="text-xl font-semibold mb-4">We Value Your Feedback</h2>
            <p>Tell us what you think about the application. Your feedback helps us improve!</p>
            <form className={`mt-4 ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`} onSubmit={handleSubmit}>
                <textarea
                    rows="4"
                    placeholder="Your feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className={`w-full p-2 border rounded-md ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`}
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">Submit Feedback</button>
            </form>
            {message && <p className="mt-4 text-sm text-green-500">{message}</p>} {/* Display feedback message */}
        </div>
    );
};





