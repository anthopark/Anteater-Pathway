import React from 'react';
import {
    Button,
    Form,
    Input,
    Message
} from 'semantic-ui-react';
import Select from 'react-select';
import './css/SearchForm.css'

export default class SearchForm extends React.Component {

    state = {
        deptItem: null,
        numValue: '',
        isDeptValid: true,
    }

    onFormSubmit = () => {
        console.log('submit!')
        this.setState({ isDeptValid: true })
        const { deptItem, numValue } = this.state

        if (!deptItem) return this.setState({ isDeptValid: false })

        this.props.onSearchSubmit(
            deptItem.value,
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

    onNumInputChange = (e) => {
        console.log(e.target.value);
        this.setState({
            numValue: e.target.value,
        })
    }

    render() {
        return (
            <div className="search-form-div">
                <Form className="search-form" onSubmit={this.onFormSubmit}>
                    <Form.Group>
                        <Form.Field width={10}>
                            <label>Department</label>
                            <Select
                                isClearable={true}
                                options={this.props.deptOptions}
                                value={this.state.deptItem}
                                onChange={this.onDeptDropdownChange}
                            />
                        </Form.Field>
                        <Form.Field width={6}>
                            <label>Number</label>
                            <Input
                                placeholder='3A, 39c, 121'
                                value={this.state.numValue}
                                onChange={this.onNumInputChange}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Button id="search-submit-btn" fluid={true} type="submit">Search!</Button>
                    <Message hidden={this.state.isDeptValid} color='red'>Please select department!</Message>
                </Form>
            </div>
        );
    }
}