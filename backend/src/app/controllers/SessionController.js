const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { user_id } = req.headers;
    try {
      const data = await User.findById(user_id);
      return res.json(data);
    } catch (err) {
      return res.status(400).send({ error: "Error loading user" });
    }
  },
  async store(req, res) {
    const { email } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send({ error: "Email already used" });
      }
      user = await User.create({ email });
      return res.json(user);
    } catch (err) {
      return res.status(400).send({ error: "Error storing session" });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    try {
      await User.findByIdAndRemove(id);
      return res.send();
    } catch (err) {
      return res.status(400).send({ error: "Error deleting session" });
    }
  }
};
