import React, { Component } from 'react';
import './css/PlannerControls.css';
import styled from 'styled-components';
import { Popup } from 'semantic-ui-react';
import Select from 'react-select';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        fontSize: '1.6rem',
        minHeight: '3.5rem',
        height: '3.5rem',
        width: '12rem',
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '3.5rem',
        fontSize: '1.6rem',
        padding: '0 .6rem',
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
    margin: 0 1.5rem;

    display: flex;
    flex: 0 1 auto;
`;


const generateSchoolYear = (startYear, endYear) => {
    return Array(endYear - startYear + 1).fill().map((_, idx) => {
        return {
            label: `${startYear + idx}/${startYear + idx + 1}`, value: `${startYear + idx}/${startYear + idx + 1}`
        }
    })
}

class PlannerControls extends Component {

    state = {
        addYearOptions: [],
        addYearValue: null,
        isYearValueValid: true,
        loadInputValue: '',
        saveInputValue: '',
    }

    componentDidMount() {

        const defaultYear = '20/21'

        this.setState({
            addYearOptions: generateSchoolYear(15, 30),
        })

        // creating a default academic year
        this.props.createSchoolYear(defaultYear);
        let addYearOptions = generateSchoolYear(15, 30);
        this.setState({
            addYearOptions: addYearOptions.filter((options) => options.value != defaultYear)
        })
    }

    onYearSubmit = async (e) => {
        e.preventDefault();
        if (!this.state.addYearValue) {
            return this.setState({
                isYearValueValid: false,
            })
        }

        this.props.createSchoolYear(this.state.addYearValue.value);

        // removing selected year from the dropdown options
        let addYearOptions = this.state.addYearOptions;
        addYearOptions = addYearOptions.filter(option => option.value !== this.state.addYearValue.value)
        this.setState({
            addYearOptions: addYearOptions,
            addYearValue: null,
        })
    }

    onLoadSubmit = async (e) => {
        e.preventDefault();
    }

    onSaveSubmit = async (e) => {
        e.preventDefault();
    }

    onYearDropdownChange = (e) => {
        this.setState({
            addYearValue: e,
            isYearValueValid: true,
        })
    }

    onLoadInputChange = (e) => {
        this.setState({
            loadInputValue: e.target.value,
        })
    }

    onSaveInputChange = (e) => {
        this.setState({
            saveInputValue: e.target.value,
        })
    }

    onAddYearPopupClose = (e) => {
        this.setState({
            isYearValueValid: true,
        })
    }

    render() {
        let errorMessage;
        if (!this.state.isYearValueValid) {
            errorMessage = (
                <div className="error-message-box">
                    Please select an academic year
                </div>
            );
        }


        return (
            <Container>
                <div className="btn-box">
                    <Popup
                        trigger={
                            <button
                                className="ctrl-btn"
                                type="button">Add School Year</button>
                        }
                        on={['click']}
                        onClose={this.onAddYearPopupClose}
                        position="bottom left"
                        offset={[0, 10]}
                    >
                        <Popup.Content>
                            <div className="mini-form-box">
                                <form id="year-form" onSubmit={this.onYearSubmit}>
                                    <div className="mini-form-field">
                                        <div className="mini-form-userinput">
                                            <Select
                                                styles={customStyles}
                                                options={this.state.addYearOptions}
                                                onChange={this.onYearDropdownChange}
                                                value={this.state.addYearValue}
                                            />
                                        </div>
                                        <div className="mini-form-btn">
                                            <button className="btn mini-btn" type="submit">Add</button>
                                        </div>
                                    </div>
                                    {errorMessage}
                                </form>
                            </div>


                        </Popup.Content>
                    </Popup>
                </div>
                <div className="btn-box">
                    <Popup
                        trigger={
                            <button
                                className="ctrl-btn"
                                type="button">Load</button>
                        }
                        on={['click']}
                        position="bottom left"
                        offset={[0, 10]}
                    >
                        <Popup.Content>
                            <div className="mini-form-box">
                                <form id="load-form" onSubmit={this.onLoadSubmit}>
                                    <div className="mini-form-field">
                                        <div className="mini-form-userinput">
                                            <input
                                                className="form-input mini-form-input"
                                                placeholder="Plan Name"
                                                value={this.state.loadInputValue}
                                                onChange={this.onLoadInputChange}
                                            />
                                        </div>
                                        <div className="mini-form-btn">
                                            <button className="btn mini-btn" type="submit">Load</button>
                                        </div>
                                    </div>
                                </form>
                            </div>


                        </Popup.Content>
                    </Popup>
                </div>
                <div className="btn-box">
                    <Popup
                        trigger={
                            <button
                                className="ctrl-btn"
                                type="button">Save</button>
                        }
                        on={['click']}
                        position="bottom left"
                        offset={[0, 10]}
                    >
                        <Popup.Content>
                            <div className="mini-form-box">
                                <form id="save-form" onSubmit={this.onSaveSubmit}>
                                    <div className="mini-form-field">
                                        <div className="mini-form-userinput">
                                            <input
                                                className="form-input mini-form-input"
                                                placeholder="Plan Name"
                                                value={this.state.saveInputValue}
                                                onChange={this.onSaveInputChange}
                                            />
                                        </div>
                                        <div className="mini-form-btn">
                                            <button className="btn mini-btn" type="submit">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>


                        </Popup.Content>
                    </Popup>

                </div>
            </Container>
        );
    }
}

export default PlannerControls;
