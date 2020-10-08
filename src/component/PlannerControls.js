import React, { Component } from 'react';
import './css/PlannerControls.css';
import styled from 'styled-components';
import { Button, Popup } from 'semantic-ui-react';

const Container = styled.div`
    margin: 1rem 1.5rem;
    display: flex;
`;

const MiniFormBox = styled.div`
    width: 20rem;
    height: 10rem;
    padding: .5rem 1rem;
    background-color: #749c8f;
`;

class PlannerControls extends Component {
    render() {
        return (
            <Container>
                <div className="btn-box">
                    <Popup
                        trigger={
                            <button
                                className="btn ctrl-btn"
                                type="button">Add School Year</button>
                        }
                        on={['click']}
                        position="bottom left"
                        offset={`[10, 10]`}
                    >
                        <Popup.Content>
                            <MiniFormBox>
                            </MiniFormBox>
                        </Popup.Content>
                    </Popup>
                </div>
                <div className="btn-box">
                    <Popup
                        trigger={
                            <button
                                className="btn ctrl-btn"
                                type="button">Load</button>
                        }
                        on={['click']}
                        position="bottom left"
                        offset={`[10, 10]`}
                    >
                        <Popup.Content>
                            <MiniFormBox>
                            </MiniFormBox>
                        </Popup.Content>
                    </Popup>
                </div>
                <div className="btn-box">                    <Popup
                    trigger={
                        <button
                            className="btn ctrl-btn"
                            type="button">Save</button>
                    }
                    on={['click']}
                    position="bottom left"
                    offset={`[10, 10]`}
                >
                    <Popup.Content>
                        <MiniFormBox>
                        </MiniFormBox>
                    </Popup.Content>
                </Popup>

                </div>
            </Container>
        );
    }
}

export default PlannerControls;
