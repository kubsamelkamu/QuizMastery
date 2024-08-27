
import Header from './components/Header';

import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  

  
    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto p-4">
                    <div className="container mx-auto p-4">
                      
                        
                       
                    </div>
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
