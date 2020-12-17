
import { useState, useEffect, useContext } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import SimpleBar from 'simplebar-react';
import { faRedo, faSearch, faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AppContext } from '@components/AppContextProvider';

import CourseItem from '@components/courseItem';

import {
    SearchResultContainer,
    ClearButtonBox,
    ClearButton,
    ResultListBox,
    ResultMessageBox,
    LoadingIconBox,
    ResultMessageText,
} from './styled';


const SearchResultList = ({ isLoading }) => {
    const { searchedCourses, setSearchedCourses } = useContext(AppContext);
    const { planData } = useContext(AppContext);

    let isSearchedPlannedCourse;
    let clearButton;
    let resultList;
    let searchResultMessage;

    const isAlreadyPlanned = (courseId) => {
        for (const yearPlanData of planData) {
            for (const courses of Object.values(yearPlanData)) {
                if (courses.some((course) => course._id === courseId)) {
                    return true;
                }
            }
        }

        return false;
    }

    if (isLoading) {
        searchResultMessage = (
            <LoadingIconBox>
                <FontAwesomeIcon icon={faSpinner} style={{ fontSize: '1.7rem', marginLeft: '7.5rem' }} spin />
            </LoadingIconBox>
        );
    } else if (!searchedCourses) {
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

        resultList = searchedCourses.map((course, index) => {
            if (!isAlreadyPlanned(course._id)) {
                return (
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
                                    courseInfo={course}
                                    searchList={true}
                                />
                            </div>
                        )}
                    </Draggable>
                )
            } else {
                isSearchedPlannedCourse = true;
                return false;
            }
        });

        // resultList as an array of all false values indicates that there were searched, but already planned
        if (resultList.every((val) => val === false)) {
            searchResultMessage = (
                <ResultMessageBox>
                    <FontAwesomeIcon icon={faExclamationCircle} style={{ fontSize: '1.7rem' }} />
                    <ResultMessageText>
                        Already planned
                    </ResultMessageText>
                </ResultMessageBox>
            );
        } else {
            clearButton = (
                <ClearButton onClick={() => setSearchedCourses(null)}>
                    <FontAwesomeIcon icon={faRedo} />
                </ClearButton>
            );    
        }
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