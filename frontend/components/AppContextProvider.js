import { createContext, useState } from 'react';
import { setFocusHandler } from 'react-query';

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
    const [searchedCourses, setSearchedCourses] = useState(null);
    const [yearOptions, setYearOptions] = useState(generateYearOptions(15, 30));
    const [currentClickedCourse, setCurrentClickedCourse] = useState(null);
    const [customUnitCourses, setCustomUnitCourses] = useState({});
    
    return (
        <AppContext.Provider value={{
            planData, setPlanData,
            searchedCourses, setSearchedCourses,
            yearOptions, setYearOptions,
            currentClickedCourse, setCurrentClickedCourse,
            customUnitCourses, setCustomUnitCourses,
        }}>
            {children}
        </AppContext.Provider>
     );
}
 
export default AppContextProvider;
