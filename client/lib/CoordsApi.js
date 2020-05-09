// Funcion calculo coordenadas

export const CalCoords = (x) => {
  const lats = [];
  const lngs = [];
  x.forEach((co) => {
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
