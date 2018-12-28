const data = require("./data.json");

let controller = {};

controller.listAll = () => {
  return data;
};

module.exports = controller;
