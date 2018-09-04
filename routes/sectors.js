const requireLogin = require("../middlewares/requireLogin");
const HttpStatus = require('http-status');

module.exports = app => {
  const { Enterprises, Evaluations, Sectors } = app.datasource.models.Enterprises.model;

  app.get("/api/sectors", requireLogin, async (req, res) => {
    try {
      const result = await Sectors.findAll();
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.get("/api/sectors/:id", requireLogin, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Sectors.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });
};
