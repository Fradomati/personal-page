import React, { useEffect, useState } from "react";
import { CalCoords } from "../../../lib/CoordsApi";
import { TOKEN_API_MAP } from "../../../tokens";
import { useForm } from "react-hook-form";
import { addNewCoords } from "../../connectDB/CoordDB";
import {
  Container,
  CoordsContainer,
  MapContainer,
  FormContainer,
  InputBox,
  ButtonAdd,
} from "./style";

export const Map = () => {
  const [data, setData] = useState();

  // FORM //

  const defValues = {
    name: "",
    coords: "",
    date: "",
  };
  const { register, handleSubmit, errors, setError, reset } = useForm({
    defValues,
  });

  const onSubmit = async (data) => {
    const response = await addNewCoords(data);
    reset(defValues);
  };

  console.log("Error: ", errors);
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
    <>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputBox
            type="text"
            placeholder="name"
            name="name"
            ref={register({ required: true, message: "Campo requerido" })}
          />
          {errors.name && <p>Rellena este campo prezioza</p>}
          <InputBox
            type="text"
            placeholder="coords"
            name="coords"
            ref={register({ required: true, min: 4 })}
          />
          {errors.name && <p>Rellena este campo prezioza</p>}
          <InputBox
            type="date"
            placeholder="date"
            name="date"
            min="1960-01-01"
            ref={register({ required: true })}
          />

          <ButtonAdd type="submit">Agregar</ButtonAdd>
        </form>
      </FormContainer>
      <Container>
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
    </>
  );
};
