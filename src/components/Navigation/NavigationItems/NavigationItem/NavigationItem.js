import React from "react";
import Styled from "styled-components";

const StyledNavigationItem = Styled.li`
  margin: 10px 0;
  box-sizing: border-box;
  display: block;
  width: 100%;
  a {
    color: #ffba08;
    text-decoration: none;
    width: 100%;
    box-sizing: border-box;
    display: block;
    font-weight: bold;
  }

  a:hover,
  a:active,
  a.active {
    color: #5390d9;
  }

  @media (min-width: 500px) {
    margin: 0;
    display: flex;
    height: 100%;
    width: auto;
    align-items: center;
    a {
      color: white;
      height: 100%;
      padding: 16px 10px;
      border-bottom: 4px solid transparent;
    }

    a:hover,
    a:active,
    a.active {
      background-color: #f5af19;
      border-bottom: 4px solid #40A4C8;
      color: black;
    }
  }
`;

const navigationItem = (props) => (
  <StyledNavigationItem>
    <a href={props.link} className={props.active ? "active" : null}>
      {props.children}
    </a>
  </StyledNavigationItem>
);

export default navigationItem;
