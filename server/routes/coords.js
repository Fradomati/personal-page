const express = require("express");
const router = express.Router();
const CoordsModel = require("../models/CoordsModel");

router.post("/add", async (req, res) => {
  const { name, coords, date } = req.body;

  await CoordsModel.findOneAndUpdate({
    $push: {
      coords: { name: name, coords: coords, date: date },
    },
  });

  res.json({ status: `Added Coords ${name}, ${coords}, ${date}` });
});

router.get("/get", async (req, res) => {
  const dataCoords = await CoordsModel.findOne();
  const coords = dataCoords.coords;
  res.json({ coords });
});
module.exports = router;
