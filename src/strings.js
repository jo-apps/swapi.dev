const CONSTANTS = {
  NO_ARGS: 'Please provide a filmId as the first argument.',
  INVALID_ARGS: 'The application accepts filmId first argument and optionally a flag --full-response',
  INPUT_INTEGER: 'Input must be a positive integer',
  NOT_FOUND: (id) => `Film with id ${id} not found`,
  GLOBAL_ERROR: 'Something went wrong. The team is working on fixing it.'
};

function getPrintedResult (filmId, planets, fullResponse) {
  const totalDiameter = planets.reduce((sum, planet) => sum + Number(planet.diameter), 0);
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

export { CONSTANTS, getPrintedResult };
