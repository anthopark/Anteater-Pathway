import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';
import styled from 'styled-components';
import SearchForm from './SearchForm';

const Container = styled.div`
    width: 100%;

`;

const SearchFormBox = styled.div`

`;

const SearchResultBox = styled.div`

`;

class SidePanel extends Component {
    render() {
        return (
            <Container>
                <SearchFormBox>
                    <SearchForm />
                </SearchFormBox>

                <SearchResultBox>
                </SearchResultBox>
            </Container>
        );
    }
}

export default SidePanel;
