import { CONSTANTS } from './strings.js';

function parseArguments (args) {
  const filmId = args[2];

  if (!filmId) {
    console.log(CONSTANTS.NO_ARGS);
    process.exit(1);
  }

  const filmIdAsNumber = Math.floor(Number(filmId));
  if (!(String(filmIdAsNumber) === filmId && filmIdAsNumber > 0)) {
    console.log(CONSTANTS.INPUT_INTEGER);
    process.exit(1);
  }

  if (args[3]) {
    console.log(CONSTANTS.INVALID_ARGS);
    process.exit(1);
  }

  return { filmId };
}

export { parseArguments };
