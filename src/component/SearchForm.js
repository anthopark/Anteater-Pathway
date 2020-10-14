import React, { Component } from 'react';
import './css/SearchForm.css';
import styled from 'styled-components';
import Select from 'react-select';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        fontSize: '1.6rem',
        minHeight: '3.5rem',
        height: '3.5rem',
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '3.5rem',
        fontSize: '1.6rem',
        padding: '0 .6rem'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0',
        fontSize: '1.6rem',
    }),

    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '3.5rem',
        fontSize: '1.6rem',
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '1.6rem',
      }),
};

const Container = styled.div`
    padding: .5rem 1.5rem;

`;

class SearchForm extends Component {

    state = {
        deptItem: null,
        levelItem: null,
        numValue: '',
        isDeptValid: true,
    }


    onBtnClick = (e) => {
        e.preventDefault();
        console.log(e.target);
        this.setState({ isDeptValid: true });
        const { deptItem, levelItem, numValue } = this.state;

        if (!deptItem) return this.setState({ isDeptValid: false })

        this.props.onCourseSearch(
            deptItem.value,
            levelItem ? levelItem.value : undefined,
            numValue
        )
    }

    onDeptDropdownChange = (e) => {
        this.setState({ isDeptValid: true })
        console.log(e);
        this.setState({
            deptItem: e,
        })
    }

    onLevelDropdownChange = (e) => {
        console.log(e);
        this.setState({
            levelItem: e,
        })
    }

    onNumInputChange = (e) => {
        console.log(e.target.value);
        this.setState({
            numValue: e.target.value,
        })
    }

    render() {

        let errorMessage;
        if (!this.state.isDeptValid) {
            errorMessage = (
                <div className="error-message-box">
                    Please select a department
                </div>
            )
        }

        return (
            <Container>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-field">
                        <label className="search-form-label">Department</label>
                        <Select
                            id="dept-dropdown"
                            styles={customStyles}
                            isClearable={true}
                            options={this.props.deptOptions}
                            onChange={this.onDeptDropdownChange}
                        />
                        {errorMessage}
                    </div>
                    <div className="form-field">
                        <label className="search-form-label">Level</label>
                        <Select
                            id="level-dropdown"
                            styles={customStyles}
                            isClearable={true}
                            options={this.props.levelOptions}
                            onChange={this.onLevelDropdownChange}
                        />
                    </div>
                    <div className="form-field">
                        <label htmlFor="number-input" className="search-form-label">Course Number</label>
                        <input
                            className="form-input number-input"
                            id="number-input"
                            placeholder='3A, 39c, 121'
                            onChange={this.onNumInputChange}
                        />
                    </div>
                    <div className="form-field form-btn-field">
                        <a href="/" className="btn form-btn" onClick={this.onBtnClick}>Search</a>
                        <button className="btn form-btn" type="submit">Search</button>
                    </div>
                </form>
            </Container>
        );
    }
}

export default SearchForm;
