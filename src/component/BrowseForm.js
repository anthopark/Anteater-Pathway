import React from 'react';
import {
    Button,
    Dropdown,
    Form,
    Grid,
} from 'semantic-ui-react'

import './css/BrowseForm.css'

const deptOptions = [
    { key: 'COMPSCI', text: 'COMPSCI', value: 'COMPSCI' },
    { key: 'IN4MATX', text: 'IN4MATX', value: 'IN4MATX' }
]

const levelOptions = [
    { key: 'Lower Division', text: 'Lower Division', value: 'Lower Division' },
    { key: 'Upper Division', text: 'Upper Division', value: 'Upper Division' },
    { key: 'Undergraduate', text: 'Undergraduate', value: 'Undergraduate' },
    { key: 'Graduate', text: 'Graduate', value: 'Graduate' },
]

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
                                options={deptOptions}
                            />
                        </Form.Field>
                        <Form.Field width={8}>
                            <label>Level</label>
                            <Dropdown className="browse-dropdown"
                                placeholder='Select level'
                                fluid
                                search
                                selection
                                options={levelOptions}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Button fluid={true} type="submit">Browse!</Button>
                </Form>
            </div >
        );
    }
}