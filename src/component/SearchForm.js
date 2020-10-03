import React, { Component } from 'react';
import './css/SearchForm.css';
import styled from 'styled-components';
import Select from 'react-select';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '35spx',
        height: '35spx',
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '35spx',
        padding: '0 6px'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '35spx',
    }),
};


const dummyDept = [
    { label: 'COMPSCI', value: 'COMPSCI' },
    { label: 'IN4MATX', value: 'IN4MATX' },
    { label: 'STATS', value: 'STATS' },
]







const Container = styled.div`
    padding: 0 10px;

`;

class SearchForm extends Component {


    onFormSubmit = (e) => {

    }


    render() {


        return (
            <Container>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-field">
                        <label className="search-form-label">Department</label>
                        <Select
                            id="dept-dropdown"
                            styles={customStyles}
                            isClearable={true}
                            options={dummyDept}
                        />
                    </div>
                    <div className="form-field">
                        <label className="search-form-label">Level</label>
                        <Select
                            id="dept-dropdown"
                            styles={customStyles}
                            isClearable={true}
                            options={dummyDept}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="number-input" className="search-form-label">Course Number</label>
                        <input
                            className="form-input number-input"
                            id="number-input"
                        />
                    </div>
                    <div className="form-field">
                    </div>




                </form>
            </Container>
        );
    }
}

export default SearchForm;
