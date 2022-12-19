/* eslint-env mocha */
import { assert } from 'chai';
import { parseArguments } from '../src/validator.js';

describe('validator', () => {
  describe('parseArguments', () => {
    const defaultArgs = [
      '/usr/local/bin/node',
      '/Users/mac/Documents/swapi.dev/index.js'
    ];

    it('should return valid filmId', () => {
      {
        const args = defaultArgs.concat(['1']);
        const { filmId } = parseArguments(args);
        assert.strictEqual(filmId, '1');
      } {
        const args = defaultArgs.concat(['100']);
        const { filmId } = parseArguments(args);
        assert.strictEqual(filmId, '100');
      }
    });

    it('should return fullResponse', () => {
      {
        const args = defaultArgs.concat(['1']);
        const { fullResponse } = parseArguments(args);
        assert.isFalse(fullResponse);
      } {
        const args = defaultArgs.concat(['100', '--full-response']);
        const { fullResponse } = parseArguments(args);
        assert.isTrue(fullResponse);
      }
    });
  });
});
