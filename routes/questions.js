const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  const { Questions, Answers } = app.datasource.models.Enterprises.model;

  app.get("/api/questions", async (req, res) => {
    try {
      const result = await Questions.findAll({
        include: [{ model: Answers, as: "Answers" }],
        order: [["Answers", "score", "ASC"]]
      });
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/answers", async (req, res) => {
    try {
      const result = await Answers.findAll();
      return res
        .status(200)
        .set("x-Total-Count", result.length)
        .send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/questions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Questions.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.get("/api/answers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Answers.findOne({ where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/questions", async (req, res) => {
    try {
      const { id, text, name } = req.body;
      const result = await Questions.create({
        text
      });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.post("/api/answers", async (req, res) => {
    try {
      const { text, score, question_id } = req.body;
      const result = await Answers.create({
        text,
        score,
        question_id
      });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.put("/api/answers/:id", async (req, res) => {
    try {
      const { id, text, score, question_id } = req.body;
      const result = await Answers.update(
        { text, question_id, score },
        { where: { id } }
      );
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });

  app.put("/api/questions/:id", async (req, res) => {
    try {
      const { id, text, name } = req.body;
      const result = await Questions.update({ text, name }, { where: { id } });
      return res.status(200).send(result);
    } catch (e) {
      console.log(e);
    }
  });
};
