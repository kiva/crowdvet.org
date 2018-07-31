const requireLogin = require("../middlewares/requireLogin");
const _ = require("lodash");

module.exports = app => {

  const {
    Enterprises,
    Evaluations,
    Votes,
    Questions,
    Answers,
    Sectors,
    Users,
    Images,
    UsersSectors
  } = app.datasource.models.Enterprises.model;

  app.get("/api/users", async (req, res) => {
    try {
      const result = await Users.findAll();
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/users/enterprises", async (req, res) => {
    try {
      const { filter, sort } = req.query;
      let filters = { published: true }
      if (filter) {
         const { sector_id, country_id}  = JSON.parse(filter)
         filters = !_.isEmpty(sector_id) ? { ...filters, sector_id} : { ...filters }
         filters = !_.isEmpty(country_id) ? { ...filters, country_id} : { ...filters }
      }
      if (sort) {
         const { sector_id, country_id}  = JSON.parse(filter)
         filters = !_.isEmpty(sector_id) ? { ...filters, sector_id} : { ...filters }
         filters = !_.isEmpty(country_id) ? { ...filters, country_id} : { ...filters }
      }

      console.log("--------")
      console.log(filters)
      console.log("--------")

      const result = await Enterprises.findAll({
        where: {...filters},
        include: [
          { model: Evaluations, as: "Evaluations" },
          { model: Images },
          { model: Sectors }
        ]
      });

      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/users/evaluations", async (req, res) => {
    try {
      const user_id = req.user.id;
      const result = await Evaluations.findAll({
        where: { user_id, OficialVote: false },
        include: [
          { model: Votes, include: [{ model: Answers }, { model: Questions }] }
        ]
      });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/users/votes", async (req, res) => {
    try {
      const result = await Evaluations.findAll({
        include: [{ model: Votes }]
      });

      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.delete("/api/users/evaluations/:id", requireLogin, async (req, res) => {
    try {
      const { id } = req.params;
      await Evaluations.destroy({ where: { id } });
      res.status(200).send({ data: true });
    } catch (e) {
      console.log(e);
    }
  });


  app.get("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Users.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/users/evaluations/:enterprise_id", async (req, res) => {
    try {
      const user_id = req.user.id;
      const { enterprise_id } = req.params;
      const result = await Evaluations.findOne({
        where: {
          user_id,
          enterprise_id,
          OficialVote: false
        },
        include: [{ model: Votes }]
      });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.put("/api/users/settings", async (req, res) => {
    try {
      const id = req.user.id;
      const { name, email, ...sectors } = req.body;

      await Users.update({ name, email }, { where: { id } });
      await UsersSectors.destroy({ where: {user_id: id}});

      const promises = _.map(sectors, (value, sector_id)=> {
        if (value) {
            return UsersSectors.create({user_id: id, sector_id})
        }
      });
      await Promise.all(promises)
     const result = await Users.findOne({
        where: { id },
        include: [{ model: UsersSectors }]
      });

      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const result = await Users.update({ name }, { where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  /*
  * Admins
  */
  app.get("/api/admins", async (req, res) => {
    try {
      const result = await Users.findAll();
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/admins/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Users.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.put("/api/admins/:id", async (req, res) => {
    try {
      const { name } = req.body;
      const result = await Users.update({ name }, { where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });
};
