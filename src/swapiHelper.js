import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api/';

async function fetch (url) {
  const { data } = await axios.get(url, { timeout: 10000 });
  return data;
}

function getUrl (id, resource) {
  const url = new URL(`${resource}/${id}`, BASE_URL);
  return url.href;
}

async function getFilm (id) {
  const url = getUrl(id, 'films');
  return await fetch(url);
}

async function getPlanet (planetUrl) {
  return await fetch(planetUrl);
}

function hasWater (planet) {
  return Number(planet.surface_water) > 0;
}

function hasTerrainType (planet, type) {
  return planet.terrain.includes(type);
}

export {
  getFilm,
  getPlanet,
  hasWater,
  hasTerrainType
};
