/// Traer aquí el
import React, { useEffect, useState } from "react";
import { TOKEN_API_MAP } from "../../../../tokens";

export const RenderMap = ({ data, coords }) => {
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

  return (
    <>
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
    </>
  );
};
