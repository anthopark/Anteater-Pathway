import React, { Component } from 'react'
import styled from 'styled-components';

import './css/Navigation.css';

const Container = styled.div`
  padding: 1rem 1rem;
  font-size: 2rem;

  display: flex;
  justify-content: space-between;
`;

export default class Navigation extends Component {
  render() {
    return (
      <Container>
        <div className="logo">
          Anteater Pathaway
        </div>

        <div className="about">
          About
        </div>
      </Container>
    )
  }
}
