import {
    LeftSideBarContainer,
} from './styled';

import Logo from './Logo';
import CourseSearchForm from './CourseSearchForm';
import SearchResult from './SearchResult';
import AdditionalLinks from './AdditionalLinks';

export const LeftSideBar = () => {

    return (
        <LeftSideBarContainer>
            <Logo />
            <CourseSearchForm />
            <SearchResult />
            <AdditionalLinks />
        </LeftSideBarContainer>
    );
}
