import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import classes from "./HomeComponent.module.css";
import ComparatorContainer from "../Comparator/ComparatorContainer";

class HomeComponent extends Component {
  render() {
    return (
      <Grid container>
        <Grid item className={classes.container}>
          <ComparatorContainer />
        </Grid>
      </Grid>
    );
  }
}

export default HomeComponent;
