import React from 'react';
import {
    Button,
    Dropdown,
    Form,
    Input,
    Grid,
} from 'semantic-ui-react';
import './css/SearchForm.css'

const deptOptions = [
    { key: 'COMPSCI', text: 'COMPSCI', value: 'COMPSCI' },
    { key: 'IN4MATX', text: 'IN4MATX', value: 'IN4MATX' }
]

export default class SearchForm extends React.Component {


    onFormSubmit() {
        console.log('submit!')
    }

    render() {
        return (
            <div className="search-form-div">
                <Form className="search-form" onSubmit={this.onFormSubmit}>
                    <Form.Group>
                        <Form.Field width={10}>
                            <label>Department</label>
                            <Dropdown className="search-dropdown"
                                placeholder='Select dept'
                                fluid
                                search
                                selection
                                options={deptOptions}
                            />
                        </Form.Field>
                        <Form.Field  width={6}>
                            <label>Course Number</label>
                            <Input
                                className="search-input"
                                placeholder='3A, 39c, 121'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Button fluid={true} type="submit">Search!</Button>
                </Form>
            </div>
        );
    }
}