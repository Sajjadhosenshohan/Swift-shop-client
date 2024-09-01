import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

export const ContextProvider = createContext(null);

const Context = ({ children }) => {

    const dispatch = useDispatch()

    // get userDetails
    const userDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/user-details`, {
                method: "GET",
                credentials: "include"
            });

            const dataApi = await response.json()

            if (dataApi.success) {
                dispatch(setUserDetails(dataApi.data))
            }

        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    }

    useEffect(() => {
        userDetails()
    }, [])




    const info = {
        userDetails
    }
    return (
        <ContextProvider.Provider value={info}>
            {children}
        </ContextProvider.Provider>
    );
}

export default Context;