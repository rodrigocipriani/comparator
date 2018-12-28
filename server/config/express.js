const path = require("path");
const config = require("./index");
const express = require("express");
const cors = require("cors");
// const consign = require("consign");
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const modRewrite = require("connect-modrewrite");
const morgan = require("morgan");
// const redis = require("redis");
const ejs = require("ejs");
const routes = require("./routes");

module.exports = () => {
  const app = express();

  app.set("port", config.port);

  app.set("views", "./views");
  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");

  app.use(
    cors({
      origin: config.corsOriginsAccept,
      exposedHeaders: ["x-access-token"],
      credentials: true
    })
  );

  app.use(
    modRewrite([
      "!\\api/|\\.html|\\.js|\\.svg|\\.css|\\.png|\\.jpg|\\.woff|\\.woff2|\\.ttf|\\.manifest$ /index.html [L]"
    ])
  );

  app.use(express.static(config.publicFolder));

  app.use(compression());
  app.use(morgan("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(require("method-override")());
  app.use(helmet.hidePoweredBy({ setTo: "Cobol" }));

  // consign({ cwd: path.join(process.cwd(), "server", "app") })
  //   .include("models/models.js")
  //   .then("utils")
  //   .then("services")
  //   .then("controllers")
  //   .then("security")
  //   .then("routes/auth.js")
  //   .then("routes")
  //   .into(app);
  routes(app);

  app.get("*", (req, res) => {
    console.log("Route/path not found");
    if (req.xhr)
      return res.status(404).send({ message: "Endereço inexistente" });
    return res.status(404).render("404.ejs");
  });

  // app.use(erro.handler({token: config.accessToken}));

  app.use((error, req, res) => {
    let msg;
    let status = 500;

    if (error.stack) {
      const message = msg || "Erro interno do servidor";
      return res.status(status).send({
        error,
        message,
        messageCode: new Date()
      });
    }
  });

  return app;
};
