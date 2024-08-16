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
            <div className="flex items-center">
                    <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="w-24 h-24 rounded-full mr-4" />
                    <div>
                        <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
                        <p className="text-gray-600 dark:text-gray-300">@{user.login}</p>
                        {user.bio && <p className="mt-2">{user.bio}</p>}
                    </div>
            </div>
        </div>
        
    )
}