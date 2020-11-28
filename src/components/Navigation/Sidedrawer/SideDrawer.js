import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Auxillary";

import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed} />
      <div
        className={[
          classes.SideDrawer,
          props.show ? classes.Open : classes.Close,
        ].join(' ')}
      >
        <Logo height="11" style={{ marginBottom: "15px" }} />
        <nav>
          <NavigationItems mobile />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
