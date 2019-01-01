import React from "react";
import { Component } from "react";
// import {connect} from 'react-redux';
// import * as authAction from "../../../store/actions/auth";
import config from "../../shared/config";
// import env from "../../../environment";

class Logout extends Component {
  componentDidMount() {
    // this.props.onLogout();
    console.log("aaaaaaaaa");
    window.location = `https://login.intranet.bb.com.br/distAuth/UI/Logout?goto=${
      config.appUrl
    }`;
  }

  render() {
    return <div>Saindo...</div>;
  }
}

// const mapDispatchToProps = dispatch => {

//   return {
//     onLogout: () => dispatch(authAction.logout()),
//   }
// };

// export default connect(null, mapDispatchToProps)(Logout);
export default Logout;
