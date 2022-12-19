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

function getPrintedResult (filmId, planets, fullResponse) {
  const totalDiameter = planets.reduce((sum, planet) => sum + getDiameter(planet), 0);
  if (fullResponse) {
    const numPlanets = planets.length;
    let result = numPlanets === 1
      ? `In Film #${filmId} there is ${planets.length} planet that has mountains and a water surface (> 0).\n`
      : `In Film #${filmId} there are ${planets.length} planets that have mountains and a water surface (> 0).\n`;

    if (numPlanets > 0) {
      const planetsWithDiameter = `${planets.map(({ name, diameter }) => {
        return `- ${name}, diameter: ${diameter}`;
      }).join('\n')}`;
      result += `${planetsWithDiameter}\n`;
    }

    result += `Total diameter: ${totalDiameter}`;
    return result;
  }

  return totalDiameter;
}

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
