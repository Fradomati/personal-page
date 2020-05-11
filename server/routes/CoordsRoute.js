const express = require("express");
const router = express.Router();
const CoordsModel = require("../models/CoordsModel");

router.post("/add", async (req, res) => {
  await CoordsModel.findOne();

  res.json({ status: `Added Coords` });
});
