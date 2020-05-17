import axios from "axios";

const coordsConnect = axios.create({
  baseURL: "http://localhost:3000/coords",
  withCredentials: true,
});

// Add New Coords

export const addNewCoords = async (data) => {
  const response = await coordsConnect.post("/add", data);
  console.log("[COORDS ADD] Adding new coords", data);
};

// Get Coords

export const GetCoords = async () => {
  console;
  const response = await coordsConnect.get("/get");
  console.log("Array de coordenadas", response.data.coords);
  return response.data.coords;
};
