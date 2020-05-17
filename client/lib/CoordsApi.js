// Funcion calculo coordenadas

export const CalCoords = (x) => {
  let strg = x;
  if (x.length > 50) strg = UrlCoords(x); // Si es una url

  const lats = [];
  const lngs = [];
  strg.forEach((co) => {
    lats.push(parseFloat(co.split(",")[0]));
    lngs.push(parseFloat(co.split(",")[1]));
  });

  const lat =
    lats.reduce((acc, curr) => {
      return acc + curr;
    }) / lats.length;

  const lng =
    lngs.reduce((acc, curr) => {
      return acc + curr;
    }) / lngs.length;

  return { lat: lat, lng: lng };
};

const UrlCoords = (url) => {
  const arr = url.split("");
  const start = arr.indexOf("@");
  let count = 0;
  let coords = "";

  for (let i = start + 1; i < arr.length; i++) {
    let element = arr[i];

    if (element == ",") count++;
    if (count != 2) coords = coords + element;
  }

  return coords;
};
