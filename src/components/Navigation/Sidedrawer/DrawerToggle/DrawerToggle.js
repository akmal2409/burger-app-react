import React from "react";
import Styled from "styled-components";
import PropTypes from 'prop-types';

const StyledToggle = Styled.button`
  height: 100%;
  background: transparent;
  border: none;
  div {
    width: 2em;
    height: 0.25em;
    background-color: #14213d;
    margin: 5px 0;
  }

  @media (min-width: 500px) {
    display: none;
  }
`;

const drawerToggle = (props) => (
  <StyledToggle onClick={props.toggle}>
    <div></div>
    <div></div>
    <div></div>
  </StyledToggle>
);

drawerToggle.propTypes = {
  toggle: PropTypes.func
}
export default drawerToggle;
