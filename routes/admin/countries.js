const passport = require("passport");
const HttpStatus = require('http-status');

module.exports = app => {
  const { Countries } = app.datasource.models.Enterprises.model;

  app.get("/api/admin/countries", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { _start, _end } = req.query;
      const result = await Countries.findAndCountAll({offset: _start, limit:_end});
      return res
        .status(200)
        .set("x-Total-Count", result.count)
        .send(result.rows);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.get("/api/admin/countries/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Countries.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.delete("/api/admin/countries/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      await Countries.destroy({ where: { id } });
      res.status(200).send({ data: true });
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.post("/api/admin/countries", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { name } = req.body;
      const result = await Countries.create({
        name
      });
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });

  app.put("/api/admin/countries/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const result = await Countries.update(
        { name },
        { where: { id } }
      );
      return res.status(200).send(result);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).send();
    }
  });
};
