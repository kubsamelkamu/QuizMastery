import { useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import UserProfile from './UserProfile';
import Footer from './Footer';
import { ThemeProvider } from './ThemeContext';
import axios from 'axios';
import TrendsSection from './Features';
import { FeaturedReposSection } from './Features';

function App() {
    const [userData, setUserData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); 


    const handleSearch = async (username) => {
      
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            if (response.data) {
                setUserData(response.data);
                setErrorMessage(''); 
            } else {
                setUserData(null);
                setErrorMessage('No users found');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUserData(null);
            setErrorMessage('No users found'); 
        }
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto p-4">
                    <div className="container mx-auto p-4">
                        <SearchBar onSearch={handleSearch} />
                        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
                        {!userData && <TrendsSection />  } 
                        {!userData && <FeaturedReposSection/>}
                        {userData && <UserProfile user={userData} />}
                    </div>
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
