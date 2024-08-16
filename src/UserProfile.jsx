import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";
function Profile({user}){
    const{theme} =useContext(ThemeContext)

    if (!user) {
        return null;
    }

    return(
        <div className={`flex justify-center p-4`}>
            <div className={`max-w-md w-full p-6 rounded-lg shadow-md ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} mx-auto`}>
                
            </div>
        </div>
    )
}