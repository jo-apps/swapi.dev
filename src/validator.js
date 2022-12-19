import { CONSTANTS } from './strings.js';

const RESPONSE_FLAG = '--full-response';

function parseArguments (args) {
  const filmId = args[2];
  const responseFlag = args[3];
  if (!filmId) {
    console.log(CONSTANTS.NO_ARGS);
    process.exit(1);
  }

  const filmIdAsNumber = Math.floor(Number(filmId));
  if (!(String(filmIdAsNumber) === filmId && filmIdAsNumber > 0)) {
    console.log(CONSTANTS.INPUT_INTEGER);
    process.exit(1);
  }

  if (responseFlag && responseFlag !== RESPONSE_FLAG) {
    console.log(CONSTANTS.INVALID_ARGS);
    process.exit(1);
  }

  return { filmId, fullResponse: responseFlag === RESPONSE_FLAG };
}

export { parseArguments };
