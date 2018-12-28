const defaultConfig = require("./ambiente/default");
const development = require("./ambiente/development");
const local = require("./ambiente/local");
const production = require("./ambiente/production");
const test = require("./ambiente/test");

const env = {
  isLocal: false,
  isDevelopment: false,
  isTest: false,
  isProduction: false
};

const ambiente = process.env.REACT_APP_ENV || (process.env.NODE_ENV || "");

let retorno = {};

switch (ambiente) {
  case "test":
    env.isTest = true;
    retorno = test;
    break;
  case "production":
    env.isProduction = true;
    retorno = production;
    break;
  case "development":
    env.isDevelopment = true;
    retorno = development;
    break;
  default:
    // case 'local':
    env.isLocal = true;
    retorno = local;
    break;
}

retorno.env = env;

export default { ...defaultConfig, ...retorno };
