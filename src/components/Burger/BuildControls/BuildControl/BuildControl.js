import React from "react";
import classes from './BuildControl.module.css';
import PropTypes from 'prop-types';

const buildControl = (props) => {
  // const Div = Styled.div`
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   margin: 5px 0;
  // `;

  // const Button = Styled.button`
  //   display: block;
  //   font: inherit;
  //   padding: 5px;
  //   margin: 0 5px;
  //   width: 80px;
  //   border: 1px solid #AA6817;
  //   cursor: pointer;
  //   outline: none;
  //   &:disabled {
  //     background-color: #AC9980;
  //     border: 1px solid #7E7365;
  //     color: #ccc;
  //     cursor: default;
  //   }
  //   &:hover:disabled {
  //     background-color: #AC9980;
  //     color: #ccc;
  //     cursor: not-allowed;
  //   }
  // `;

  // const Label = Styled.div`
  //   padding: 10px;
  //   font-weight: bold;
  //   width: 80px;
  // `;

  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button disabled={props.disabled} className={classes.Less} onClick={props.removed}>Less</button>
      <button className={classes.More} onClick={props.added}>More</button>
    </div>
  );
};


export default buildControl;
