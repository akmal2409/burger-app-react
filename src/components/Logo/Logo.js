import React from "react";
import Styled from "styled-components";
import burgerLogo from "../../assets/images/burger-logo.png";

const StyledLogo = Styled.div`
  height: ${(props) => props.height}%;
  padding: 5px;
  background-color: white;
  // border: 1px solid #001233;
  border-radius: 10px;
  text-align: center;
  // animation:spin 10s linear infinite;
  .logo {
    margin-top: 7px;
    height: 70%;
    box-sizing: border-box;
  }
  @keyframes spin { 
    100% { 
      -webkit-transform: rotate(360deg); 
      transform:rotate(360deg); 
    } 
  }
`;

const logo = (props) => (
  <StyledLogo height={props.height} style={props.style}>
    <img className="logo" src={burgerLogo} alt="MyBurger" />
  </StyledLogo>
);

export default logo;
