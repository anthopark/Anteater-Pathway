import { createContext, useState } from 'react';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [planData, setPlanData] = useState([]);
    const [plannedCourses, setPlannedCourses] = useState([]);
    const [searchedCourses, setSearchedCourses] = useState(null);
    const [yearOptions, setYearOptions] = useState(null);
    
    
    return (
        <AppContext.Provider value={{
            planData, setPlanData,
            plannedCourses, setPlannedCourses,
            searchedCourses, setSearchedCourses,
            yearOptions, setYearOptions,
        }}>
            {children}
        </AppContext.Provider>
     );
}
 
export default AppContextProvider;
