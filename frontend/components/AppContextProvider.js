import { createContext, useState } from 'react';

export const AppContext = createContext();

const generateYearOptions = (startYear, lastYear) => {
    return Array(lastYear - startYear + 1).fill().map((_, idx) => {
        return {
            label: `${startYear + idx} & ${startYear + idx + 1}`, value: `${startYear + idx}/${startYear + idx + 1}`
        }
    })
}

const AppContextProvider = ({ children }) => {
    const [planData, setPlanData] = useState([]);
    const [plannedCourses, setPlannedCourses] = useState({});
    const [searchedCourses, setSearchedCourses] = useState(null);
    const [yearOptions, setYearOptions] = useState(generateYearOptions(15, 30));
    
    
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
