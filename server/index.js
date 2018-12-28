const http = require("http");
const cluster = require("cluster");
const app = require("./config/express")();
const config = require("./config");

if (cluster.isMaster && config.env === "production") {
  // Count the machine's CPUs
  const workers = require("os").cpus().length;

  // Create a worker for each CPU
  for (let i = 0; i < workers; i += 1) {
    cluster.fork();
  }
} else {
  http.createServer(app).listen(app.get("port"), () => {
    console.log(`Server listen on port ${app.get("port")}`); // eslint-disable no-console
    console.log(`Environment:  ${config.env}`);
  });
}
