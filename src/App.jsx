import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import QuizQuestion from './components/QuizQuestion';
import Result from './Pages/Result';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/Auth';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/" />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

function App() {
    
    return (
        <ThemeProvider>
          <AuthProvider>
            <Router>
                  <div className="min-h-screen flex flex-col">
                      <Header />
                      <main className="flex-grow container mx-auto p-4">
                      <Routes>
                          <Route path='/' element={<Register/>} />
                          <Route path='/login' element={<Login/>} />
                          <Route 
                            path='/home'
                            element ={
                              <PrivateRoute>
                                <Home/>
                              </PrivateRoute>
                            }/>
                          <Route 
                           path='/quiz'
                           element = {
                            <PrivateRoute>
                              <QuizQuestion/>
                            </PrivateRoute>
                           }/>
                           <Route 
                           path='/result'
                           element = {
                            <privateRoute>
                                <Result/>
                            </privateRoute>
                           }/>
                      </Routes>
                      </main>
                      <Footer />
                  </div>
              </Router>
          </AuthProvider>
         
        </ThemeProvider>
    );
}

export default App;




