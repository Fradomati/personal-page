import axios from "axios";

const coordsConnect = axios.create({
  baseURL: "http://localhost:3000/coords",
  withCredentials: true,
});

// Add New Coords

export const addNewCoords = async (data) => {
  const response = await coordsConnect.post("/add", data);
  console.log("[COORDS ADD] Adding new coords");
};
