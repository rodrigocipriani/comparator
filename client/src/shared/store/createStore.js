import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import axios from "axios";
import reducers from "../../shared/reducers";
import config from "../../shared/config";
// import persistentStoreObject from "./persistentStoreMiddleware";

/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 */
const readyStatePromise = store => next => action => {
  // console.log(":::", action);
  if (!action.promise) {
    return next(action);
  }

  function makeAction(ready, data) {
    const newAction = Object.assign({}, action, { ready }, data);
    delete newAction.promise;
    return newAction;
  }

  next(makeAction(false));
  return action.promise.then(
    result => next(makeAction(true, { payload: result })),
    error => next(makeAction(true, { error }))
  );
};

export default (req, options = {}) => {
  /**
   * Receiving options
   */
  const {
    // isProduction,
    showLoggers
    // DBName,
    // couchDBUrlConnector
  } = options;

  /**
   * Logging redux
   * */
  let { loggerOptions } = options;
  if (showLoggers !== undefined) {
    loggerOptions = { ...loggerOptions, predicate: () => showLoggers };
  }
  const loggerMiddleware = createLogger(loggerOptions);

  /**
   * Axios config
   */
  let headers = {};
  if (req) {
    headers = {
      cookie: req ? req.get("cookie") || "" : ""
    };
  }
  const axiosInstance = axios.create({
    baseURL: `${config.publicUrl}/api`,
    headers,
    withCredentials: true
  });

  axiosInstance.interceptors.request.use(
    request => request,
    error => {
      error.message = "Fail on send data.";
      console.error(error.message, error, error.request);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      const response = error.response;
      error.message =
        response && response.data ? response.data.message : "Fail on get data.";
      console.error(error.message, error, error.response);
      return Promise.reject(error);
    }
  );

  /**
   * Store config
   */
  let initialState = {};
  // console.log("### initialState", initialState);
  // if (config.isClientSide) {
  //   initialState = window.INITIAL_STATE || {};
  // }
  const applyMiddlewares = applyMiddleware(
    readyStatePromise,
    loggerMiddleware,
    thunk.withExtraArgument(axiosInstance)
  );

  const createStoreWithMiddleware = compose(
    applyMiddlewares,
    // persistentStoreObject(DBName, initialState, couchDBUrlConnector)
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = createStoreWithMiddleware(reducers, initialState);

  return store;
};
