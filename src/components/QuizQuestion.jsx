import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

function QuizQuestion(){
    const { state } = useLocation(); 
    const { category, difficulty } = state;
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!category || !difficulty) {
            navigate('/');
            return;
        }

        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`);
                setQuestions(response.data.results);
            } catch (error) {
                console.error('Error fetching quiz questions:', error);
                setError('Failed to fetch quiz questions. You will be redirected to the home page.',error);
                setTimeout(() => {
                    navigate('/', { state: { errorMessage: 'Failed to fetch quiz questions. Please try again.' } });
                }, 2000); 
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [category, difficulty, navigate]);

    const handleAnswerSelect = (answer) => {
        setSelectedAnswer(answer);
        const correctAnswer = questions[currentQuestionIndex].correct_answer;
        if (answer === correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            navigate('/result', { state: { score, totalQuestions: questions.length } });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader color="#4A90E2" size={80} />
            </div>
        );
    }
    if (error) return <div className="text-center text-red-500">{error}</div>;

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6">
            <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                <p className="text-lg mb-6 text-center">{currentQuestion.question}</p>
                <div className="grid grid-cols-1 gap-4">
                    {[...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
                        .sort()
                        .map((answer, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(answer)}
                                disabled={selectedAnswer !== null}
                                className={`py-3 px-6 rounded-md transition-colors duration-300 ${
                                    selectedAnswer === answer
                                        ? answer === currentQuestion.correct_answer
                                            ? 'bg-green-500 text-white'
                                            : 'bg-red-500 text-white'
                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                            >
                                {answer}
                            </button>
                        ))}
                </div>
                <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswer === null}
                    className={`mt-6 w-full py-3 px-6 rounded-md text-white font-semibold transition-colors duration-300 ${
                        selectedAnswer === null ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
                    }`} 
                >
                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
                </button> 
            </div>
        </div>
    );
};

export default QuizQuestion;
