import React, { useEffect, useState } from "react";
import {
  CalCoords,
  UrlCoords,
  OrderCoords,
  EstructureCoord,
} from "../../../lib/CoordsApi";
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
  Card,
  Li,
  Link,
  Title,
  SubTitle,
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
    var container = L.DomUtil.get("mapId");
    if (container != null) {
      container._leaflet_id = null;
    }
    const mymap = L.map("mapId").setView(
      center ? [center.lat, center.lng] : [data.lat, data.lng],
      13
    );
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

    center
      ? L.marker([center.lat, center.lng])
          .bindPopup("Aquí estuvo Bei!")
          .openPopup()
          .addTo(mymap)
      : null;
  }, [center]);

  useEffect(() => {
    const arrCoords = [];
    const nameDateCoords = [];
    GetCoords().then((arr) => {
      arr.forEach((e) => {
        nameDateCoords.push(e);
        const co = e.coords;
        if (co.length > 50) co = UrlCoords(co);
        arrCoords.push(co);
      });
      const halfCoords = CalCoords(arrCoords); // Media de las Coordenadas
      setData(halfCoords); // Change the State with the new Coord
      const OrderNameDateCoords = OrderCoords(nameDateCoords);
      setCoords(OrderNameDateCoords);
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
        </FormContainer>
        <Container>
          <Title>
            {data.lat}, {data.lng}
          </Title>
        </Container>
        <Container>
          <MapContainer id="mapId"></MapContainer>
          <CoordsContainer>
            {data ? (
              <div>
                <ul>
                  {coords.map((coord, i) => {
                    return (
                      <Li key={i}>
                        <Link
                          onClick={() => {
                            const newCenter = EstructureCoord(coord.coords);
                            setCenter(newCenter);
                            map.off();
                            console.log(center);
                          }}
                        >
                          <Card>
                            <SubTitle>{coord.date}</SubTitle>
                            <p>
                              <b>{coord.name}</b>
                            </p>
                            <p>{coord.coords}</p>
                          </Card>
                        </Link>
                      </Li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              ""
            )}
          </CoordsContainer>
        </Container>
      </>
    );
  }
};
