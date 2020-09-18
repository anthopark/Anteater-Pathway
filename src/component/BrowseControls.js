import React from 'react';
import { Dropdown, Grid, Segment } from 'semantic-ui-react';
import { Button, Icon } from 'semantic-ui-react';
import './css/BrowseControls.css'

const deptOptions = [
    { value: 'COMPSCI', text: 'COMPSCI' }
]

const levelOptions = [
    { value: 'Lower Division', text: 'Lower Division' },
    { value: 'Upper Division', text: 'Upper Division' },
    { value: 'Undergraduate', text: 'Undergraduate' },
    { value: 'Graduate', text: 'Graduate' },
    { value: 'Other', text: 'Other' },
]

export default class BrowseControls extends React.Component {
    render() {
        return (
            <div className='browse-controls'>
                <Grid columns='equal'>
                    <Grid.Column className='controls-col' width={10}>
                        <Dropdown className='browse-dropdown'
                            placeholder='Select Department'
                            fluid
                            search
                            selection
                            options={deptOptions}
                        />
                        <Dropdown className='browse-dropdown'
                            placeholder='Select Level'
                            fluid
                            search
                            selection
                            options={levelOptions}
                        />
                    </Grid.Column>
                    <Grid.Column className='controls-col' id="submit-btn-box">
                        <Button content='Submit' className="submit-btn" primary />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}