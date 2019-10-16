const Spot = require("../models/Spot");
const User = require("../models/User");

module.exports = {
  async index(req, res) {
    const { tech } = req.query;
    try {
      const spots = await Spot.find({ techs: tech });
      return res.json(spots);
    } catch (err) {
      return res.status(400).json({ error: "Error loading Spots" });
    }
  },

  async store(req, res) {
    const { filename } = req.file;
    const { company, techs, price } = req.body;
    const { user_id } = req.headers;

    try {
      const user = await User.findById(user_id);

      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const spot = await Spot.create({
        user: user_id,
        thumbnail: filename,
        company,
        techs: techs.split(",").map(tech => tech.trim()),
        price
      });

      return res.json(spot);
    } catch (err) {
      return res.status(400).json({ error: "Error storing Spot" });
    }
  }
};
