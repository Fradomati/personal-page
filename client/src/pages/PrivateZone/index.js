import React, { useEffect, useState } from "react";
import { CalCoords, UrlCoords } from "../../../lib/CoordsApi";
import { TOKEN_API_MAP } from "../../../tokens";
import { useForm } from "react-hook-form";
import { addNewCoords, GetCoords } from "../../connectDB/CoordDB";
import {
  Container,
  CoordsContainer,
  MapContainer,
  FormContainer,
  InputBox,
  ButtonAdd,
} from "./style";

export const Map = () => {
  const [center, setCenter] = useState();
  const [data, setData] = useState({ lat: 0, lng: 0 });
  const [coords, setCoords] = useState(["0,0"]);

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

  // useEffect(() => {
  //   const starCoord = CalCoords(coords);
  //   setData(starCoord);
  // }, []);

  useEffect(() => {
    const mymap = L.map("mapId").setView([data.lat, data.lng], 13);
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

    const marker = L.marker([data.lat, data.lng]).addTo(mymap);
    L.marker([41.131512, -3.8163796]).addTo(mymap);
  }, []);

  useEffect(() => {
    const arrCoords = [];
    GetCoords().then((arr) => {
      arr.forEach((e) => {
        const co = e.coords;
        if (co.length > 50) co = UrlCoords(co);
        arrCoords.push(co);
      });
      const halfCoords = CalCoords(arrCoords); // <-- Estás probando si funciona todo aquí.
      setData(halfCoords);
      setCoords(arrCoords);
    });
  }, []);

  if (!data) {
    return <p>Cargando...</p>;
  } else {
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
          <button onClick={() => GetCoords()}>Push Me!</button>
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
  }
};
