const Booking = require("../models/Booking");

module.exports = {
  async store(req, res) {
    const { booking_id } = req.params;
    try {
      const booking = await Booking.findById(booking_id).populate("spot");
      booking.approved = false;
      await booking.save();
      return res.json(booking);
    } catch (err) {
      return res.status(400).json({ error: "Error rejecting booking" });
    }
  }
};
