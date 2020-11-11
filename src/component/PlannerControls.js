import React, { Component } from 'react';
import './css/PlannerControls.css';
import styled from 'styled-components';
import { Popup } from 'semantic-ui-react';
import Select from 'react-select';
import courseApi from '../api/course-api';

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

const savePlanData = async (userId, planData) => {
    let response;
    try {
        response = await courseApi.post('/plan/save', {
            userId,
            degreePlan: planData,
        });
    } catch (e) {
        console.log(e.toString());
    }

    return response;
}





class PlannerControls extends Component {

    state = {
        addYearValue: null,
        isYearValueValid: true,
        isSaveInputValueValid: true,
        isLoadInputValueValid: true,
        loadInputValue: '',
        saveInputValue: '',
        isSaved: false,
        isSavedError: false,
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
        this.setState({
            addYearValue: null,
        })
    }

    onLoadSubmit = async (e) => {
        e.preventDefault();
    }

    onSaveSubmit = async (e) => {
        e.preventDefault();

        this.setState({
            isSaved: false,
            isSavedError: false,
            isSaveInputValueValid: true,
        })

        if (!this.state.saveInputValue ||
            this.state.saveInputValue.length > 20 ||
            this.state.saveInputValue.length < 4)
            return this.setState({
                isSaveInputValueValid: false,
            });


        const response = await savePlanData(this.state.saveInputValue, this.props.appData.planData);

        console.log(response);

        if (response) {
            this.setState({
                isSaved: true
            })
        } else {
            this.setState({
                isSavedError: true
            })
        }

        console.log(response);

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
            addYearValue: null,
        })
    }

    onLoadPopupClose = (e) => {
        this.setState({
            loadInputValue: '',
        })
    }

    onSavePopupClose = (e) => {
        this.setState({
            saveInputValue: '',
            isSaved: false,
            isSavedError: false,
            isSaveInputValueValid: true,
        })
    }

    render() {
        let errorMessage;
        if (!this.state.isYearValueValid) {
            errorMessage = (
                <div className="mini-form-error-message">
                    Please select an academic year
                </div>
            );
        }

        let saveMessage;
        if (this.state.isSaved) {
            saveMessage = (
                <div className="mini-form-success-message">
                    Successfully Saved!
                </div>
            );
        } else if (this.state.isSavedError) {
            saveMessage = (
                <div className="mini-form-failed-message">
                    Something went wrong!
                </div>
            );
        } else if (!this.state.isSaveInputValueValid) {
            saveMessage = (
                <div className="mini-form-failed-message">
                    Input 4~20 characters!
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
                                                options={this.props.yearDropDownOptions}
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
                        onClose={this.onLoadPopupClose}
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
                        onClose={this.onSavePopupClose}
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
                                    {saveMessage}
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
