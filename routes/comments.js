const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  const {
    Enterprises,
    Evaluations,
    Sectors,
    Comments,
    CommentVotes,
    Users
  } = app.datasource.models.Enterprises.model;

  app.get("/api/enterprises/:id/comments", requireLogin, async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Comments.findAll({
        where: { enterprise_id: id, comment_id: null },
        include: [{ model: Comments, as: "Replies", include: [ { model: Users } ] }, { model: CommentVotes }, { model: Users }]
      });

      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/enterprises/:id/comments", requireLogin, async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id;
      const { text } = req.body;

      const comment = await Comments.create({
        user_id,
        enterprise_id: id,
        text
      });

      const result = await Comments.findOne({
        where: { id: comment.id },
        include: [{model: Users}]
      });

      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/comments/:id/replies", requireLogin, async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id;
      const { text, enterprise_id } = req.body;

      const comment = await Comments.create({
        user_id,
        text,
        comment_id: id,
        enterprise_id
      });

      const result = await Comments.findOne({
        where: { id: comment.id },
        include: [{model: Users}]
      });

      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/comments/:id/votes", requireLogin, async (req, res) => {
    try {
      const { id } = req.params;
      const user_id = req.user.id;

      const vote = await CommentVotes.findOne({
        where: { user_id, comment_id: id }
      });

      if (vote) {
        CommentVotes.destroy({ where: { user_id, comment_id: id } });
        const comment = await Comments.findOne({
          where: { id },
          include: [{ model: Comments, as: "Replies", include: [ { model: Users } ] }, { model: CommentVotes }]
        });
        return res.status(200).send(comment);
      }
      const newVote = await CommentVotes.create({ user_id, comment_id: id });
      const comment = await Comments.findOne({
        where: { id },
        include: [{ model: Comments, as: "Replies", include: [ { model: Users } ] }, { model: CommentVotes }]
      });

      return res.status(200).send(comment);
    } catch (e) {
      console.log(e);
    }
  });

};
