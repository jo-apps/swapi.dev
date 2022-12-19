/* eslint-env mocha */
import { assert } from 'chai';
import { getPrintedResult } from '../src/strings.js';

describe('strings', () => {
  describe('getPrintedResult', () => {
    const filmId = 1;
    it('should print simple result', () => {
      const planets = [{ name: 'Alderaan', diameter: '12500' }];
      const actual = getPrintedResult(filmId, planets);
      const expected = 12500;
      assert.strictEqual(actual, expected);
    });

    it('should calculate diameter for multiple planets', () => {
      const planets = [
        { name: 'Planet1', diameter: '1' },
        { name: 'Planet2', diameter: '2' },
        { name: 'Planet3', diameter: '3' },
        { name: 'Planet4', diameter: '4' }
      ];
      const actual = getPrintedResult(filmId, planets);
      const expected = 10;
      assert.strictEqual(actual, expected);
    });

    it('should print 0 when no planets provided', () => {
      const planets = [];
      const actual = getPrintedResult(filmId, planets);
      const expected = 0;
      assert.strictEqual(actual, expected);
    });

    it('should print result with full response', () => {
      const planets = [{ name: 'Alderaan', diameter: '12500' }];
      const actual = getPrintedResult(filmId, planets, true);
      const expected = `In Film #${filmId} there is 1 planet that has mountains and a water surface (> 0).
- Alderaan, diameter: 12500
Total diameter: 12500`;
      assert.strictEqual(actual, expected);
    });

    it('should calculate diameter for multiple planets with full response', () => {
      const planets = [
        { name: 'Planet1', diameter: '1' },
        { name: 'Planet2', diameter: '2' },
        { name: 'Planet3', diameter: '3' },
        { name: 'Planet4', diameter: '4' }
      ];
      const actual = getPrintedResult(filmId, planets, true);
      const expected = `In Film #${filmId} there are 4 planets that have mountains and a water surface (> 0).
- Planet1, diameter: 1
- Planet2, diameter: 2
- Planet3, diameter: 3
- Planet4, diameter: 4
Total diameter: 10`;
      assert.strictEqual(actual, expected);
    });

    it('should print 0 when no planets provided with full response', () => {
      const planets = [];
      const actual = getPrintedResult(filmId, planets, true);
      const expected = `In Film #${filmId} there are 0 planets that have mountains and a water surface (> 0).
Total diameter: 0`;
      assert.strictEqual(actual, expected);
    });
  });
});
