import React, { useEffect, useState } from "react";
import { CalCoords } from "../../../lib/CoordsApi";
import { Container, CoordsContainer, MapContainer } from "./style";
import { TOKEN_API_MAP } from "../../../tokens";
import { useForm } from "react-hook-form";
import { addNewCoords } from "../../connectDB/CoordDB";

export const Map = () => {
  const [data, setData] = useState();

  // FORM //
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await addNewCoords(data);
    console.log("Added coords", response);
  };
  console.log(errors);
  // FORM //

  const coords = [
    "40.395787,-3.697463",
    "41.131512,-3.8163796",
    "39.367163,-3.8741367",
    "40.469882, -3.867181",
    "52.5063566,12.8643336",
    "37.7667858,-3.7900676",
    "37.7489752,-3.7412417",
    "7.8571809,78.4620488",
    "41.162251,-8.6919934",
    "43.7801205,11.1008848",
  ];

  useEffect(() => {
    const starCoord = CalCoords(coords);
    setData(starCoord);
    const mymap = L.map("mapId").setView([starCoord.lat, starCoord.lng], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken: TOKEN_API_MAP,
      }
    ).addTo(mymap);

    const marker = L.marker([starCoord.lat, starCoord.lng]).addTo(mymap);
  }, []);
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="name"
          name="name"
          ref={register({ required: true })}
        />
        <input
          type="text"
          placeholder="coords"
          name="coords"
          ref={register({ required: true, min: 4 })}
        />
        <input
          type="date"
          placeholder="date"
          name="date"
          min="1960-01-01"
          ref={register}
        />

        <input type="submit" />
      </form>
      <CoordsContainer>
        Coordinates
        {data ? (
          <div>
            {data.lat}, {data.lng}
            <ul>
              {coords.map((coord, i) => {
                return <li key={i}>{coord}</li>;
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
      </CoordsContainer>

      <MapContainer id="mapId"></MapContainer>
    </Container>
  );
};
