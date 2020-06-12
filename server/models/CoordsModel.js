const mongoose = require("mongoose");

const CoordsSchema = new mongoose.Schema(
  {
    coords: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Coords = mongoose.model("Coord", CoordsSchema);
module.exports = Coords;
