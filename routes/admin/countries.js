const passport = require("passport");

module.exports = app => {
  const { Countries } = app.datasource.models.Enterprises.model;

  app.get("/api/admin/countries", passport.authenticate("jwt"), async (req, res) => {
    try {
      const result = await Countries.findAll();
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/admin/countries/:id", passport.authenticate("jwt"), async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Countries.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
      console.log(e);
    }
  });
};
