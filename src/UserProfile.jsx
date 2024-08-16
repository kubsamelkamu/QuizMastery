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
                    <div className="mt-4">
                    <p><strong>Location:</strong> {user.location || 'Not available'}</p>
                    <p><strong>Repositories:</strong> {user.public_repos}</p>
                    <p><strong>Followers:</strong> {user.followers}</p>
                    <p><strong>Following:</strong> {user.following}</p>
                </div>
                <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-blue-500">
                    View GitHub Profile
                </a>
            </div>
        </div>

    )
}