import React from 'react';
import {
    Button,
    Dropdown,
    Form,
} from 'semantic-ui-react'

import './css/BrowseForm.css'


export default class BrowseForm extends React.Component {

    state = {
        deptOption: [],
        levelOptions: [],
        deptDropdownValue: null,
        levelDropdownValue: null,
    };

    componentDidMount() {
        // API calls to retrieve dropdown items for departments
    }

    onFormSubmit = () => {
        console.log('submit!')
        this.props.onBrowseSubmit(1,1)
    }

    onDeptDropdownChange = () => {

    }

    onLevelDropdownChange = () => {

    }

    render() {

        return (
            <div className="browse-form-div">
                <Form className="browse-form" onSubmit={this.onFormSubmit}>
                    <Form.Group>
                        <Form.Field width={8}>
                            <label>Department</label>
                            <Dropdown className="browse-dropdown"
                                placeholder='Select dept'
                                fluid
                                search
                                selection
                                options={this.props.deptOptions}
                            />
                        </Form.Field>
                        <Form.Field width={8}>
                            <label>Level</label>
                            <Dropdown className="browse-dropdown"
                                placeholder='Select level'
                                fluid
                                search
                                selection
                                options={this.props.levelOptions}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Field>
                        <Button id="browse-submit-btn" fluid={true} type="submit">Browse!</Button>
                    </Form.Field>
                </Form>
            </div >
        );
    }
}