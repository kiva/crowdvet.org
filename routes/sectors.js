const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  const { Enterprises, Evaluations, Sectors } = app.datasource.models.Enterprises.model;


  app.get("/api/sectors", async (req, res) => {
    try {
      const result = await Sectors.findAll();
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/sectors/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Sectors.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/sectors", async (req, res) => {
    try {
      const { name } = req.body;
      const result = await Sectors.create({
        name
      });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.put("/api/sectors/:id", async (req, res) => {
    try {
      const { name } = req.body;
      const result = await Sectors.update(
        { name },
        { where: { id } }
      );
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });
};
