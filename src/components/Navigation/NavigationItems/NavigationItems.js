import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import Styled from 'styled-components';

const StyledNavigationItems = Styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;

  @media (min-width: 500px) {
    & {
      flex-flow: row;
    }
  }
`;

const navigationItems = (props) => (
  <StyledNavigationItems>
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/">Checkout</NavigationItem>
  </StyledNavigationItems>
);

export default navigationItems;