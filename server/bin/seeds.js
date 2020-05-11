const { withDbConnection } = require("../lib/withDbConnection");
const CoordsModel = require("../models/CoordsModel");

withDbConnection(async () => {
  await CoordsModel.create({
    coords: [],
  });
});
