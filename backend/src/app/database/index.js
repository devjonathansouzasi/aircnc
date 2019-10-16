const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

console.log(mongoURI);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose;
