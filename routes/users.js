const requireLogin = require("../middlewares/requireLogin");
const passport = require("passport");
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
    UsersSectors,
    Countries,
    Comments
  } = app.datasource.models.Enterprises.model;

  app.get("/api/users", async (req, res) => {
    try {
      const { admin } = req.query;
      const result = await Users.findAll({where: {admin: admin || false}});
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/users/enterprises", requireLogin, async (req, res) => {
    try {
      const { filter, sort } = req.query;
      let filters = { published: true }
      let order = ["name"];

      if (filter) {
         const { sector_id, country_id}  = JSON.parse(filter)
         filters = !_.isEmpty(sector_id) ? { ...filters, sector_id} : { ...filters }
         filters = !_.isEmpty(country_id) ? { ...filters, country_id} : { ...filters }
      }

      if (sort === "country") {
         order = [Countries,  "name", "ASC"]
      }
      if (sort === "sectors") {
         order = [Sectors,  "name", "ASC"]
      }
      if (sort === "sectors") {
         order = [Sectors,  "name", "ASC"]
      }
      if (sort === "endDate") {
         order = ["endDate", "DESC"]
      }

      const result = await Enterprises.findAll({
        where: {...filters},
        order: [[...order]],
        include: [
          { model: Evaluations, as: "Evaluations" },
          { model: Images },
          { model: Sectors },
          { model: Comments },
          { model: Countries }
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

  app.get("/api/users/evaluations/:enterprise_id", requireLogin,async (req, res) => {
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

  app.patch("/api/users", requireLogin, async (req, res) => {
    try {
      const id = req.user.id;
      const { attributes } = req.body;
      await Users.update({ ...attributes }, { where: { id } });
      const result = await Users.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e)
    }
  })

  app.put("/api/users/settings", requireLogin, async (req, res) => {
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

  app.put("/api/users/:id", requireLogin, async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const result = await Users.update({ name }, { where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });
};
