const Spot = require("../models/Spot");

module.exports = {
  async show(req, res) {
    const { user_id } = req.headers;
    console.log(user_id);
    try {
      const data = await Spot.find({ user: user_id });
      res.json(data);
    } catch (err) {
      return res.status(400).send({ error: "Error loading data of user" });
    }
  }
};
