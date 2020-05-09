import React, { useEffect, useState } from "react";
import { CalCoords } from "../../../lib/CoordsApi";

export const Map = () => {
  const [data, setData] = useState();

  const coords = [
    "41.131512,-3.8163796",
    "41.131512,-3.8163796",
    "39.367163,-3.8741367",
    "40.469882, -3.867181",
    "52.5063566,12.8643336",
    "37.7667858,-3.7900676",
    "37.7489752,-3.7412417",
    "41.162251,-8.6919934",
    "43.7801205,11.1008848",
  ];

  useEffect(() => {
    const starCoord = CalCoords(coords);
    setData(starCoord);
  }, []);

  if (data) {
    return (
      <div>
        {data.lat}, {data.lng}
      </div>
    );
  }
  return <div>Coordinates</div>;
};
