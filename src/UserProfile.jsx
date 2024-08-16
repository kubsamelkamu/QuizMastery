import { ThemeContext } from "./ThemeContext";
import { useContext } from "react";
function Profile({user}){
    const{theme} =useContext(ThemeContext)

    if (!user) {
        return null;
    }
}