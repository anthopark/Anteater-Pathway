import { faRedo, faSearch, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '@components/AppContextProvider';

import CourseItem from '@components/courseItem';

import {
    SearchResultContainer,
    ClearButtonBox,
    ClearButton,
    ResultListBox,
    ResultMessageBox,
    ResultMessageText,
} from './styled';


const SearchResultList = () => {

    const { searchedCourses, setSearchedCourses } = useContext(AppContext);

    let clearButton;
    let resultList;
    let searchResultMessage;

    if (!searchedCourses) {
        // haven't searched
        searchResultMessage = (
            <ResultMessageBox>
                <FontAwesomeIcon icon={faSearch} style={{fontSize: '1.7rem'}} />
                <ResultMessageText>
                    Find your courses
                </ResultMessageText>
            </ResultMessageBox>
        );
    } else if (Array.isArray(searchedCourses) && searchedCourses.length === 0) {
        // no found courses
        searchResultMessage = (
            <ResultMessageBox>
                <FontAwesomeIcon icon={faExclamationCircle} style={{fontSize: '1.7rem'}} />
                <ResultMessageText>
                    No courses found
                </ResultMessageText>
            </ResultMessageBox>
        );
    } else if (Array.isArray(searchedCourses) && searchedCourses.length !== 0) {
        // courses found
        clearButton = (
            <ClearButton onClick={() => setSearchedCourses(null)}>
                <FontAwesomeIcon icon={faRedo} />
            </ClearButton>
        );

        resultList = searchedCourses.map((course, index) => (
            <CourseItem
                key={index}
                id={course._id}
                dept={course.dept}
                num={course.num}
                unit={course.unit}
                searchList={true}
            />
        ));
    }

    return (
        <SearchResultContainer>
            <ClearButtonBox>
                { clearButton }
            </ClearButtonBox>
            
            { searchResultMessage }
            
            <ResultListBox>
                { resultList }
            </ResultListBox>
        </SearchResultContainer>
    );
}

export default SearchResultList;