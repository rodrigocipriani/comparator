import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';
import * as appActions from './appActions';
import * as authActions from '../Auth/authActions';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  msg: {
    position: 'absolute',
    top: '80px',
    bottom: 'unset',
    right: '12px',
    left: 'unset'
  }
}
class Template extends Component {

  state = {
    open: true,
  };

  componentDidMount() {
    this.props.authCheckState();
  }

  handleClick = () => {
    this.setState({ open: false });
  }

  render() {
    const { children, errors, user, login, redirectToLogin, classes } = this.props;

    if (redirectToLogin) {
      return window.location = `https://login.intranet.bb.com.br/distAuth/UI/Login?goto=${window.location.href}`;
    }

    if (!user) {
      login();
      return <LinearProgress />;
    }

    return (
      <div>
        {errors.length > 0
          ? errors.map(({ id, error }) => (
            <Snackbar
              className={classes.msg}
              key={id}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              open={this.state.open}
              autoHideDuration={6000}
              ContentProps={{
                'aria-describedby': 'message-id'
              }}
              message={error.message || error.stack}
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleClick}
                >
                  <CloseIcon />
                </IconButton>
              ]}
            />
          ))
          : null}
        {children}
      </div>
    );
  }
}
Template.defaultProps = {};

Template.propTypes = {};

const mapStateToProps = ({ appReducer, authReducer }) => {
  return {
    errors: appReducer.errors,
    user: authReducer.user,
    redirectToLogin: authReducer.redirectToLogin,
  };
};

const mapActionsToProps = dispatch => {
  return {
    closeError: () => dispatch(appActions.closeError()),
    login: () => dispatch(authActions.login()),
    authCheckState: () => dispatch(authActions.authCheckState()),
  }
};

export default withRouter(withStyles(styles)(
  connect(mapStateToProps, mapActionsToProps)(Template)
));
