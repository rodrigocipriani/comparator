"use strict";

if (process.env.NODE_ENV === "production") {
  module.exports = {
    env: process.env.NODE_ENV,
    port: process.env.port,
    corsOriginsAccept: process.env.corsOriginsAccept,
    publicFolder: process.env.publicFolder
  };
} else {
  module.exports = require("./development.json");
}
