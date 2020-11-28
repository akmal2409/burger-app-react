import React from 'react';
import Styled from 'styled-components';
import burgerLogo from '../../assets/images/burger-logo.png';

const StyledLogo = Styled.div`
  height: 80%;
  padding: 5px;
  background-color: #00a8e8;
  border: 1px solid #001233;
  border-radius: 50%;
  text-align: center;
  opacity: 0.75;
  animation:spin 10s linear infinite;
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
  <StyledLogo>
    <img className="logo" src={burgerLogo} alt="MyBurger" />
  </StyledLogo>
);

export default logo;