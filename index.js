import { CONSTANTS, getPrintedResult } from './src/strings.js';

import { parseArguments } from './src/validator.js';

import {
  getFilm,
  getPlanet,
  hasWater,
  hasTerrainType
} from './src/swapiHelper.js';

const PLANET_TERRAN_TYPE = 'mountains';

async function main () {
  const { filmId, fullResponse } = parseArguments(process.argv);

  try {
    const film = await getFilm(filmId);
    const planetUrls = film.planets;
    const planets = await Promise.all(planetUrls.map(getPlanet));
    const concernedPlanets = planets.filter(planet =>
      hasWater(planet) && hasTerrainType(planet, PLANET_TERRAN_TYPE)
    );
    const result = getPrintedResult(filmId, concernedPlanets, fullResponse);
    console.log(result);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(CONSTANTS.NOT_FOUND(filmId));
    } else {
      // log here
      console.log(CONSTANTS.GLOBAL_ERROR);
    }
  } finally {
    process.exit(1);
  }
}

main();
