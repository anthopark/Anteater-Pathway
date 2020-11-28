
import { useState, useEffect, useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { faRedo, faSearch, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                <FontAwesomeIcon icon={faSearch} style={{ fontSize: '1.7rem' }} />
                <ResultMessageText>
                    Find your courses
                </ResultMessageText>
            </ResultMessageBox>
        );
    } else if (Array.isArray(searchedCourses) && searchedCourses.length === 0) {
        // no found courses
        searchResultMessage = (
            <ResultMessageBox>
                <FontAwesomeIcon icon={faExclamationCircle} style={{ fontSize: '1.7rem' }} />
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
            <Draggable
                key={course._id}
                draggableId={course._id}
                index={index}
            >
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                    >
                        <CourseItem
                            key={index}
                            id={course._id}
                            dept={course.dept}
                            num={course.num}
                            unit={course.unit}
                            searchList={true}
                        />
                    </div>

                )}

            </Draggable>

        ));
    }

    return (
        <SearchResultContainer>
            <ClearButtonBox>
                {clearButton}
            </ClearButtonBox>

            {searchResultMessage}

            <Droppable droppableId="search-result">
                {(provided) => (
                    <ResultListBox
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {resultList}
                        {provided.placeholder}
                    </ResultListBox>
                )}
            </Droppable>
        </SearchResultContainer>
    );
}

export default SearchResultList;