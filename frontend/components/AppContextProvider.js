import { createContext } from "react";
import { useState } from 'react';


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [appData, setAppData] = useState({});
    const [searchedCourses, setSearchedCourses] = useState([]);
    
    return ( 
        <AppContext.Provider value={{
            appData, setAppData,
            searchedCourses, setSearchedCourses,
        }}>
            {children}
        </AppContext.Provider>
     );
}
 
export default AppContextProvider;
