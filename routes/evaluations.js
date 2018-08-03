const passport = require("passport");
const requireLogin = require("../middlewares/requireLogin");
const _ = require("lodash");

module.exports = app => {
  const {
    Evaluations,
    Votes,
    Answers,
    Questions,
    Enterprises,
    Sectors,
    Images,
    Comments
  } = app.datasource.models.Enterprises.model;

  app.get("/api/evaluations",requireLogin,  async (req, res) => {
    try {
      const { official } = req.query;
      const OficialVote = official ? true : false;
      const result = await Evaluations.findAll({
        where: { OficialVote },
        include: [
          { model: Votes, include: [{ model: Answers }, { model: Questions }] }
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

  app.post("/api/evaluations", requireLogin, async (req, res) => {
    try {
      const user_id = req.user.id;
      const { enterprise_id, votes, inProgress } = req.body;

      const eval = await Evaluations.findOne({
        where: { user_id, enterprise_id, OficialVote: false }
      });

      Evaluations.destroy({
        where: { user_id, enterprise_id, OficialVote: false }
      });
      const evaluation = await Evaluations.create({
        user_id,
        enterprise_id,
        impact: votes.impact,
        model: votes.model,
        prioritization: votes.prioritization,
        impactComment: votes.impactComment,
        modelComment: votes.modelComment,
        prioritizationComment: votes.prioritizationComment,
        comment: votes.comment,
        OficialVote: false,
        inProgress
      });

      const result = await Evaluations.findOne({
        where: { id: evaluation.id }
      });

      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/enterprises/:id", requireLogin, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Enterprises.findOne({
        where: { id },
        include: [{ model: Sectors }, { model: Images }, { model: Comments, attributes: ["id"] }]
      });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });
};
