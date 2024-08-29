import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import QuizQuestion from './components/QuizQuestion';
import Result from './Pages/Result';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <div className="min-h-screen flex flex-col">
                    <Header />
                    <main className="flex-grow container mx-auto p-4">
                    <Routes>
                        <Route 
                        path='/' element={<Home/>} />
                        <Route
                        path="/quiz"element={<QuizQuestion />}/>
                       <Route 
                       path="/result" element={<Result />} />/
                    </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default App;
