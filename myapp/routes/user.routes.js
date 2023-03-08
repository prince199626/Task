module.exports = app => {
  var router = require("express").Router();

  const user = require("../app/controller/user.controller");
  // Create a new Officer
  router.get("/getCustomer", user.getCustomer);
  router.post("/create-user", user.createUser);
  app.use('/api/v1/',router);
};
