const itemController = require("./item.controller");

module.exports = app => {
  app.get("/api/v1/item/listall", (req, res, next) => {
    res.status(200).json(itemController.listAll());
  });
};
