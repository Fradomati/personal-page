// Function the Coords Half

export const CalCoords = (x) => {
  const lats = [];
  const lngs = [];
  x.forEach((co) => {
    let strg = co;
    if (co.length > 50) strg = UrlCoords(x); // Si es una url
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

// Function return Object with Coords

export const EstructureCoord = (coord) => {
  let strg = coord;
  if (coord.length > 50) strg = UrlCoords(x);

  const lat = parseFloat(strg.split(",")[0]);
  const lng = parseFloat(strg.split(",")[1]);

  return { lat: lat, lng: lng };
};

// Function URL to Coords (string)
export const UrlCoords = (url) => {
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

// Function Order to Date

export const OrderCoords = (arr) => {
  const order = arr.sort(function (a, b) {
    return new Date(a.date) - new Date(b.date);
  });
  return order;
};
