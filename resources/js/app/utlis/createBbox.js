export function createBbox(features) {
  if (features.length <= 0) {
    return;
  }

  const lonLatArr = features.reduce((acc, item) => [...acc, item.geometry.coordinates], []);
  const lonArr = lonLatArr.reduce((acc, item) => [...acc, item[0]], []);
  const latArr = lonLatArr.reduce((acc, item) => [...acc, item[1]], []);

  const minLon = Math.min(...lonArr);
  const maxLon = Math.max(...lonArr);
  const minLat = Math.min(...latArr);
  const maxLat = Math.max(...latArr);

  if (minLat === maxLat || maxLon === minLon) {
    return [minLat, minLon, minLat, minLon];
  }

  return [minLat, maxLon, maxLat, minLon];
}
