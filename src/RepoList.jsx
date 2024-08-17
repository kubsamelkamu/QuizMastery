import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";
function RepositoryList({repos}) {
    const theme = useContext(ThemeContext);

    if (!repos || repos.length === 0)  {
        return <p className={`text-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>No repositories found.</p>;
    }

    return(
        <div className="space-y-4 mt-4">

        </div>
    )
}