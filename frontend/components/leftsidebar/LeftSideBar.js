import {
    LeftSideBarContainer,
} from './styled';

import Logo from './Logo';
import CourseSearchForm from './CourseSearchForm';
import SearchResultList from './SearchResultList';
import AdditionalLinks from './AdditionalLinks';

export const LeftSideBar = () => {
    return (

        <LeftSideBarContainer>
            <Logo />
            <CourseSearchForm />
            <SearchResultList />
            <AdditionalLinks />
        </LeftSideBarContainer>

    );
}
