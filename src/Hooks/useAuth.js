import { useContext } from "react"; // import the useContext hook
import { AuthContext } from "../context/AuthContext"; // import the AuthContext

// create a custom hook called useAuth
// this hook will return the value of the AuthContext using the useContext hook from react
// this hook will make it easier to access the AuthContext in other components

export const useAuth = () => {
    return useContext(AuthContext);
}