import { useState } from 'react';

import {
    LeftSideBarContainer,
} from './styled';

import Logo from './Logo';
import CourseSearchForm from './CourseSearchForm';
import SearchResult from './SearchResult';
import AdditionalLinks from './AdditionalLinks';

export const LeftSideBar = () => {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <LeftSideBarContainer>
            <Logo />
            <CourseSearchForm setIsLoading={setIsLoading}/>
            <SearchResult isLoading={isLoading}/>
            <AdditionalLinks />
        </LeftSideBarContainer>
    );
}
