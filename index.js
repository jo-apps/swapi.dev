import { CONSTANTS } from './src/strings.js';

import { parseArguments } from './src/validator.js';

import {
  getFilm,
  getPlanet,
  hasWater,
  hasTerrainType,
  getDiameter
} from './src/swapiHelper.js';

const PLANET_TERRAN_TYPE = 'mountains';

async function main () {
  const { filmId } = parseArguments(process.argv);
  try {
    const film = await getFilm(filmId);
    const planetUrls = film.planets;
    const planets = await Promise.all(planetUrls.map(getPlanet));
    const concernedPlanets = planets.filter(planet => 
      hasWater(planet) && hasTerrainType(planet, PLANET_TERRAN_TYPE)
    );
    const totalDiameter = concernedPlanets.reduce((sum, planet) => sum + getDiameter(planet), 0);
    console.log(totalDiameter);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(CONSTANTS.NOT_FOUND(filmId));
    } else {
      // log here
      console.log(error.message || CONSTANTS.GLOBAL_ERROR);
    }
  } finally {
    process.exit(1);
  }
}

main();
