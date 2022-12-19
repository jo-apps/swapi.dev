/* eslint-env mocha */
import { assert } from 'chai';
import { hasTerrainType, hasWater } from '../src/swapiHelper.js';

describe('swapiHelper', () => {
  describe('hasTerrainType', () => {
    it('should assert planet with water', () => {
      const planet = {
        name: 'Alderaan',
        terrain: 'grasslands, mountains',
        surface_water: '40'
      };
      const actual = hasWater(planet);
      assert.isTrue(actual);
    });

    it('should not assert planet without water', () => {
      const planet = {
        name: 'Alderaan',
        terrain: 'grasslands, mountains',
        surface_water: '0'
      };
      const actual = hasWater(planet);
      assert.isFalse(actual);
    });

    it('should assert planet with mountains', () => {
      const planet = {
        name: 'Alderaan',
        terrain: 'grasslands, mountains',
        surface_water: '0'
      };
      const actual = hasTerrainType(planet, 'mountains');
      assert.isTrue(actual);
    });

    it('should not assert planet without mountains', () => {
      const planet = {
        name: 'Alderaan',
        terrain: 'grasslands',
        surface_water: '40'
      };
      const actual = hasTerrainType(planet, 'mountains');
      assert.isFalse(actual);
    });
  });
});
