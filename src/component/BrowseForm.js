import React from 'react';
import {
    Button,
    Dropdown,
    Form,
    Grid,
    Input,
    Radio,
    Select,
    TextArea,
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

    render() {
        return (
            <div className="browse-form-div">
                <Form className="browse-form">
                    <Grid columns='equal'>
                        <Grid.Column width={10}>
                            <Dropdown className="browse-dropdown"
                                placeholder='Select Department'
                                fluid
                                search
                                selection
                                options={deptOptions}
                            />
                            <Dropdown className="browse-dropdown"
                                placeholder='Select Level'
                                fluid
                                search
                                selection
                                options={levelOptions}
                            />
                        </Grid.Column>

                        <Grid.Column id="submit-btn-box">
                            <Form.Field control={Button} id="submit-btn">Browse!</Form.Field>
                        </Grid.Column>
                    </Grid>
                </Form>
            </div>
        );
    }
}