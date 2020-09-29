import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';

const Container = styled.div`
    width: 100%;
    display: flex;
`;

const ControlBox = styled.div`
    margin-left: auto;
`;

class PlannerControl extends Component {
    render() {
        return (
            <Container>
                <ControlBox>
                    <Button
                        color='teal'
                        icon
                        labelPosition='left'
                        size='mini'
                    >
                        <Icon name='cloud download' />
                        Load
                    </Button>
                    <Button
                        color='teal'
                        icon
                        labelPosition='left'
                        size='mini'
                    >
                        <Icon name='save' />
                        Save
                    </Button>
                    <Button
                        color='yellow'
                        icon
                        labelPosition='left'
                        size='mini'
                    >
                        <Icon name='add' />
                        Add School Year
                    </Button>
                </ControlBox>

            </Container>
        );
    }
}

export default PlannerControl;
