import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '@components/AppContextProvider';

import CourseItem from '@components/courseItem';

import {
    SearchResultContainer,
    ClearButtonBox,
    ClearButton,
    ResultListContainer,
} from './styled';



const SearchResultList = () => {

    const { searchedCourses, setSearchedCourses } = useContext(AppContext);

    return (
        <SearchResultContainer>
            <ClearButtonBox>
                {searchedCourses.length !== 0 ?
                    (
                        <ClearButton onClick={() => setSearchedCourses([])}>
                            <FontAwesomeIcon icon={faRedo} />
                        </ClearButton>
                    ) : undefined
                }

            </ClearButtonBox>
            <ResultListContainer>
                {searchedCourses.map((course, index) => (
                    <CourseItem
                        key={index}
                        id={course._id}
                        dept={course.dept}
                        num={course.num}
                        unit={course.unit}
                    />
                ))}
            </ResultListContainer>


        </SearchResultContainer>
    );
}

export default SearchResultList;