import { useLocation, useNavigate } from 'react-router-dom';

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
    const performanceMessage = score / totalQuestions > 0.7 ? 'Great job!' : 'Keep practicing!';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-600 text-white p-6">
            <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Quiz Result</h2>
                <p className="text-lg mb-6 text-center">Your Score: {score} / {totalQuestions}</p>
                <p className="text-lg mb-6 text-center font-semibold">{performanceMessage}</p>

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
                        onClick={() => navigate('/')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Retake Quiz
                    </button>
                  
                </div>
            </div>
        </div>
    );
}

export default Result;
