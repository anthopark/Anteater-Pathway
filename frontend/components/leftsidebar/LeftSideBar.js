import {
    LeftSideBarContainer,
} from './styled';

import CourseSearchForm from './CourseSearchForm';
import SearchResultList from './SearchResultList';

export const LeftSideBar = () => {
    return (

        <LeftSideBarContainer>
            <CourseSearchForm />
            <SearchResultList />
        </LeftSideBarContainer>

    );
}
