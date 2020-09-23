import React from 'react';
import {
    Button,
    Form,
    Message,
} from 'semantic-ui-react'

import Select from 'react-select';

import './css/BrowseForm.css'


export default class BrowseForm extends React.Component {

    state = {
        deptOption: [],
        levelOptions: [],
        deptItem: null,
        levelItem: null,
        isDeptValid: true,
    };

    onFormSubmit = () => {
        this.setState({ isDeptValid: true });
        console.log('submit!')
        if (!this.state.deptItem) return this.setState({ isDeptValid: false });
        const { deptItem, levelItem } = this.state
        this.props.onBrowseSubmit(
            deptItem.value,
            levelItem ? levelItem.value : undefined
        )
    }

    onDeptDropdownChange = (e) => {
        this.setState({ isDeptValid: true });
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

    render() {

        return (
            <div className="browse-form-div">
                <Form className="browse-form" onSubmit={this.onFormSubmit}>
                    <Form.Group>
                        <Form.Field width={8}>
                            <label>Department</label>
                            <Select
                                isClearable={true}
                                options={this.props.deptOptions}
                                value={this.state.deptItem}
                                onChange={this.onDeptDropdownChange}
                            />
                        </Form.Field>
                        <Form.Field width={8}>
                            <label>Level</label>
                            <Select
                                isClearable={true}
                                options={this.props.levelOptions}
                                value={this.state.levelItem}
                                onChange={this.onLevelDropdownChange}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Button id="browse-submit-btn" fluid={true} type="submit">Browse!</Button>
                    <Message hidden={this.state.isDeptValid} color='red'>Please select department!</Message>
                </Form>
            </div >
        );
    }
}