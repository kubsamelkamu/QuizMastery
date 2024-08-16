import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";
function Profile({user}){
    const{theme} =useContext(ThemeContext)

    if (!user) {
        return null;
    }

    return(
        <div className={`flex justify-center p-4`}>

        </div>
    )
}