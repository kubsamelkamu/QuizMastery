import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 

function Result() {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state || !state.questions || !state.userAnswers) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-600 text-white p-6">
                <p className="text-lg text-center">No result data found. Please retake the quiz.</p>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Go Home
                </button>
            </div>
        );
    }

    const { score, totalQuestions, questions, userAnswers } = state;
    const percentageScore = (score / totalQuestions) * 100; 
    const performanceMessage = score / totalQuestions > 0.7 ? 'Great job!' : 'Keep practicing!';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-600 text-white p-6">
          
            <motion.div 
                className="bg-white text-gray-900 rounded-lg shadow-lg p-8 max-w-lg w-full"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Quiz Result</h2>
                <p className="text-lg mb-6 text-center">Your Score: {score} / {totalQuestions}</p>
                <p className="text-lg mb-6 text-center font-semibold">{performanceMessage}</p>

                <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                        <motion.div 
                            className="bg-green-500 h-4 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentageScore}%` }}
                            transition={{ duration: 1.5, ease: 'easeInOut' }}
                        />
                    </div>
                    <p className="text-center font-semibold">{percentageScore.toFixed(2)}%</p>
                </div>

                <div className="mb-6">
                    {questions.map((question, index) => (
                        <div key={index} className="mb-4">
                            <p className="font-semibold">{index + 1}. {question.question}</p>
                            <p className={`mt-2 ${userAnswers[index] === question.correct_answer ? 'text-green-600' : 'text-red-600'}`}>
                                Your Answer: {userAnswers[index]}
                            </p>
                            {userAnswers[index] !== question.correct_answer && (
                                <p className="text-blue-600">Correct Answer: {question.correct_answer}</p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={() => navigate('/home')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Retake Quiz
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default Result;
