import {
    ResultListContainer,
    ClearButtonBox,
    ClearButton
} from './styled';

import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '@components/AppContextProvider';

const SearchResultList = () => {
    const [isSearched, setIsSearched] = useState(false);

    const { searchedCourses, setSearchedCourses } = useContext(AppContext);

    useEffect(() => {
        if (searchedCourses.length !== 0) {
            setIsSearched(true);
        } else {
            setIsSearched(false);
        }
        console.log(searchedCourses);
    })


    return (
        <ResultListContainer>
            <ClearButtonBox>
                {isSearched ?
                    (
                        <ClearButton onClick={() => setSearchedCourses([])}>
                            <FontAwesomeIcon icon={faRedo} />
                        </ClearButton>
                    ) : undefined
                }
            </ClearButtonBox>
        </ResultListContainer>
    );
}

export default SearchResultList;