import { useContext ,useState} from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

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
            {message && <p className="mt-4 text-sm text-green-500">{message}</p>} 
        </div>
    );
};

function Footer(){
    const { theme } = useContext(ThemeContext);
    return (
        <footer className={`p-4 mt-8 ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'} rounded-t-lg`}>
            <div className="container mx-auto text-center">
                <FeedbackSection/>
                <p className="mb-2">&copy; {new Date().getFullYear()} QuizMastery. All rights reserved.</p>
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                    <div className="flex justify-center space-x-4">
                        <a href="https://github.com/kubsamelkamu" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-white" aria-label='GitHub'>
                            <FaGithub size={24} />
                        </a>
                        <a href="https://instagram.com/kubsa58" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-white" aria-label='Instagram'>
                            <FaInstagram size={24} />
                        </a>
                        <a href="https://linkedin.com/in/kubsa-melkamu-519bb5263" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-500 dark:hover:text-white" aria-label='LinkedIn'>
                            <FaLinkedin size={24} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;






