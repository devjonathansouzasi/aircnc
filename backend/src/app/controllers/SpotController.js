const path = require("path");
const fs = require("fs");

const User = require("../models/User");
const Spot = require("../models/Spot");

module.exports = {
  async index(req, res) {
    const { tech = null } = req.query;
    try {
      let data = null;
      if (tech === null) {
        data = await Spot.find();
      } else {
        data = await Spot.find({ tech });
      }
      return res.json(data);
    } catch (err) {
      return res.status(400).send({ error: "Error loading spots" });
    }
  },
  async store(req, res) {
    const { company, price, techs } = req.body;
    const { filename } = req.file;
    const { user_id } = req.headers;

    try {
      const user = await User.findById(user_id);

      if (!user) {
        return res.status(400).send("User not exists");
      }

      spot = await Spot.create({
        thumbnail: filename,
        company,
        price,
        techs: techs.split(",").map(tech => tech.trim()),
        user: user_id
      });
      return res.json(spot);
    } catch (err) {
      return res.status(400).send({ error: "Error storing spot" });
    }
  },
  async delete(req, res) {
    const { user_id } = req.headers;
    const { spot_id } = req.params;

    try {
      const spot = await Spot.findById(spot_id);

      if (!spot) {
        return res.status(400).send({ error: "Spot not found" });
      }

      if (!(spot.user.toString() === user_id)) {
        return res.status(401).send({ error: "Permission dined" });
      }

      fs.unlinkSync(
        path.resolve(__dirname, "..", "..", "uploads", spot.thumbnail)
      );

      await Spot.deleteOne(spot);

      return res.send();
    } catch (err) {
      return res.status(400).send({ error: "Error deleting spot" });
    }
  }
};
