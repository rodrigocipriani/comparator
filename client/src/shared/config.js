const defaultConfig = {
  basename: "/",
  appUrl: "http://localhost:3000/",
  apiUrl: "http://localhost:4000/",
  userApiUrl: "http://localhost:4001/"
};

function requireConfigModule(path) {
  try {
    require.resolve(`${path}`);
    return require(`${path}`);
  } catch (e) {
    return {};
  }
}

const development = requireConfigModule("./.env/development") || {};
const local = requireConfigModule("./.env/local") || {};
const production = requireConfigModule("./.env/production") || {};
const test = requireConfigModule("./.env/test") || {};

const env = {
  isLocal: false,
  isDevelopment: false,
  isTest: false,
  isProduction: false
};

const environment = process.env.REACT_APP_ENV || (process.env.NODE_ENV || "");

let config = {};

switch (environment) {
  case "test":
    env.isTest = true;
    config = test;
    break;
  case "production":
    env.isProduction = true;
    config = production;
    break;
  case "development":
    env.isDevelopment = true;
    config = development;
    break;
  default:
    // case 'local':
    env.isLocal = true;
    config = local;
    break;
}

config.env = env;

export default { ...defaultConfig, ...config };
