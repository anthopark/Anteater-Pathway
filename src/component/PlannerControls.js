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
    margin: 0 1.5rem;
    display: flex;
`;

const MiniFormBox = styled.div`
    padding: 1rem 1.5rem;
    background-color: #fff;
    border: .2rem solid #116fbd;
    border-radius: 1rem;
`;

const generateSchoolYear = (startYear, endYear) => {
    return Array(endYear - startYear + 1).fill().map((_, idx) => {
        return {
            label: `${startYear + idx}/${startYear + idx + 1}`, value: `${startYear + idx}/${startYear + idx + 1}`
        }
    })
}

class PlannerControls extends Component {

    state = { years: [], selectedYear: null }

    componentDidMount() {
        this.setState({
            // generate school years from 15/16 - 30/31
            years: generateSchoolYear(15, 30)
        })
    }

    onYearSubmit = async (e) => {
        e.preventDefault();
    }

    onLoadSubmit = async (e) => {
        e.preventDefault();
    }

    onSaveSubmit = async (e) => {
        e.preventDefault();
    }

    render() {
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
                        position="bottom left"
                        offset={`[10, 10]`}
                    >
                        <Popup.Content>
                            <MiniFormBox>
                                <form id="year-form" onSubmit={this.onYearSubmit}>
                                    <div className="mini-form-field">
                                        <div className="mini-form-userinput">
                                            <Select
                                                styles={customStyles}
                                                options={this.state.years}
                                            />
                                        </div>
                                        <div className="mini-form-btn">
                                            <button class="btn mini-btn" type="submit">Add</button>
                                        </div>
                                    </div>
                                </form>
                            </MiniFormBox>
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
                        offset={`[10, 10]`}
                    >
                        <Popup.Content>
                            <MiniFormBox>
                                <form id="load-form" onSubmit={this.onLoadSubmit}>
                                    <div className="mini-form-field">
                                        <div className="mini-form-userinput">
                                            <input className="form-input mini-form-input" placeholder="Plan Name" />
                                        </div>
                                        <div className="mini-form-btn">
                                            <button class="btn mini-btn" type="submit">Load</button>
                                        </div>
                                    </div>
                                </form>
                            </MiniFormBox>
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
                        offset={`[10, 10]`}
                    >
                        <Popup.Content>
                            <MiniFormBox>
                                <form id="save-form" onSubmit={this.onSaveSubmit}>
                                    <div className="mini-form-field">
                                        <div className="mini-form-userinput">
                                            <input className="form-input mini-form-input" placeholder="Plan Name" />
                                        </div>
                                        <div className="mini-form-btn">
                                            <button class="btn mini-btn" type="submit">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </MiniFormBox>
                        </Popup.Content>
                    </Popup>

                </div>
            </Container>
        );
    }
}

export default PlannerControls;
