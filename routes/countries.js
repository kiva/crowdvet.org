const requireLogin = require("../middlewares/requireLogin");
const HttpStatus = require('http-status');

module.exports = app => {
  const { Countries } = app.datasource.models.Enterprises.model;

  app.get("/api/countries", requireLogin, async (req, res) => {
    try {
      const result = await Countries.findAll();
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.get("/api/countries/:id", requireLogin, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Countries.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });
};
