import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import createStore from "../../shared/store/createStore";
import routes from "../../shared/routes";
import Template from "./Template";
import config from '../../config/config';
// import createBrowserHistory from 'history/createBrowserHistory'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import './App.css'

const store = createStore(null, {
  showLoggers: false,
  // DBName: "diary",
  // couchDBUrlConnector:
  //   // "https://rodrigocipriani:LQP1wqj9PQ@couchdb.cloudno.de/rodrigocipriani"
  //   "http://rodrigocipriani.com.br:5984/diary"
});

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: blue,
  },
  status: {
    danger: 'yellow',
  },
  // https://material-ui.com/style/typography/#migration-to-typography-v2
  typography: {
    useNextVariants: true,
  },
});

/**
 * This is necessary to fix CSS priority (not to use !important)
 */
const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.head.firstChild,
});

const App = () => (
  <JssProvider jss={jss} generateClassName={generateClassName} >
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        {/*<Router basename={config.basename} history={piwik.connectToHistory(createBrowserHistory())}>*/}
        <BrowserRouter basename={config.basename}>
          {/* <Router basename={config.basename} history={createBrowserHistory()}> */}
          <Template>
            <Route
              exact
              path={routes.HOME.path}
              component={routes.HOME.component}
            />
            <Route
              exact
              path={routes.LOGOUT.path}
              component={routes.LOGOUT.component}
            />
          </Template>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  </JssProvider>
);

export default App;
