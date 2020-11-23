import { createContext } from "react";
import { useState } from 'react';


export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [appData, setAppData] = useState({});
    const [searchedCourses, setSearchedCourses] = useState(null);
    const [yearOptions, setYearOptions] = useState(null);
    
    return ( 
        <AppContext.Provider value={{
            appData, setAppData,
            searchedCourses, setSearchedCourses,
            yearOptions, setYearOptions,
        }}>
            {children}
        </AppContext.Provider>
     );
}
 
export default AppContextProvider;
