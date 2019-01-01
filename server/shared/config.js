/**
 * 
  "env": "development",
  "port": 4000,
  "corsOriginsAccept": [
    "http://localhost",
    "http://localhost.bb.com.br:4000",
    "http://localhost.bb.com.br:3000",
    "http://127.0.0.1",
    "http://localhost:8080",
    "http://127.0.0.1:8080"
  ],
  "publicFolder": "../client/build"

 */

const defaultConfig = {
  env: process.env.NODE_ENV,
  port: process.env.port,
  corsOriginsAccept: process.env.corsOriginsAccept,
  publicFolder: process.env.publicFolder
};

function requireConfigModule(path) {
  try {
    require.resolve(path);
    return require(path);
  } catch (e) {
    return {};
  }
}

const development = requireConfigModule("./.env/development") || {};
const local = requireConfigModule("./.env/local") || {};
const production = requireConfigModule("./.env/production") || {};
const test = requireConfigModule("./.env/test") || {};

const envTest = {
  isLocal: false,
  isDevelopment: false,
  isTest: false,
  isProduction: false
};

const environment = process.env.REACT_APP_ENV || (process.env.NODE_ENV || "");

let config = {};

switch (environment) {
  case "test":
    envTest.isTest = true;
    config = test;
    break;
  case "production":
    envTest.isProduction = true;
    config = production;
    break;
  case "development":
    envTest.isDevelopment = true;
    config = development;
    break;
  default:
    // case 'local':
    envTest.isLocal = true;
    config = local;
    break;
}

config.envTest = envTest;

module.exports = { ...defaultConfig, ...config };
