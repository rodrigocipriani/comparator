import React, { Component } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as comparatorActions from "./comparatorActions";
import classes from './ComparatorContainer.module.css';
import { Paper, LinearProgress } from "@material-ui/core";
import ComparatorComponent from "./ComparatorComponent";

class ComparatorContainer extends Component {
  componentDidMount() {
    this.handleOnSend("");
  }

  handleOnSend = messageText => {
    this.props.loadItems(messageText, this.props.context, this.props.user);
  };

  render() {
    const { user, items } = this.props;

    if (!user) {
      return <LinearProgress />;
    }

    return (
      <Paper
        className={classes.ComparatorContainer}
      >
        <ComparatorComponent items={items} />
      </Paper>
    );
  }
}

ComparatorContainer.defaultProps = {
};

ComparatorContainer.propTypes = {
};

const mapStateToProps = ({ comparatorReducer, authReducer }) => {
  return {
    items: comparatorReducer.items,
    user: authReducer.user,
  };
};

const mapActionsToProps = dispatch => {
  return {
    loadItems: () => dispatch(comparatorActions.loadItems())
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ComparatorContainer);
