import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";

function TrendsSection(){
    const{theme} = useContext(ThemeContext);
    return (
        <div  className={`p-4 mt-2 ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'} rounded-t-lg shadow-md`}>
            <h2 className="text-xl font-semibold mb-4">GitHub Trends</h2>
            <p>Explore the latest trends and popular repositories on GitHub:</p>
          
            <ul className="list-disc ml-5 mt-4">
                <li><a href="https://github.com/trending" target="_blank" rel="noopener noreferrer" className="text-blue-500">GitHub Trending Repositories</a></li>
                <li><a href="https://github.blog/" target="_blank" rel="noopener noreferrer" className="text-blue-500">GitHub Blog</a></li>
            </ul>
        </div>
    );
};



export default TrendsSection;

